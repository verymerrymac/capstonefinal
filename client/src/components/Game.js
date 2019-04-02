import React, {Component} from 'react';
import './Game.css';
import { MDBIcon } from "mdbreact";
import Webcam from 'react-webcam';
import axios from 'axios';
import { urlencoded } from 'body-parser';
// import { Redirect } from 'react-router-dom';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 0,
            // imageSrc: false,
            celebrityName: "",
            celebrityPic: null
        }
    }
    
    setRef = (webcam) => {
        this.webcam = webcam;
    }

    startGame() {
        this.setState({
            gameStarted: true
        })
    } 

    reset() {
        this.props.resetGame()
    }


//when a user logs in save this below and when they take the picture, log this.

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        const username = Math.floor(Math.random() * 100);
        axios.post('/image/save', {username, imageSrc}).then(res => res);
        setTimeout(() => {
            this.setState({username})
        }, 200)
        axios.post('/image/clarifai', {imageSrc}).then(res => {
            this.setState({celebrityName: res.data.outputs[0].data.regions[0].data.face.identity.concepts[0].name})
            console.log('don')
            let name = res.data.outputs[0].data.regions[0].data.face.identity.concepts[0].name
            let newName = encodeURIComponent(name)
            console.log(newName)
            axios.get('/image/bing/celebName/' + newName)
                .then(res => this.setState({celebrityPic: res.data}))
                .catch(err => console.log(err))
        }
    )};


    render() {

        const videoConstraints = {
            width: 400,
            height: 300,
            facingMode: 'user',
        }

        return (
            <div className="gamearea mx-auto mt-4 col-md-12">
            <p><br />There you are looking radiant! <br />Smile for the camera!</p>
            <div className="icons">
            <MDBIcon icon="camera-retro" size="3x" onClick={this.capture}/></div><br/>
            <Webcam 
                audio={false}
                height={300}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={400}
                videoConstraints={videoConstraints}
            />
            <br/>
            <div>Your carefully calculated celebrity look-alike is: <br/><br /> {this.state.celebrityName}</div><br />
            <div><img src= {this.state.celebrityPic} className="picture"></img></div>
            </div>
        ) 
    }
}

export default Game
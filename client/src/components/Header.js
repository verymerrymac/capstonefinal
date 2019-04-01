import React, {Component} from 'react';
import star from './assets/star.jpg'

class Header extends Component {
    render() {
        return (
            <div className="header d-flex justify-content-around mx-5">
                <h1 className="title">Discover Your Celebrity Match!</h1>
                <img src={star} alt="star" style={{width: 500, height: 250}}/>
            </div>
        )
    }
}

export default Header
import React, { Component } from 'react';

class Login extends Component {
    state = {
            email: "",
            password: "",
            redirect: false,
            form: "Login",
            text: "No Account? Register"
        }

    handleChange = (e) => {
       this.setState({
        [e.target.id]: e.target.value
       })
    }

    handleSwitch = () => {
        if (this.state.form === "Login") {
            this.setState({form: "Register", text: "Already have an Account? Log in now!"});
        } else {
            this.setState({form: "Login", text: "Dont have an Account? Register now!"});
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <br /><h5 className="grey-text text-darken-3">Fact: There are 7 people in the world that look almost identical to you. <br /> ...What if one of them is a celebrity? Find out NOW!</h5><br />
            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleChange}/>
            </div>
            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={this.handleChange}/>
            </div>
            {this.state.form === "Register" ? 
                <div className="input-field">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div> : null
            }
            
            <br /><button className="btn pink lighten-1 z-depth-0">{this.state.form}</button>
            </form>
            <span onClick={() => this.handleSwitch()}>{this.state.text}</span>
            </div>
        )
    }
}

export default Login;
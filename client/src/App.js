import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header.js'
import Login from './components/login.js'
import Game from './components/Game.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/game" component={Game}></Route>
        </Switch>

      </div>
    );
  }
}

export default App;

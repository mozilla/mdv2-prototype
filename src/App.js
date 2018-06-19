import React, { Component } from 'react';
import './App.css';
import {Navigation} from './Components/Navigation.js'
import {ViewChanger} from './Components/ViewChanger.js'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Navigation />
        <ViewChanger />
      </div>
    );
  }
}

export default App;

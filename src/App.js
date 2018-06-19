import React, { Component } from 'react';
import './App.css';
import {ViewChanger} from './Components/ViewChanger.js'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>Measurement Dashboard Version 2 Prototype</h1>
        <ViewChanger />
      </div>
    );
  }
}

export default App;

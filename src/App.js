import React, { Component } from 'react';
import './App.css';
import {Navigation} from './Components/Navigation.js';
import {ViewSelector} from './Components/ViewSelector.js';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Navigation />
        <ViewSelector />
      </div>
    );
  }
}

export default App;

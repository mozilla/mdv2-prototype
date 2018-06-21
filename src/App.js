import React from "react";
import "./App.css";
import {Navigation} from "./Components/Navigation.js";
import {ViewSelector} from "./Components/ViewSelector.js";
import {MetricSelector} from "./Components/MetricSelector.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metric: "",
      version: "",
      channel: "",
    }
  }

  selectMetric = (event) => {
    this.setState({
      metric: event.target.value,
    })
  }

  selectVersion = (event) => {
    this.setState({
      version: event.target.value,
    })
  }

  selectChannel = (event) => {
    this.setState({
      channel: event.target.value,
    })
  }

  render() {
    return (
      <div className="app">
        <Navigation />
        <MetricSelector
          metric = {this.state.metric}
          selectMetric = {this.selectMetric}
        />
        <ViewSelector
          metric = {this.state.metric}
          channel = {this.state.channel}
          version = {this.state.version}
        />
      </div>
    );
  }
}

export default App;

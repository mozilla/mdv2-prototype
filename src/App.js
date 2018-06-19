import React from "react";
import "./App.css";
import {Navigation} from "./Components/Navigation.js";
import {ViewSelector} from "./Components/ViewSelector.js";
import {MetricSelector} from "./Components/MetricSelector.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    metricQuery: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (event) {
    this.setState({
    metricQuery: event.target.value
    })
    console.log(this.state.metricQuery);
  }

  render() {
    return (
      <div className="app">
        <Navigation />
        <MetricSelector
          metricQuery = {this.state.metricQuery}
          handleInputChange = {this.handleInputChange}/>
        <ViewSelector />
      </div>
    );
  }
}

export default App;

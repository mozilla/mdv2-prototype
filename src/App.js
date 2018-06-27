import React from "react";
import "./App.css";
import {Navigation} from "./Components/Navigation.js";
import {ViewSelector} from "./Components/ViewSelector.js";
import {MetricSelector} from "./Components/MetricSelector.js";
import {VersionSelector} from "./Components/VersionSelector.js";
import {ChannelSelector} from "./Components/ChannelSelector.js";
import metricData from "./data/metrics.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMetric: "GC_MS",
      metricOptions: metricData,
      activeVersion: "62",
      versionOptions: ["60", "61", "62"],
      activeChannel: "nightly",
      channelOptions: ["nightly", "beta", "dev edition", "release"],
    }
  }

  onMetricChange = (value) => {
    this.setState({
      activeMetric: value,
    })
  }

  onVersionChange = (value) => {
    this.setState({
      activeVersion: value,
    })
  }

  onChannelChange = (value) => {
    this.setState({
      activeChannel: value,
    })
  }

  render() {
    return (
      <div className="app">
        <Navigation />
        <MetricSelector
          activeMetric = {this.state.activeMetric}
          onMetricChange = {this.onMetricChange}
          metricOptions = {this.state.metricOptions}
        />
        <hr></hr>
        <ChannelSelector
          activeChannel = {this.state.activeChannel}
          onChannelChange = {this.onChannelChange}
          channelOptions = {this.state.channelOptions}
        />
        <VersionSelector
          activeVersion = {this.state.activeVersion}
          onVersionChange = {this.onVersionChange}
          versionOptions = {this.state.versionOptions}
        />
        <br />
        <ViewSelector
          activeMetric = {this.state.activeMetric}
          activeChannel = {this.state.activeChannel}
          activeVersion = {this.state.activeVersion}
<<<<<<< HEAD
          currentData = {this.state.currentData}
=======
          onMetricChange = {this.onMetricChange}
          metricOptions = {this.state.metricOptions}
>>>>>>> d4e7ad852b02c98793bf085545c08fb5c263ed73
        />
      </div>
    );
  }
}

export default App;

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
      currentData: [
        {
          "start": 0,
          "end": 1,
          "count": 1623,
          "proportion": 0.000011537046015254444
        },
        {
          "start": 1,
          "end": 2,
          "count": 41,
          "proportion": 2.8913714335682874e-7
        },
        {
          "start": 2,
          "end": 3,
          "count": 201,
          "proportion": 0.0000014314658572747914
        },
        {
          "start": 3,
          "end": 4,
          "count": 878,
          "proportion": 0.000006240148348020738
        },
        {
          "start": 4,
          "end": 5,
          "count": 2101,
          "proportion": 0.00001493796241457452
        },
      ],
      change: "",
      nfifthPercentile: 99,
      median: 42,
      lastMedian: 40,
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

  getChange = () => {
    var rawChange = this.state.median - this.state.lastMedian;
    var pctChange = (rawChange / this.state.lastMedian) * 100;
    var roundedChange = pctChange.toFixed(2)
    this.setState({change: roundedChange});
  }

  render() {
    return (
      <div className="App">
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
          currentData = {this.state.currentData}
          activeMetric = {this.state.activeMetric}
          activeChannel = {this.state.activeChannel}
          activeVersion = {this.state.activeVersion}
          onMetricChange = {this.onMetricChange}
          metricOptions = {this.state.metricOptions}
          change = {this.state.change}
          median = {this.state.median}
          nfifthPercentile = {this.state.nfifthPercentile}
        />
      </div>
    );
  }
}

export default App;

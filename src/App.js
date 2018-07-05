import React from "react";
import "./App.css";
import {Navigation} from "./Components/Navigation.js";
import {ViewSelector} from "./Components/ViewSelector.js";
import {MetricSelector} from "./Components/MetricSelector.js";
import {VersionSelector} from "./Components/VersionSelector.js";
import {ChannelSelector} from "./Components/ChannelSelector.js";
import GC_MS_nightly_62 from "./data/GC_MS_nightly_62.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      probeInfo: [],
      currentData: GC_MS_nightly_62,
      change: "",
      nfifthPercentile: 99,
      median: 42,
      lastMedian: 40,
      activeMetric: "GC_MS",
      metricOptions: [],
      activeVersion: "62",
      versionOptions: ["60", "61", "62"],
      activeChannel: "nightly",
      channelOptions: ["nightly", "beta", "dev edition", "release"],
    }
  }

  componentWillMount = () => {
    fetch('https://probeinfo.telemetry.mozilla.org/firefox/all/main/all_probes')
    .then(response => {
      return response.json();
    }).then(data => {
      var probeData = Object.values(data);
      var metrics = probeData.map(item => item.name);
      this.setState({
        probeInfo: probeData,
        metricOptions: metrics,
      });
    });
  }

  componentDidMount = () => {
    this.getChange();
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

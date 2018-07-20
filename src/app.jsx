import React from "react";
import fetch from "isomorphic-fetch";

import "./app.css";

import {Navigation} from "./components/navigation.jsx";
import {ViewSelector} from "./components/viewselector.jsx";
import {MetricSelector} from "./components/metricselector.jsx";
import {VersionSelector} from "./components/versionselector.jsx";
import {ChannelSelector} from "./components/channelselector.jsx";

import {MetricData} from "./metricdata.js";

import GC_MS_nightly_62 from "./data/GC_MS_nightly_62.json";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.dataStore = new MetricData();
    this.state = {
      active: this.dataStore.active,
    };
  }

  componentDidMount = () => {
    //this.getProbeInfo();
  }

  /* Overriding this API call during testing so that we can limit the metric options.
  getProbeInfo = () => {
    fetch("https://probeinfo.telemetry.mozilla.org/firefox/all/main/all_probes")
      .then(response => response.json())
      .then(data => {
        var probeData = Object.values(data);
        var metrics = probeData.map(item => item.name);
        this.setState({
          probeInfo: probeData,
          metricOptions: metrics,
        });
      });
  }
  */

  onMetricChange = (eventKey) => {
    this.setState({
      activeMetric: eventKey,
    });
  }

  onVersionChange = (eventKey) => {
    this.setState({
      activeVersion: eventKey,
    });
  }

  onChannelChange = (eventKey) => {
    this.setState({
      activeChannel: eventKey,
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <MetricSelector
          activeMetric = {this.state.active.metric}
          onMetricChange = {this.onMetricChange}
          metricOptions = {this.state.metricOptions}
        />
        <ChannelSelector
          activeChannel = {this.state.active.channel}
          onChannelChange = {this.onChannelChange}
          channelOptions = {this.dataStore.channelOptions}
        />
        <VersionSelector
          activeVersion = {this.state.active.version}
          onVersionChange = {this.onVersionChange}
          versionOptions = {this.dataStore.versionOptions}
        />
        <br />
        <ViewSelector
          dataStore = {this.dataStore}
          onMetricChange = {this.onMetricChange}
        />
      </div>
    );
  }
}

export default App;

import React from "react";
import {DataStore} from "./datastore.js";
import "./app.css";

import {Navigation} from "./components/navigation.jsx";
import {ViewSelector} from "./components/viewselector.jsx";
import {MetricSelector} from "./components/metricselector.jsx";
import {VersionSelector} from "./components/versionselector.jsx";
import {ChannelSelector} from "./components/channelselector.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.dataStore = new DataStore();
    let active = this.dataStore._active;
    this.state = {
      activeMetric: active.metric,
      activeChannel: active.channel,
      activeVersion: active.version,
      activeData: active.data,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeMetric !== this.state.activeMetric ||
        prevState.activeChannel !== this.state.activeChannel ||
        prevState.activeVersion !== this.state.activeVersion) {
      this.dataStore.loadDataFor(this.state.activeMetric, this.state.activeChannel, this.state.activeVersion)
          .then(() => this.setState({activeData: this.dataStore.active.data}));
    }
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <MetricSelector
          activeMetric = {this.state.activeMetric}
          onMetricChange = {this.onMetricChange}
          metricOptions = {this.dataStore.metricOptions}
        />
        <ChannelSelector
          activeChannel = {this.state.activeChannel}
          onChannelChange = {this.onChannelChange}
          channelOptions = {this.dataStore.channelOptions}
        />
        <VersionSelector
          activeVersion = {this.state.activeVersion}
          onVersionChange = {this.onVersionChange}
          versionOptions = {this.dataStore.versionOptions}
        />
        <br />
        <ViewSelector
          dataStore = {this.dataStore}
          activeData = {this.state.activeData}
          activeVersion = {this.state.activeVersion}
          activeMetric = {this.state.activeMetric}
          onMetricChange = {this.onMetricChange}
        />
      </div>
    );
  }
}

export default App;

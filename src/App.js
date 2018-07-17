import React from "react";
import "./App.css";
import {Navigation} from "./Components/Navigation.js";
import {ViewSelector} from "./Components/ViewSelector.js";
import {MetricSelector} from "./Components/MetricSelector.js";
import {VersionSelector} from "./Components/VersionSelector.js";
import {ChannelSelector} from "./Components/ChannelSelector.js";
import metricData from "./data/metrics.js";
import GC_MS_nightly_62 from "./data/GC_MS_nightly_62.json";
import fetch from "isomorphic-fetch";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: GC_MS_nightly_62,
      change: "",
      nfifthPercentile: "",
      median: "",
      mean: "",
      lastMedian: 315,
      activeMetric: "GC_MS",
      metricOptions: metricData,
      activeVersion: "60",
      versionOptions: ["60", "61", "62"],
      activeChannel: "nightly",
      channelOptions: ["nightly", "beta", "dev edition", "release"],
    };
  }

  componentDidMount = () => {
    this.getProbeInfo();
    this.getCurrentData();
    let mean = this.getMean().toFixed(2);
    let med = this.getPercentile(50).toFixed(2);
    let nfifth = this.getPercentile(95).toFixed(2);
    this.setState({
      median: med,
      nfifthPercentile: nfifth,
      mean: mean,
    });
    this.getChange();
  }

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

  getCurrentData = () => {
    fetch("https://mozilla.github.io/mdv2/data/"
        + this.state.activeMetric + "_"
        + this.state.activeChannel + "_"
        + this.state.activeVersion + ".json")
      .then(response => response.json())
      .then(data => this.setState({currentData: data}));
  }

  getMean = () => {
    let buckets = this.state.currentData.map(item => item.start)
      .concat([this.getLastBucketUpper()]);
    let values = this.state.currentData.map(item => item.count);
    let totalHits = 0,
        bucketHits = 0;
    let linearTerm = (buckets[buckets.length - 1] - buckets[buckets.length -2]) / 2;
    let exponentialFactor = Math.sqrt(buckets[buckets.length - 1] / buckets[buckets.length - 2]);
    let useLinearBuckets = this.kind === "linear" || this.kind === "flag" || this.kind === "boolean" || this.kind === "enumerated";
    for (let i = 0; i < values.length; i++) {
      totalHits += values[i];
      let centralX = useLinearBuckets ? buckets[i] + linearTerm : buckets[i] * exponentialFactor;
      bucketHits += values[i] * centralX;
    };
    return bucketHits / totalHits;
  }

  getLastBucketUpper = () => {
    let buckets = this.state.currentData.map(item => item.start);
    let lastBucketUpper;
    if (this.state.currentData.length === 1) {
      lastBucketUpper = buckets[0] + 1;
    } else {
      /*if (this.state.activeMetric.type === "linear" || this.state.activeMetric.type === "flag" || this.state.activeMetric.type ===
      "boolean" || this.state.activeMetric.type === "enumerated") {
        lastBucketUpper = buckets[buckets.length - 1] + buckets[buckets.length - 1]
        - buckets[buckets.length -2];
      } else {*/
        lastBucketUpper = buckets[buckets.length - 1] * buckets[buckets.length - 1] / buckets[buckets.length - 2];
      //}
    }
    return lastBucketUpper;
  };

  getPercentile = (percentile) => {
    let buckets = this.state.currentData.map(item => item.start);
    buckets = buckets.concat([this.getLastBucketUpper()]);
    let values = this.state.currentData.map(item => item.count);
    //var linearTerm = buckets[buckets.length - 1] - buckets[buckets.length - 2];
    let exponentialFactor = buckets[buckets.length - 1] / buckets[buckets.length - 2];
    let percentileCount = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * (percentile / 100);
    let percentileBucketIndex = 0;
    while (percentileCount >= 0) {
      percentileCount -= this.state.currentData[percentileBucketIndex].count;
      percentileBucketIndex++;
    }
    percentileBucketIndex--;
    percentileCount += this.state.currentData[percentileBucketIndex].count;
    let ratioInBar = percentileCount / this.state.currentData[percentileBucketIndex].count;
    /*if (this.kind === "linear" || this.kind === "flag" || this.kind ===
    "boolean" || this.kind === "enumerated") {
      return buckets[percentileBucketIndex] + linearTerm * ratioInBar;
    } else {*/
    return buckets[percentileBucketIndex] * Math.pow(exponentialFactor, ratioInBar);
    //}
  };

  onMetricChange = (value) => {
    this.setState({
      activeMetric: value,
    });
  }

  onVersionChange = (value) => {
    this.setState({
      activeVersion: value,
    });
  }

  onChannelChange = (value) => {
    this.setState({
      activeChannel: value,
    });
  }

  getChange = () => {
    var rawChange = this.state.median - this.state.lastMedian;
    var pctChange = (rawChange / this.state.lastMedian) * 100;
    var roundedChange = pctChange.toFixed(2);
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
          mean = {this.state.mean}
        />
      </div>
    );
  }
}

export default App;

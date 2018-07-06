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

<<<<<<< Updated upstream
  componentWillMount = () => {
    fetch("https://mozilla.github.io/mdv2/public/data" + this.state.activeMetric + "_" + this.state.activeChannel + "_" + this.state.activeVersion + ".json")
      .then(response => response.json())
      .then(data => this.setState({
        currentData: data,
      }));
  }

=======
>>>>>>> Stashed changes
  componentDidMount = () => {
    var med = this.getPercentile(50);
    var nfifth = this.getPercentile(95);
    this.getChange();
    this.setState({
      median: med,
      nfifthPercentile: nfifth,
    });
  }

  getLastBucketUpper = () => {
    if (this.state.currentData.length === 1) return this.state.currentData[0] + 1;
    return this.state.currentData[this.state.currentData.length - 1] + this.state.currentData[this.state.currentData.length - 1]
        - this.state.currentData[this.state.currentData.length -2];
  };


  getPercentile = (percentile) => {
    var starts = this.state.currentData.map(item =>
      [item.start]);
    var buckets = starts.concat([this.getLastBucketUpper()]);
    // find the distance between last two buckets.
    var linearTerm = buckets[buckets.length - 1] - buckets[buckets.length - 2];
    // Adds up total count and multiplies by percentile passed to find the # of counts that lie below the percentile line.
    var percentileCount = this.state.currentData.reduce(function (previous, count) {
      return previous + count;
    }, 0) * (percentile / 100);

    var percentileBucketIndex = 0;

    // Increment index from 0 while subtracting bucket count from PercentileInBar for each bucket/index until PercentileInBar is less than zero, then subtract 1 to index. That is the index of the bucket that holds the percentile.
    while (percentileCount >= 0) {
      percentileCount -= this.state.currentData[percentileBucketIndex];
      percentileBucketIndex++;
    }
    percentileBucketIndex--;
    // Add back the last bucket count.
    percentileCount += this.state.currentData[percentileBucketIndex];
    // Divide PercentileInBar by count in index bucket to get ratio of the hits in the percentile to the hits in the bar containing it
    var ratioInBar = percentileCount / this.state.currentData[percentileBucketIndex];
    console.log(starts, buckets, linearTerm, percentileCount);
    return buckets[percentileBucketIndex] + linearTerm * ratioInBar;
  };

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

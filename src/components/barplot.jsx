import React, {Component} from "react";
import Plot from "react-plotly.js";
import {format} from "d3"

function formatCount(count) {
  // For values with fewer than four digits, just display the value.
  // For values with more than four digits, show three sig fix and a suffix.
  return count < 1000 ? '' + count : format(".3s")(count);
}

function makePlotly(channel, version, data) {
  let plotlyData = {
    type: "bar",
    x: [],
    y: [],
    text: [],
    name: `${channel} ${version}`,
    hoverinfo: "y+text",
  };

  for (const {start, label, proportion, count, end} of data) {
    let x;
    let text;
    if (label) {
      if (label === "spill") {
        x = "other";
        text = `Invalid samples - ${formatCount(count)} users`;
      } else {
        x = label;
        text = `${label} - ${formatCount(count)} users`;
      }
    } else {
      x = start;
      if (!end) {
        text = `values at least ${start} - ${formatCount(count)} users`;
      } else {
        text = `values between ${start} and ${end - 1} - ${formatCount(count)} users`;
      }
    }
    plotlyData.x.push(x);
    plotlyData.text.push(text);
    plotlyData.y.push(proportion);
  }

  return plotlyData;
}

function prepData({metric, channel, version, data}) {

  let plotData = data;

  const BOOL_MEASURES = [
    "devtools.onboarding.is_devtools_user",
    "telemetry.os_shutting_down",
  ];

  if (BOOL_MEASURES.includes(metric)) {
    const [never, always] = data;
    const totalCount = Math.ceil(never.count
                                  ? never.count / never.proportion
                                  : always.count / always.proportion);
    const sometimes = {
      start: 2,
      end: null,
      label: "sometimes",
      count: totalCount - never.count - always.count,
      proportion: 1 - never.proportion - always.proportion,
    };
    plotData = [always, sometimes, never];
  }

  return makePlotly(channel, version, plotData);
}

export class BarPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plotWidth: window.innerWidth,
    };

    // bind `this` so setState is called on the Component.
    this.onResize = () => {
      this.setState({
        plotWidth: 0.75 * window.innerWidth,
      });
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    const {metric} = this.props.data[0];
    const plotlyData = this.props.data.map(prepData);

    let plotLayout = {
      type: "bar",
      title: metric,
      width: this.state.plotWidth,
      xaxis: {
        type: "category",
      },
      yaxis: {
        title: "Proportion of Users",
        hoverformat: ".4p",
        tickformat: ".3p",
      },
    };

    return (
      <Plot
        data={plotlyData}
        layout={plotLayout}
      />
    );
  }
}

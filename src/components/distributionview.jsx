import React, {Component} from "react";
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import {TableMode} from "./tablemode.jsx";
import Plot from "react-plotly.js";
import {format} from "d3";

export class DistributionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "graph",
    };

    this.onResize = () => {
      this.setState({plotWidth: 0.75 * window.innerWidth});
    };

    this.formatCount = (count) => {
      // For values with fewer than four digits, just display the value. For
      // values with more than four digits, show three sig figs and a suffix.
      return count < 1000 ? count : format(".3s")(count);
    };

    this.makePlotly = (data) => {
      let plotlyData = {
        type: "bar",
        x: [],
        y: [],
        text: [],
        customdata: [],
        hoverinfo: "y+text",
      };

      for (let {start, label, proportion, count, end} of data) {
        let x;
        let text;
        if (label) {
          x = label;
          text = `${label} - ${this.formatCount(count)} clients`;
        } else {
          x = start;
          text = `[${start}, ${end-1}) - ${this.formatCount(count)} clients`;
        }
        plotlyData.x.push(x);
        plotlyData.text.push(text);
        plotlyData.y.push(proportion);
        plotlyData.customdata.push(count);
      }

      return plotlyData;
    };
  }

  handleChange = (event) => {
    this.setState({mode : event,});
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  makeBooleanData(metric, [never, always]) {
    const totalCount = Math.ceil(never.count / never.proportion);
    const sometimes = {
      start: 2,
      end: null,
      label: "sometimes",
      count: totalCount - never.count - always.count,
      proportion: 1 - never.proportion - always.proportion,
    };

    const threeTraces = [always, sometimes, never].map(datum => {
      let plotDatum = this.makePlotly([datum]);
      plotDatum.name = datum.label;
      plotDatum.x[0] = "";
      return plotDatum;
    });

    return threeTraces;
  }

  render() {
    let metric = this.props.dataStore.active.metric;
    let data = this.props.dataStore.active.data;

    const BOOL_MEASURES = [
      "scalars_devtools_onboarding_is_devtools_user",
      "scalars_telemetry_os_shutting_down",
    ];

    let plotData;
    let extraMessage;
    if (BOOL_MEASURES.includes(metric)) {
      plotData = this.makeBooleanData(metric, data);
      const trueCount = Math.ceil(data[0].count / data[0].proportion) - data[0].count;
      const trueProportion = ((1 - data[0].proportion) * 100).toFixed(2);
      extraMessage = (
        <p>{trueCount} users ({trueProportion}% of respondents) reported true at least once.</p>
      );
    } else {
      plotData = [this.makePlotly(data)];
    }

    return (
      <Grid  className="distribution view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The distribution view displays the distribution of user outcomes as a histogram.
            <div>Hover over a point on the graph to view a specific value.</div>
            <div>Or, switch to table mode below to see a list of all absolute values.</div>
          </Col>
        </Row>
        <Row>
          <ToggleButtonGroup
            name="mode-options"
            id="selector"
            type="radio"
            value={this.state.mode}
            onChange={this.handleChange}
          >
            <ToggleButton value="graph">Graph</ToggleButton>
            <ToggleButton value="table">Table</ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row>
          {this.state.mode === "graph" &&
            <Plot
              data={plotData}
              layout={ {
                type: "bar",
                title: metric,
                width: this.state.plotWidth,
                xaxis: {
                  type: "category",
                  title: metric,
                },
                yaxis: {
                  title: "Proportion of Users",
                  hoverformat: ".4p",
                  tickformat: ".3p",
                },
              } }
            />
          }
          {this.state.mode === "table" &&
            <TableMode
              activeMetric = {metric}
              currentData = {data}
            />
          }
        </Row>
        <Row>
          {extraMessage}
        </Row>
      </Grid>
    );
  }
}

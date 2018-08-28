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

  render() {
    let mean = this.props.dataStore.mean.toFixed(2);
    let metric = this.props.dataStore.active.metric;
    let data = this.props.dataStore.active.data;

    let plotlyData = {
      name: "metric",
      type: "bar",
      x: [],
      y: [],
      text: [],
      customdata: [],
    };
    for (let {start, label, proportion, count, end} of data) {
      if (label) {
        plotlyData.x.push(label);
        plotlyData.text.push(`${label} - ${format(".3s")(count)} clients`);
      } else {
        plotlyData.x.push(start);
        plotlyData.text.push(`[${start}, ${end}] ${format(".3s")(count)} clients`);
      }
      plotlyData.y.push(proportion);
      plotlyData.customdata.push(count);
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
              data={[plotlyData]}
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
                  hoverformat: ".3p",
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
          <p>Mean: {mean}</p>
        </Row>
      </Grid>
    );
  }
}

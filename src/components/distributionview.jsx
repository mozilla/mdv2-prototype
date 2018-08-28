import React, {Component} from "react";
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import {TableMode} from "./tablemode.jsx";
import MetricsGraphics from "react-metrics-graphics";
import 'metrics-graphics/dist/metricsgraphics.css';

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
            <MetricsGraphics
              title={metric}
              data={data}
              x_label={metric}
              y_label="Proportion of Users"
              chart_type="histogram"
              width={600}
              height={250}
              show_rollover_text={true}
              y_accessor="proportion"
              x_accessor="start"
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

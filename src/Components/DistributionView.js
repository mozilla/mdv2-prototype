import React, {Component} from "react";
import {Grid, Row, Col, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import {TableMode} from "./TableMode.js";
import MetricsGraphics from "react-metrics-graphics";
import 'metrics-graphics/dist/metricsgraphics.css';

export class DistributionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "graph",
    };
  }

  handleChange = (event) => {
    this.setState({mode : event,});
  }

  render() {
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
              title={this.props.activeMetric}
              data={this.props.currentData}
              x_label={this.props.activeMetric}
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
              activeMetric = {this.props.activeMetric}
              currentData = {this.props.currentData}
            />
          }
        </Row>
        <Row>
          <p>Mean: {this.props.mean}</p>
        </Row>
      </Grid>
    );
  }
}

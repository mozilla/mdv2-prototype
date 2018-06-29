import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";
import MetricsGraphics from "react-metrics-graphics";
import 'metrics-graphics/dist/metricsgraphics.css';

export class EvolutionView extends Component {
  render() {
    return (
      <Grid  className="evolve-view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The evolution view shows the evolution of a given aggregate over time.
            <div>Select an aggregate type to compare, and choose a version below to compare against.</div>
            <div>Hover over a point on the graph to view a specific set of values.</div>
          </Col>
        </Row>
        <Row>
          <MetricsGraphics
            title={this.props.activeMetric}
            data={this.props.currentData}
            x_label={this.props.activeMetric}
            y_label="Proportion of Users"
            y_accessor="proportion"
            x_accessor="start"
            width={600}
            height={250}
          />
        </Row>
      </Grid>
    )
  }
}

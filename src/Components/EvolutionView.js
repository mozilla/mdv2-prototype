import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";

export class EvolutionView extends Component {
  render() {
    return (
      <Grid  className="evolve-view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The evolution view shows the evolution of a given aggregate over time.
          </Col>
          <Col>
            <div>Select an aggregate type to compare, and choose a version below to compare against.</div>
            <div>Hover over a point on the graph to view a specific set of values.</div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

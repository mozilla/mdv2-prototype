import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";

export class ComparisonView extends Component {
  render() {
    return (
      <Grid  className="compare-view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The comparison view displays the distribution of a measure across two versions.
          </Col>
          <Col>
            <div>Select a version below to compare against.</div>
            <div>Hover over a point on the graph to view a specific set of values.</div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

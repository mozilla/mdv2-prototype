import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";

export class DistributionView extends Component {
  render() {
    return (
      <Grid  className="dist-view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The distribution view displays the distribution of user outcomes as a histogram.
          </Col>
          <Col>
            <div>Hover over a point on the graph to view a specific value.</div>
            <div>Or, switch to table mode below to see a list of all absolute values.</div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

export class SummaryView extends Component {
  render() {
    return (
      <Grid  className="summary-view" fluid>
        <Row>
          <p>
            <i className="fas fa-info-circle"></i> The summary view offers an overview of statistics from the measure.
          </p>
        </Row>
        <Row>
          <p>The median value for {this.props.activeMetric} is...</p>
          <p>The 95th percentile for {this.props.activeMetric} is...</p>
          <p>Since {this.props.activeChannel} {this.props.activeVersion - 1}, the median value for {this.props.activeMetric} has (increased/decreased) by...</p>
        </Row>
      </Grid>
    )
  }
}

import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

export class SummaryView extends Component {
  render() {
    return (
      <Grid className="summary-view" fluid>
        <Row>
          <p>
            <i className="fas fa-info-circle"></i> The summary view offers an overview of statistics from the measure.
          </p>
        </Row>
        <Row>
          <h3>Median: {this.props.median}</h3>
          <p>The median value for {this.props.activeMetric} is {this.props.median}.</p>
          <h3>95th Percentile: {this.props.nfifthPercentile}</h3>
          <p>The 95th percentile for {this.props.activeMetric} is {this.props.nfifthPercentile}.</p>
          <h3>
            {this.props.change > 0 &&
              <i className="fas fa-arrow-up"></i>
            }
            {this.props.change < 0 &&
              <i className="fas fa-arrow-down"></i>
            } Change: {this.props.change}%</h3>
          <p>Since {this.props.activeChannel} {this.props.activeVersion - 1}, the median value for {this.props.activeMetric} has
            {this.props.change > 0 &&
              " increased"
            }
            {this.props.change < 0 &&
              " decreased"
            } by {this.props.change}%.</p>
        </Row>
      </Grid>
    );
  }
}

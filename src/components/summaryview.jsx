import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

export class SummaryView extends Component {
  render() {
    let median = this.props.dataStore.median.toFixed(2);
    let nfifth = this.props.dataStore.nfifthPercentile.toFixed(2);
    let change = this.props.dataStore.change.toFixed(2);

    let metric = this.props.dataStore.active.metric;
    let channel = this.props.dataStore.active.channel;
    let version = this.props.activeVersion;

    return (
      <Grid className="summary view" fluid>
        <Row>
          <p>
            <i className="fas fa-info-circle"></i> The summary view offers an overview of statistics from the measure.
          </p>
        </Row>
        <Row>
          <h3>Median: {median}</h3>
          <p>The median value for {metric} {channel} {version} is {median}.</p>
          <h3>95th Percentile: {nfifth}</h3>
          <p>The 95th percentile for {metric} {channel} {version} is {nfifth}.</p>
          <h3>
            {change > 0 &&
              <i className="fas fa-arrow-up"></i>
            }
            {change < 0 &&
              <i className="fas fa-arrow-down"></i>
            } Change: {change}%</h3>
          <p>Since {channel} {version - 1}, the median value for {metric} has
            {change > 0 &&
              " increased"
            }
            {change < 0 &&
              " decreased"
            } by {change}%.</p>
        </Row>
      </Grid>
    );
  }
}

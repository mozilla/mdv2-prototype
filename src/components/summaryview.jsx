import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

export class SummaryView extends Component {
  render() {
    return (
      <Grid className="summary view" fluid>
        <Row>
          <p>
            <i className="fas fa-info-circle"></i> The summary view offers an overview of statistics from the measure.
          </p>
        </Row>
        <Row>
          <h3>Median: {this.props.dataStore.median.toFixed(2)}</h3>
          <p>The median value for {this.props.dataStore.active.metric} {this.props.dataStore.active.channel} {this.props.activeVersion} is {this.props.dataStore.median}.</p>
          <h3>95th Percentile: {this.props.dataStore.nfifthPercentile.toFixed(2)}</h3>
          <p>The 95th percentile for {this.props.dataStore.active.metric} {this.props.dataStore.active.channel} {this.props.dataStore.active.version} is {this.props.dataStore.nfifthPercentile.toFixed(2)}.</p>
          <h3>
            {this.props.dataStore.change > 0 &&
              <i className="fas fa-arrow-up"></i>
            }
            {this.props.dataStore.change < 0 &&
              <i className="fas fa-arrow-down"></i>
            } Change: {this.props.dataStore.change.toFixed(2)}%</h3>
          <p>Since {this.props.dataStore.active.channel} {this.props.dataStore.active.version - 1}, the median value for {this.props.dataStore.active.metric} has
            {this.props.dataStore.change > 0 &&
              " increased"
            }
            {this.props.dataStore.change < 0 &&
              " decreased"
            } by {this.props.dataStore.change}%.</p>
        </Row>
      </Grid>
    );
  }
}

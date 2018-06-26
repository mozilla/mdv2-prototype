import React, {Component} from "react";
import {Grid, Row, Col} from "react-bootstrap";

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
          <p>The median value for this probe is...</p>
          <p>The 95th percentile for this probe is...</p>
          <p>Since the last version, the median value for this probe has (increased/decreased) by...</p>
        </Row>
      </Grid>
    )
  }
}

import React, {Component} from "react";
import {Grid, Row, Tooltip} from "react-bootstrap";

export class ComparisonView extends Component {
  render() {
    return (
      <Grid  className="compare-view" fluid>
        <Row>
          <i className="fas fa-info-circle"></i> The comparison view displays the distribution of a measure across two versions.
        </Row>
      </Grid>
    )
  }
}

import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

export class EvolutionView extends Component {
  render() {
    return (
      <Grid  className="evolve-view" fluid>
        <Row>
          <p>
            <i className="fas fa-info-circle"></i> The evolution view shows the evolution of a given aggregate over time.
          </p>
        </Row>
      </Grid>
    )
  }
}

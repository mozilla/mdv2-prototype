import React from "react";
import {Grid, Row} from "react-bootstrap";

export class MetricSelector extends React.Component {
  render () {
    return (
      <Grid className="search-bar" fluid>
        <Row>
          <form>
            <h2>My Metric:</h2>
            <input
              ref={input => this.search = input}
              onChange={this.props.handleInputChange}
            />
          </form>
        </Row>
      </Grid>
    )
  }
}

import React from "react";
import {Grid, Row} from "react-bootstrap";
import Autosuggest from "react-bootstrap-autosuggest";

export class MetricSelector extends React.Component {
  render () {
    return (
      <Grid className="search-bar" fluid>
        <Row>
          <form>
            <Autosuggest
              onChange={this.props.onMetricChange}
              datalist={this.props.metricOptions}
              placeholder={this.props.activeMetric}
              ref={input => this.search = input}
            />
          </form>
        </Row>
      </Grid>
    );
  }
}

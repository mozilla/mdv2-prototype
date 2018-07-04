import React from "react";
import {Grid, Row} from "react-bootstrap";
import Autosuggest, {ItemAdapter} from "react-bootstrap-autosuggest";
import "react-bootstrap-autosuggest/src/Autosuggest.scss";

export class MetricSelector extends React.Component {
  render () {
    return (
      <Grid className="metric-search-bar" fluid>
        <Row>
          <form>
            <Autosuggest
              onChange={this.props.onMetricChange}
              datalist={this.props.metricOptions}
              placeholder={this.props.activeMetric}
              ref={input => this.search = input}
              itemAdapter={ItemAdapter.instance}
            />
          </form>
        </Row>
      </Grid>
    )
  }
}

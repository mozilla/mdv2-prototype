import React from "react";
import Autosuggest from "react-bootstrap-autosuggest";
import "react-bootstrap-autosuggest/src/Autosuggest.scss";

export class MetricSelector extends React.Component {
  render () {
    return (
      <form
        id="selector"
      >
        <h3>Metric:</h3>
        <Autosuggest
          onChange={this.props.onMetricChange}
          datalist={this.props.metricOptions}
          datalistOnly={true}
          defaultValue={this.props.activeMetric}
          required={true}
          ref={input => this.search = input}
        />
      </form>
    );
  }
}

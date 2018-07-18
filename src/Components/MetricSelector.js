import React from "react";
import Autosuggest from "react-bootstrap-autosuggest";
import "react-bootstrap-autosuggest/src/Autosuggest.scss";

export class MetricSelector extends React.Component {
  render () {
    return (
      <form
        id="selector"
      >
        <Autosuggest
          onChange={this.props.onMetricChange}
          datalist={this.props.metricOptions}
          placeholder={this.props.activeMetric}
          ref={input => this.search = input}
        />
      </form>
    );
  }
}

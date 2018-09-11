import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

import {format} from "d3";

export class SummaryView extends Component {

  formatPct(proportion) {
    const LOW_THRESHOLD = 0.001; // 0.1%
    if (proportion === 0) {
      return `0%`;
    } else if (proportion < LOW_THRESHOLD) {
      return `less than ${format(".1p")(LOW_THRESHOLD)}`;
    } else if (proportion < 0.1) { // 10%
      return format(".2p")(proportion);
    } else if (proportion > 0.999) { // 99.9%
      return format(".3p")(0.999);
    } else {
      return format(".3p")(proportion);
    }
  }

  formatCount(count) {
    return format(",")(count);
  }

  renderBooleanText() {
    const metric = this.props.dataStore.active.metric;
    const channel = this.props.dataStore.active.channel;
    const version = this.props.dataStore.active.version;

    const always = this.props.dataStore.active.data[1];
    const never = this.props.dataStore.active.data[0];

    const alwaysPct = this.formatPct(always.proportion);
    const everPct = this.formatPct(1 - never.proportion);
    const neverPct = this.formatPct(never.proportion);

    return (
      <Row>
        <h3>Always true: {alwaysPct}</h3>
        <p>For {channel} {version}, {alwaysPct} of users always reported true for {metric}</p>
        <h3>Ever true: {everPct}</h3>
        <p>For {channel} {version}, {everPct} of users ever reported true for {metric}</p>
        <h3>Never true: {neverPct}</h3>
        <p>For {channel} {version}, {neverPct} of users never reported true for {metric}</p>
        <p></p>
      </Row>
    );
  }

  renderFirstN(array, n) {
    return array.map((datum, i) => {
      if (i < n) {
        let concat = "";
        if (i < n - 1) {
          concat += ", ";
        }
        if (i === n - 2) {
          concat += "and ";
        }
        return <span> {datum.label} ({this.formatPct(datum.proportion)}){concat}</span>
      }
      return null;
    })
  }

  renderCategoricalText() {
    const orderedData = this.props.dataStore.active.data
      .filter(datum => datum.label !== "spill")
      .sort((a, b) => a.count < b.count);

    const metric = this.props.dataStore.active.metric;
    const channel = this.props.dataStore.active.channel;
    const version = this.props.dataStore.active.version;

    const NUM_COMMON_CATEGORIES = 3;

    return (
      <Row>
        <h3>Most Common: {orderedData[0].label} with {this.formatPct(orderedData[0].proportion)}</h3>
        <p>The most common categories reported by users for {metric} on Firefox {channel} {version} are
          {this.renderFirstN(orderedData, NUM_COMMON_CATEGORIES)}.
        </p>
      </Row>
    );
  }

  renderNumericText() {
    const median = this.props.dataStore.median.toFixed(2);
    const nfifth = this.props.dataStore.nfifthPercentile.toFixed(2);
    const change = this.props.dataStore.change.toFixed(2);

    const metric = this.props.dataStore.active.metric;
    const channel = this.props.dataStore.active.channel;
    const version = this.props.dataStore.active.version;

    return (
      <Row>
        <h3>Median: {median}</h3>
        <p>The median value for {metric} on {channel} {version} was {median}.</p>
        <h3>95th Percentile: {nfifth}</h3>
        <p>The 95th percentile for {metric} on {channel} {version} was {nfifth}.</p>
        <h3>
          {change > 0 &&
            <i className="fas fa-arrow-up"></i>
          }
          {change < 0 &&
            <i className="fas fa-arrow-down"></i>
          } Change: {change}%</h3>
        <p>From {channel} {version - 1} to {version}, the median value for {metric}
          {change > 0 &&
            " increased"
          }
          {change < 0 &&
            " decreased"
          } by {change}%.</p>
      </Row>
    );
  }

  render() {
    const metric = this.props.dataStore.active.metric;

    const BOOL_MEASURES = [
      "scalars_devtools_onboarding_is_devtools_user",
      "scalars_telemetry_os_shutting_down",
    ];

    const CATEGORICAL_MEASURES = [
      "HTTP_SCHEME_UPGRADE_TYPE",
    ];

    let innerText;
    if (BOOL_MEASURES.includes(metric)) {
      innerText = this.renderBooleanText();
    } else if (CATEGORICAL_MEASURES.includes(metric)) {
      innerText = this.renderCategoricalText();
    } else {
      innerText = this.renderNumericText();
    }

    return (
      <Grid className="summary view" fluid>
        <Row>
          <p>
            <i className="fas fa-info-circle"></i> The summary view offers an overview of statistics from the measure.
          </p>
        </Row>
        {innerText}
      </Grid>
    );
  }
}

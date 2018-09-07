import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

import {format} from "d3";

export class SummaryView extends Component {

  formatPct(proportion) {
    const LOW_THRESHOLD = 0.00001
    if (proportion < LOW_THRESHOLD) {
      return `less than ${format(".1p")(LOW_THRESHOLD)}`;
    } else if (proportion < 0.1) { // 10%
      return format(".2p")(proportion);
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
    const total = Math.ceil(always.count / always.proportion);

    const alwaysPct = this.formatPct(always.proportion);
    const everPct = this.formatPct(1 - never.proportion);
    const neverPct = this.formatPct(never.proportion);

    const totalCount = this.formatCount(total);
    const alwaysCount = this.formatCount(always.count);
    const everCount = this.formatCount(total - never.count);
    const neverCount = this.formatCount(never.count);

    return (
      <Row>
        <h3>Always true: {alwaysPct}</h3>
        <p>{alwaysPct} of users always respond true for {metric} on Firefox {channel} {version}. That's {alwaysCount} of {totalCount} users.</p>
        <h3>Ever true: {everPct}</h3>
        <p>{everPct} of users always respond true for {metric} on Firefox {channel} {version}. That's {everCount} of {totalCount} users.</p>
        <h3>Never true: {neverPct}</h3>
        <p>{neverPct} of users always respond true for {metric} on Firefox {channel} {version}. That's {neverCount} of {totalCount} users.</p>
        <p></p>
      </Row>
    );
  }

  renderFirstN(array, n) {
    return array.map((datum, i) => {
      if (i < n) {
        return <li> {format(".4p")(datum.proportion)} {datum.label} ({datum.count})</li>
      }
      return null;
    })
  }

  renderCategoricalText() {
    const orderedData = this.props.dataStore.active.data
      .filter(datum => datum.label !== "spill")
      .sort((a, b) => a.count < b.count);
    const reverseData = this.props.dataStore.active.data
      .filter(datum => datum.label !== "spill")
      .sort((a, b) => a.count > b.count);

    const pctFormat = format(".4p");

    const metric = this.props.dataStore.active.metric;
    const channel = this.props.dataStore.active.channel;
    const version = this.props.dataStore.active.version;

    const NUM_COMMON_CATEGORIES = 3;

    return (
      <Row>
        <h3>Most Common: {orderedData[0].label} ({pctFormat(orderedData[0].proportion)})</h3>
        <p>The most common categories reported by users for {metric} on Firefox {channel} {version} are:</p>
        <ol>
          {this.renderFirstN(orderedData, NUM_COMMON_CATEGORIES)}
        </ol>
        <h3>Least Common: {reverseData[0].label} ({pctFormat(reverseData[0].proportion)})</h3>
        <p>The least common categories reported by users for {metric} on Firefox {channel} {version} are:</p>
        <ol>
          {this.renderFirstN(reverseData, NUM_COMMON_CATEGORIES)}
        </ol>
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
        <p>The median value for {metric} {channel} {version} is {median}.</p>
        <h3>95th Percentile: {nfifth}</h3>
        <p>The 95th percentile for {metric} {channel} {version} is {nfifth}.</p>
        <h3>
          {change > 0 &&
            <i className="fas fa-arrow-up"></i>
          }
          {change < 0 &&
            <i className="fas fa-arrow-down"></i>
          } Change: {change}%</h3>
        <p>Since {channel} {version - 1}, the median value for {metric} has
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

import React, {Component} from "react";
import {Grid, Row} from "react-bootstrap";

import {format} from "d3";

export class SummaryView extends Component {
  renderBooleanText() {
    const metric = this.props.dataStore.active.metric;
    const channel = this.props.dataStore.active.channel;
    const version = this.props.dataStore.active.version;

    const always = this.props.dataStore.active.data[1];
    const never = this.props.dataStore.active.data[0];
    const totalCount = Math.ceil(always.count / always.proportion);

    const pctFormat = format(".4p");
    const alwaysPct = pctFormat(always.proportion);
    const everPct = pctFormat(1 - never.proportion);
    const neverPct = pctFormat(never.proportion);

    const alwaysCount = always.count;
    const everCount = totalCount - never.count;
    const neverCount = never.count;

    return (
      <Row>
        <h3>Always: {alwaysPct}</h3>
        <p>Of the {totalCount} respondents, {alwaysPct} ({alwaysCount}) always respond true for {metric} on Firefox {channel} {version}.</p>
        <h3>Ever: {everPct}</h3>
        <p>Of the {totalCount} respondents, {everPct} ({everCount}) responded true at least once for {metric} on Firefox {channel} {version}.</p>
        <h3>Never: {neverPct}</h3>
        <p>Of the {totalCount} respondents, {neverPct} ({neverCount}) never responded true for {metric} on Firefox {channel} {version}.</p>
        <p></p>
      </Row>
    );
  }

  renderNumericText() {
    const median = this.props.dataStore.median.toFixed(2);
    const nfifth = this.props.dataStore.nfifthPercentile.toFixed(2);
    const change = this.props.dataStore.change.toFixed(2);

    const metric = this.props.dataStore.active.metric;
    const channel = this.props.dataStore.active.channel;
    const version = this.props.activeVersion;

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

    let innerText = BOOL_MEASURES.includes(metric)
      ? this.renderBooleanText()
      : this.renderNumericText();

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

import React from "react";
import Autosuggest from "react-bootstrap-autosuggest";
import "react-bootstrap-autosuggest/src/Autosuggest.scss";

export class MetricSelector extends React.Component {
  render () {

    const DESCRIPTIONS = {
      "FX_PREFERENCES_CATEGORY_OPENED_V2": "Count how often each preference category is opened.",
      "GC_MS": "Time spent running JS GC (ms)",
      "HTTP_SCHEME_UPGRADE_TYPE": "Was the URL upgraded to HTTPS?",
      "devtools.onboarding.is_devtools_user": "How many users are flagged as existing devtools users.",
      "browser.engagement.tab_open_event_count": "The count of tab open events per subsession, across all windows, after the session has been restored. This includes tab open events from private windows and from manual session restorations (i.e. after crashes and from about:home).",
      "telemetry.os_shutting_down": "Records true if there is a signal that Firefox was quitting because the OS was shutting down. Only available on Windows.",
      "timestamps.first_paint": "Record the timestamp of the first content window paint, in milliseconds since process start.",
    };

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
        <p className="metric-description">{DESCRIPTIONS[this.props.activeMetric]}</p>
      </form>
    );
  }
}

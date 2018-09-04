import fetch from "isomorphic-fetch";
import {MetricData} from "./metricdata.js";

export class DataStore {
  constructor(props) {
    this._active = new MetricData();
  }

  get active() {
    return {
      metric: this._active.metric,
      channel: this._active.channel,
      version: this._active.version,
      data: this._active.data,
    };
  }

  get metricOptions() {
    return [
      "GC_MS",
      "HTTP_SCHEME_UPGRADE_TYPE",
      "scalars_devtools_onboarding_is_devtools_user"
    ];
  }

  get channelOptions() {
    return [
      "nightly",
      "beta",
      "dev edition",
      "release"
    ];
  }

  get versionOptions() {
    return ["60", "61", "62"];
  }

  async loadDataFor(metric, channel, version) {
    try {
      const response = await fetch(`data/${metric}_${channel}_${version}.json`);
      const data = await response.json();

      this._active = {
        ...this._active,
        metric,
        channel,
        version,
        data,
      };
    } catch (e) {
      console.warn(`Failed to load data for ${metric} ${channel} ${version}`, e);
      this._active = {
        ...this._active,
        metric,
        channel,
        version,
        data: [],
      };
    }

    this.updateCachedData();
  }

}

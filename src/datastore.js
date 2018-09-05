import fetch from "isomorphic-fetch";
import {MetricData} from "./metricdata.js";
import GC_MS_nightly_62 from "./data/GC_MS_nightly_62.json";

export class DataStore {
  constructor(props) {
    this._active = new MetricData({
    metric: "GC_MS",
    channel: "nightly",
    version: "62",
    data: GC_MS_nightly_62,
    })
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

      this.active = {
        ...this.active,
        metric,
        channel,
        version,
        data,
      };
    } catch (e) {
      console.warn(`Failed to load data for ${metric} ${channel} ${version}`, e);
      this.active = {
        ...this.active,
        metric,
        channel,
        version,
        data: [],
      };
    }
  }

}

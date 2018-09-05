import GC_MS_nightly_62 from "./data/GC_MS_nightly_62.json";

export default class MetricData {
  constructor(props) {
    this.metric= "GC_MS";
    this.channel= "nightly";
    this.version= "62";
    this.data= GC_MS_nightly_62;
    this.cached = {
      change: "",
      nfifthPercentile: "",
      median: "",
      mean: "",
      lastMedian: 315,
    };
  }

  get mean() {
    return this.getMean();
  }

  get median() {
    return this.getPercentile(50);
  }

  get nfifthPercentile() {
    return this.getPercentile(95);
  }

  get change() {
    return this.getChange();
  }

  getMean() {
    if (this.data.length < 1) {
      return NaN;
    }

    let currentData = this.data;
    let buckets = [
      ...currentData.map(item => item.start),
      this.getLastBucketUpper(),
    ];
    let values = currentData.map(item => item.count);
    let totalHits = 0;
    let bucketHits = 0;
    let linearTerm = (buckets[buckets.length - 1] - buckets[buckets.length -2]) / 2;
    let exponentialFactor = Math.sqrt(buckets[buckets.length - 1] / buckets[buckets.length - 2]);
    let useLinearBuckets = ["linear", "flag", "boolean", "enumerated"].includes(this.kind);

    for (let i = 0; i < values.length; i++) {
      totalHits += values[i];
      let centralX = useLinearBuckets ? buckets[i] + linearTerm : buckets[i] * exponentialFactor;
      bucketHits += values[i] * centralX;
    };

    return bucketHits / totalHits;
  }

  getLastBucketUpper() {
    let currentData = this.data;
    let buckets = currentData.map(item => item.start);
    if (currentData.length === 1) {
      return buckets[0] + 1;
    }

    /*if (this..activeMetric.type === "linear" || this..activeMetric.type === "flag" || this..activeMetric.type ===
    "boolean" || this..activeMetric.type === "enumerated") {
      return buckets[buckets.length - 1] + buckets[buckets.length - 1]
      - buckets[buckets.length -2];
    }*/

    return  buckets[buckets.length - 1] * buckets[buckets.length - 1] / buckets[buckets.length - 2];
  };

  getPercentile(percentile) {
    if (this.data.length < 1) {
      return NaN;
    }

    let currentData = this.data;
    let buckets = [
      ...currentData.map(item => item.start),
      this.getLastBucketUpper(),
    ];
    let values = currentData.map(item => item.count);
    //let linearTerm = buckets[buckets.length - 1] - buckets[buckets.length - 2];
    let exponentialFactor = buckets[buckets.length - 1] / buckets[buckets.length - 2];
    let percentileCount = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0) * (percentile / 100);
    let percentileBucketIndex = 0;
    while (percentileCount >= 0) {
      percentileCount -= currentData[percentileBucketIndex].count;
      percentileBucketIndex++;
    }
    percentileBucketIndex--;
    percentileCount += currentData[percentileBucketIndex].count;
    let ratioInBar = percentileCount / currentData[percentileBucketIndex].count;
    /*if (["linear", "flag", "boolean", "enumerated"].includes(this.kind)) {
      return buckets[percentileBucketIndex] + linearTerm * ratioInBar;
    } else {*/
    return buckets[percentileBucketIndex] * Math.pow(exponentialFactor, ratioInBar);
    //}
  }

  getChange() {
    if (this.data.length < 1) {
      return NaN;
    }

    let rawChange = this.getPercentile(50) - this.cached.lastMedian;
    let pctChange = (rawChange / this.cached.lastMedian) * 100;
    return pctChange;
  }
};

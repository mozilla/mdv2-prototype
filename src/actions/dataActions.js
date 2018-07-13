export function changeMetric(metric) {
  return {
    type: 'CHANGE_METRIC',
    metric
  }
}

export function changeChannel(channel) {
  return {
    type: 'CHANGE_CHANNEL',
    channel
  }
}

export function changeVersion(version) {
  return {
    type: 'CHANGE_VERSION',
    version
  }
}

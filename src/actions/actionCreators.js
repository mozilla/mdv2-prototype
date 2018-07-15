export const changeMetric = metric => ({
    type: 'CHANGE_METRIC',
    metric
});

export const changeChannel = channel => ({
    type: 'CHANGE_CHANNEL',
    channel
});

export const changeVersion = version => ({
    type: 'CHANGE_VERSION',
    version
});

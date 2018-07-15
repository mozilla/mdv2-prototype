import {
  changeChannel,
  changeMetric,
  changeVersion
} from "./../actions/actionCreators.js";

const initialState = {
  channel: "nightly",
  metric: "GC_MS",
  version: 62
}

function filters(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_CHANNEL':
      return Object.assign({}, state, {
        channel: action.channel
      })
    case 'CHANGE_METRIC':
      return Object.assign({}, state, {
        metric: action.metric
      })
    case 'CHANGE_VERSION':
      return Object.assign({}, state, {
        version: action.version
      })
    default:
      return state;
  }
}


export default filters;

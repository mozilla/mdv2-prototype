import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import channel from './channel.js';
import metric from './metric.js';
import version from './version.js';

const rootReducer = combineReducers({channel, metric, version, router: routerReducer});

export default rootReducer;

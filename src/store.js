import { createStore, compse } from 'redux';
import rootReducer from './reducers/index';
import data from './data/GC_MS_nightly_62';

const defaultState = {
  channel: "nightly",
  data
  metric: "GC_MS",
  version: 62
};

const store = createStore(rootReducer, defaultState);

export default store;

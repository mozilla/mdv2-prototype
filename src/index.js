import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import { Provider } from 'react-redux';
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from 'redux';
import filters from './reducers/filters.js';

const defaultState = {
  channel: "nightly",
  metric: "GC_MS",
  version: 62
};

const store = createStore(filters, defaultState,
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

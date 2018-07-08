import React from 'react';
import ReactDOM from 'react-dom';
import App, getCurrentData, getProbeInfo from './App';
import fetchMock from "fetch-mock";

fetchMock.get("*", {hello: "world"});

getCurrentData().then(function(data) {
  console.log("got data", data);
});

getProbeInfo().then(function(data) {
  console.log("got data", data);
});

fetchMock.restore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

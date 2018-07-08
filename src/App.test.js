import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from "fetch-mock";

fetchMock.get("*", {hello: "world"});

this.getCurrentData().then(function(data) {
  console.log("got data", data);
});

this.getProbeInfo().then(function(data) {
  console.log("got data", data);
});

fetchMock.restore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

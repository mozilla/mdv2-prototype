import React from 'react';
import ReactDOM from 'react-dom';
import App, getCurrentData from './App';
import fetchMock from "fetch-mock";

fetchMock.get("https://mozilla.github.io/mdv2/data/GC_MS_nightly_62.json", {hello: "world"});

getCurrentData().then(function(data) {
  console.log("got data", data);
});

fetchMock.restore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
jest.mock('react-plotly.js', () => "plot");
import App from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

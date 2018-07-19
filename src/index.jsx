import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";

render(
  <App />,
  document.getElementById("root")
);

registerServiceWorker();

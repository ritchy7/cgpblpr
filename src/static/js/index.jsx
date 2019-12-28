import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
require('../css/grandpy.css')

// Render the entire React components in root div wich have the root id.
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

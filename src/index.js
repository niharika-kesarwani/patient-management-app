import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./app/store";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <Provider store={configureStore}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
  rootElement
);

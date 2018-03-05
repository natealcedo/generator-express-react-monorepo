import App from "./containers/App";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import "scss/index.scss";

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    global.document.getElementById("root"),
  );
}

if (module.hot) {
  module.hot.accept();
}

render();

// @format
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Root from "./components/Root";
import reducers from "./reducers";
import sagas from "./sagas";

(async function boot() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(sagas);

  ReactDOM.render(<Root store={store} />, document.querySelector(".root"));
})();

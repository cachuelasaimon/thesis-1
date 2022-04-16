import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import sagas from "./sagas";

const INITIAL_STATE = {};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  reducers,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sagas);

export default store;

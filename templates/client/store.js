import logger from "redux-logger";
import reducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const composeEnhancers = composeWithDevTools({
  // options like actionSanitizer, stateSanitizer
});

const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(logger)),
);

export default store;

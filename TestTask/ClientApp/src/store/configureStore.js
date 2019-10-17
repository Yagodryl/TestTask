import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { itemsReducer } from "../components/items/reducer";
import {statisticReducer} from "../components/statistic/reducer";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
export const history = createBrowserHistory({ basename: baseUrl });
export default function configureStore(history, initialState) {
  const reducers = {
    items: itemsReducer,
    statistic: statisticReducer
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment && typeof window !== "undefined" && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}

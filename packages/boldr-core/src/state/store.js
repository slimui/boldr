/**
 * @module boldr-core/lib/state/store
 */
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunkMiddleware from 'redux-thunk';
import invariant from 'invariant';

import boldrReducers from './reducers';
import httpMiddleware from './middlewares/http';
import cmfMiddleware from './middlewares/cmf';

const preReducers = [];
const enhancers = [];
const middlewares = [thunkMiddleware, httpMiddleware, cmfMiddleware];

/**
 * setRouterMiddleware overwrites the default router middleware
 *
 * @param middleware a router middleware
 */
function setRouterMiddleware(middleware) {
  middlewares.push(middleware);
  defaultRouterOverwrite = true;
}

function addPreReducer(reducers) {
  if (typeof reducers === 'function') {
    preReducers.push(reducers);
  } else if (Array.isArray(reducers)) {
    preReducers.push(...reducers);
  }
}

function preApplyReducer(reducer) {
  if (preReducers.length === 0) {
    return reducer;
  }
  const newReducer = (state, action) => {
    const newState = preReducers.reduce((acc, r) => r(acc, action), state);
    return reducer(newState, action);
  };
  return newReducer;
}

/**
 * Return the reducer
 * @param  {function|Object} projectReducer   The reducer from the user's project
 * @return {function}            [description]
 */
function getReducer(projectReducer, apolloClient) {
  let mainReducer = {};
  if (projectReducer) {
    if (typeof projectReducer === 'object') {
      mainReducer = {
        ...projectReducer,
      };
    } else if (typeof projectReducer === 'function') {
      mainReducer = { app: projectReducer };
    }
  } else {
    invariant(true, 'You must supply a reducer via the init function.');
  }
  if (!mainReducer.apollo) {
    mainReducer.apollo = apolloClient.reducer();
  }

  if (!mainReducer.boldr) {
    mainReducer.boldr = boldrReducers;
  }
  mainReducer.router = routerReducer;
  return enableBatching(preApplyReducer(combineReducers(mainReducer)));
}

function getMiddlewares(middleware) {
  if (Array.isArray(middleware)) {
    middleware.forEach(mid => {
      if (middlewares.indexOf(mid) === -1) {
        middlewares.push(mid);
      }
    });
  } else if (middleware) {
    middlewares.push(middleware);
  }

  return middlewares;
}

/**
 * Helper function to hook the user's store with the CMF store.
 * @param  {function} projectReducer        The user's reducer
 * @param  {any} preloadedState             The Apollo data from the window
 *
 * @param  {function} enhancer              The store's enhancers
 * @param  {Array|function} middleware      redux middleware
 * @return {Object}                         The store
 */
function init(projectReducer, apolloClient, history, preloadedState, enhancer) {
  const middleware = [];
  const reduxRouterMiddleware = routerMiddleware(history);
  if (typeof enhancer === 'function') {
    enhancers.push(enhancer);
  }
  const reducer = getReducer(projectReducer, apolloClient);

  middleware.push(apolloClient.middleware(), reduxRouterMiddleware);

  const mw = getMiddlewares(middleware);

  const store = compose(applyMiddleware(...mw), ...enhancers)(createStore)(reducer, preloadedState);

  return store;
}

export default {
  addPreReducer,
  setRouterMiddleware,
  init,
  // for testing purepose only
  getReducer,
  getMiddlewares,
};
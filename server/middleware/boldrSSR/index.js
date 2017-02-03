/* @flow */

import type { $Request, $Response, Middleware, NextFunction } from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import Helmet from 'react-helmet';
import { trigger } from 'redial';

import AppRoot from '../../../shared/components/AppRoot';
import createRoutes from '../../../shared/scenes';
import ApiClient from '../../../shared/core/api/apiClient';
import configureStore from '../../../shared/state/store';
import getConfig from '../../../config/get';
import ServerHTML from './ServerHTML';

const debug = require('debug')('boldr:ssrMW');

/**
 * An express middleware that is capabable of service our React application,
 * supporting server side rendering of the application.
 */
function boldrSSR(req: $Request, res: $Response, next: NextFunction) {
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }
  // If path start with /static :: return next()
  if (req.url.match(/^\/static\/.*/i) !== null) {
    return next();
  }
  const nonce = res.locals.nonce;

  const getHost = req =>
    `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

  global.navigator = { userAgent: req.headers['user-agent'] };

  const createStore = req => configureStore({});

  const apiClient = new ApiClient(req);
  const memoryHistory = createMemoryHistory(req.url);
  const store = createStore(req, memoryHistory, apiClient);

  const history = syncHistoryWithStore(memoryHistory, store);
  const routes = createRoutes(store);

  const { dispatch, getState } = store;

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    debug(`path : ${req.url}`);
    if (error || !renderProps) {
      return next(error);
    }
    if (redirectLocation) {
      debug('---------------- redirectLocation ----------------');
      debug(redirectLocation);
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    }
    const { components } = renderProps;
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch,
    };

    trigger('fetch', components, locals)
       .then(() => {
         const AppRender = (store, renderProps) => renderToString(
            <AppRoot store={ store }>
              <RouterContext { ...renderProps } helpers={ apiClient } />
            </AppRoot>,
          );
         const preloadedState = store.getState();
         const reactAppString = AppRender(store, renderProps);
         const helmet = Helmet.rewind();
         // render styled-components styleSheets to string.
         const styles = styleSheet.rules().map(rule => rule.cssText).join('\n');

         const html = renderToStaticMarkup(
           <ServerHTML
             reactAppString={ reactAppString }
             nonce={ nonce }
             helmet={ Helmet.rewind() }
             styles={ styles }
             preloadedState={ preloadedState }
           />,
         );
         res.status(200).send(html);
       }).catch((err) => {
         debug('---------------- SSR ON ERROR ----------------');
         debug(err);
         res.status(500).end();
       });
  });
}

export default (boldrSSR: Middleware);
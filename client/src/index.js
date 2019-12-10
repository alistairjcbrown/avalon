import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import websocketMiddleware from 'middleware/websocket';
import reducers from './reducers';
import App from './app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(websocketMiddleware)),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

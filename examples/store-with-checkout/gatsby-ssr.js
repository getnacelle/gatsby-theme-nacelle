import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './src/state/root-reducer';
import Cart from './src/components/Cart';

const store = createStore(rootReducer, {}, composeWithDevTools());

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    {element}
    <Cart />
  </Provider>
);

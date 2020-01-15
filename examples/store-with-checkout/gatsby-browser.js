import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { save, load } from 'redux-localstorage-simple';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './src/state/root-reducer';
import Cart from './src/components/Cart';

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(applyMiddleware(save()))
);

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    {element}
    <Cart />
  </Provider>
);

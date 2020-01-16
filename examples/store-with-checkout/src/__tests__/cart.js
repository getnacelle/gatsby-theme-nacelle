import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Cart from '../components/Cart';
import rootReducer from '../state/root-reducer';

const payload = {
  title: 'Some Blanket',
  handle: 'some-blanket',
  src:
    'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/72.png?v=1563167840',
  variant: {
    id: '12345',
    title: 'Default Title',
    price: '235.0',
    selectedOptions: [
      {
        name: 'Title',
        value: 'Default Title'
      }
    ],
    featuredMedia: {
      src:
        'https://cdn.shopify.com/s/files/1/0094/4098/5124/products/72.png?v=1563167840'
    },
    qty: 3
  }
};

const initialState = {
  cart: {
    lineItems: [payload],
    isCartVisible: false
  }
};

const store = createStore(rootReducer, initialState);

test('the cart is revealed by clicking the "Show Cart" button', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
  const showCartButton = getByText('Show Cart');
  expect(showCartButton).toBeInTheDocument();

  fireEvent.click(showCartButton);
  expect(showCartButton).not.toBeInTheDocument();
  const hideCartButton = getByText('Hide Cart');
  expect(hideCartButton).toBeInTheDocument();
});

test('a product is rendered in the cart', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
  const itemTitle = getByText('Some Blanket');
  expect(itemTitle).toBeInTheDocument();
});

test("a product's quantity is incremented in the cart", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
  const incrementButton = getByText('+');
  expect(incrementButton).toBeInTheDocument();

  const quantityField = getByText('Quantity', { exact: false });
  expect(quantityField).toHaveTextContent('Quantity: 3');
  fireEvent.click(incrementButton);
  expect(quantityField).toHaveTextContent('Quantity: 4');
});

test("a product's quantity is decremented in the cart", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
  const decrementButton = getByText('-');
  expect(decrementButton).toBeInTheDocument();

  const quantityField = getByText('Quantity', { exact: false });
  expect(quantityField).toHaveTextContent('Quantity: 4');
  fireEvent.click(decrementButton);
  expect(quantityField).toHaveTextContent('Quantity: 3');
});

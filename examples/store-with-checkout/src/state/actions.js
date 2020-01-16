export function addToCart(payload) {
  return {
    type: 'ADD_TO_CART',
    payload
  };
}

export function increment(payload) {
  return {
    type: 'INCREMENT_ITEM',
    payload
  };
}

export function decrement(payload) {
  return {
    type: 'DECREMENT_ITEM',
    payload
  };
}

export function clearCart() {
  return {
    type: 'CLEAR_CART'
  };
}

export function toggleCart() {
  return {
    type: 'TOGGLE_CART'
  };
}

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'gatsby';
import { increment, decrement, clearCart, toggleCart } from '../state/actions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div style={{ borderBottom: '1px solid black' }}>
      <h3>
        {item.handle ? (
          <Link to={`/products/${item.handle}`}>{item.title}</Link>
        ) : (
          item.title
        )}
      </h3>
      <img src={item.src} alt={item.title} style={{ maxWidth: '150px' }} />
      <p>{item.variant.title}</p>
      <p>
        Quantity: {item.variant.qty}
        <span style={{ marginLeft: '1em' }}>
          <button type="button" onClick={() => dispatch(decrement(item))}>
            -
          </button>
          <button type="button" onClick={() => dispatch(increment(item))}>
            +
          </button>
        </span>
      </p>
      <p>$ {(Number(item.variant.price) * item.variant.qty).toFixed(2)}</p>
    </div>
  );
};

const CartItems = ({ lineItems }) => {
  const dispatch = useDispatch();
  const total = lineItems.reduce(
    (subtotal, el) =>
      subtotal + Number(el.variant.price) * Number(el.variant.qty),
    0
  );
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Cart</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="button" onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
      <ul style={{ listStyle: 'none' }}>
        {lineItems.map(el => (
          <li key={el.variant.id}>
            <CartItem item={el} />
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center' }}>
        <h3>Total</h3>
        <p>$ {total.toFixed(2)}</p>
      </div>
    </>
  );
};

const Cart = () => {
  const lineItems = useSelector(state => state.cart.lineItems);
  const dispatch = useDispatch();
  const isCartEmpty = lineItems.length === 0;
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        right: '0',
        height: '100%',
        width: '20em',
        overflow: 'auto',
        border: '1px solid blue',
        backgroundColor: 'white'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" onClick={() => dispatch(toggleCart())}>
          Hide Cart
        </button>
      </div>
      {isCartEmpty ? (
        <p style={{ padding: '2em' }}>Your cart is empty</p>
      ) : (
        <CartItems lineItems={lineItems} />
      )}
    </div>
  );
};

const CartMenu = () => {
  const isCartVisible = useSelector(state => state.cart.isCartVisible);
  const dispatch = useDispatch();
  return (
    <div style={{ position: 'fixed', top: '0', right: '0' }}>
      {isCartVisible ? (
        <Cart />
      ) : (
        <button type="button" onClick={() => dispatch(toggleCart())}>
          Show Cart
        </button>
      )}
    </div>
  );
};

export default CartMenu;

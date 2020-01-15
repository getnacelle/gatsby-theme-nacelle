import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'gatsby'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()
  const increment = () => ({ type: 'INCREMENT_ITEM', payload: item })
  const decrement = () => ({ type: 'DECREMENT_ITEM', payload: item })
  return(
    <div style={{ borderBottom: '1px solid black' }}>
      <h3>
        {item.handle 
          ? <Link to={`/products/${item.handle}`}>{item.title}</Link>
          : item.title}
      </h3>
      <img src={item.src} alt={item.title} style={{ maxWidth: '150px' }} />
      <p>{item.variant.title}</p>
      <p>
        Quantity: {item.variant.qty}
        <span style={{ marginLeft: '1em' }}>
          <button type="button" onClick={() => dispatch(decrement())}>-</button>
          <button type="button" onClick={() => dispatch(increment())}>+</button>
        </span>
      </p>
      <p>$ {(Number(item.variant.price) * item.variant.qty).toFixed(2)}</p>
    </div>
  )
}

const Cart = () => {
  const isCartVisible = useSelector(state => state.cart.isCartVisible)
  const lineItems = useSelector(state => state.cart.lineItems)
  const dispatch = useDispatch()
  const clearCart = () => ({ type: 'CLEAR_CART' })
  const toggleCart = () => ({ type: 'TOGGLE_CART' })
  // const getTotal = () => {{ type: 'GET_TOTAL' }}
  const total = lineItems.reduce(
    (subtotal, el) => subtotal + (Number(el.variant.price) * Number(el.variant.qty)), 0
  )
  const isCartEmpty = lineItems.length === 0
  return (
    <div style={{
      position: 'fixed',
      top: '0',
      right: '0'
    }}>
      {isCartVisible &&
        <div style={{
          position: 'fixed',
          top: '0',
          right: '0',
          height: '100%',
          overflow: 'auto',
          border: '1px solid blue',
          backgroundColor: 'white',
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => dispatch(toggleCart())}>Hide Cart</button>
          </div>
          {!isCartEmpty && <div>
            <h2 style={{ textAlign: 'center' }}>Cart</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="button" onClick={() => dispatch(clearCart())}>Clear Cart</button>
            </div>
            <ul style={{ listStyle: 'none' }}>
            {lineItems.map(el => 
              <li key={el.variant.id}>
                <CartItem item={el} />
              </li>
            )}
            </ul>
            <div style={{ textAlign: 'center' }}>
              <h3>Total</h3>
              <p>$ {total.toFixed(2)}</p>
            </div>
          </div>}
          {isCartEmpty && <p style={{ padding: '2em' }}>Your cart is empty</p>}
        </div>
      }
      {!isCartVisible && <button type="button" onClick={() => dispatch(toggleCart())}>Show Cart</button>}
    </div>
  )
}

export default Cart

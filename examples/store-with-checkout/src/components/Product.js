import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'gatsby'

export const Product = ({ title, handle, src, variants }) => {
  const dispatch = useDispatch()
  const hasMultipleVariants = variants.length > 1
  const [selectedVariant, selectVariant] = useState(variants[0])
  const handleChange = e => selectVariant(variants[e.target.value])
  const addToCart = () => ({
    type: 'ADD_TO_CART',
    payload: {
      title,
      handle,
      src,
      variant: selectedVariant
    }
  })
  return(
  <article style={{
    width: '15em', 
    borderBottom: '1px solid black', 
    padding: '3em 0'}}>
    <h1>
      {handle 
        ? <Link to={`/products/${handle}`}>{title}</Link>
        : title}
    </h1>
    {src && <img src={src} alt={title} style={{width: '15em'}} />}
    {hasMultipleVariants &&
    <div>
      <select name="choice" onBlur={handleChange} onChange={handleChange}>
        {variants.map((el, idx) =>
          <option value={idx} key={el.id}>{el.title}</option>
        )}
      </select>
    </div>}
    <p>$ {(Number(selectedVariant.price)).toFixed(2)}</p>
    <button type="button" onClick={() => dispatch(addToCart())}>
      Add To Cart
    </button>
  </article>
)}

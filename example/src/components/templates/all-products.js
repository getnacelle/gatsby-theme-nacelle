import React from 'react'
import { Link } from "gatsby"

const allProducts = ({ pageContext }) => {
  const { products } = pageContext
  return (
    <>
      <h1>All Products</h1>
      <ul style={{ listStyleType: 'none' }}>
        {products.map( el => 
          <li key={el.handle}>
            <h1><Link to={`/products/${el.handle}`}>{el.title}</Link></h1>
            <img src={el.featuredMedia.src} alt={el.title} />
          </li>
        )}
      </ul>
    </>
  )
}

export default allProducts

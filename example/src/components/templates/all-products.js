import React from 'react'
import { Link } from "gatsby"

const allProducts = ({ pageContext }) => {
  const { products } = pageContext
  return (
    <>
      <h1>All Products</h1>
      <ul style={{ listStyleType: 'none' }}>
        {products.map( el => 
          <li key={el.node.handle}>
            <h1><Link to={`/products/${el.node.handle}`}>{el.node.title}</Link></h1>
            <img src={el.node.featuredMedia.src} alt={el.node.title} />
          </li>
        )}
      </ul>
    </>
  )
}

export default allProducts

import React from 'react'
import { Link } from "gatsby"

const Collection = ({ pageContext }) => {
  const { title, imageSrc, handles, allProducts } = pageContext
  const products = allProducts.filter(product => handles.includes(product.handle))
  return (
    <>
      <h1>{title}</h1>
      <img src={imageSrc} alt={title} />
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

export default Collection

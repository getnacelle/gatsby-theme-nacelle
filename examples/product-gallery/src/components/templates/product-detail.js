import React from 'react'

const productDetail = ({ pageContext }) => {
  const { title, imageSrc } = pageContext
  return (
    <>
      <h1>{title}</h1>
      <img src={imageSrc} alt={title} />
    </>
  )
}

export default productDetail

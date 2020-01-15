import React from 'react';
import { Product } from '../Product';

const productDetail = ({ pageContext }) => {
  const { title, handle, imageSrc, variants } = pageContext;
  return (
    <Product title={title} handle={handle} src={imageSrc} variants={variants} />
  );
};

export default productDetail;

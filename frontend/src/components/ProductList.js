//frontend/src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, isAdmin, user , onReviewClick, onDeleteReview}) {
  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.product_id}
          product={product}
          user={user}
          onReviewClick={() => onReviewClick(product)}  // important!
          onDeleteReview={onDeleteReview}
        />
      ))}
    </div>
  );
}


export default ProductList;

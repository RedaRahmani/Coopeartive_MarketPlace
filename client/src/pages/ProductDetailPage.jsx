import React from 'react';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import AverageRating from '../components/AverageRating';

const ProductDetailPage = ({ productId }) => {
  return (
    <div>
      <h1>Product Detail</h1>
      <ReviewList productId={productId} />
      <ReviewForm productId={productId} />
      <AverageRating productId={productId} />
    </div>
  );
};

export default ProductDetailPage;
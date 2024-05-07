import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(/api/review/product/:${productId});
        console.log('Fetched reviews:', response.data); // Log fetched reviews
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.comment}</p>
            <p>Rating: {review.rating}</p>
            {/* Display other review details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
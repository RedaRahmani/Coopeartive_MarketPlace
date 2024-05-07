import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AverageRating = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(/api/review/average-rating/${productId});
        setAverageRating(response.data.averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error.message);
      }
    };

    fetchAverageRating();
  }, [productId]);

  return (
    <div>
      <h2>Average Rating</h2>
      <p>{averageRating}</p>
    </div>
  );
};

export default AverageRating;
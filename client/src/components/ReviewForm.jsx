import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const { listingId } = useParams();

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewItem = {
      productId: listingId,
      rating,
      comment,
    };

    try {
      if (editingReviewId) {
        await axios.put(`/api/review/${editingReviewId}`, reviewItem);
        console.log('Review updated');
      } else {
        await axios.post('/api/review/', reviewItem);
        console.log('Review submitted');
      }

      setRating(0);
      setComment('');
      setEditingReviewId(null);

      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/review/product/${listingId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
    }
  };

  const handleEdit = (reviewId) => {
    const reviewToEdit = reviews.find((review) => review._id === reviewId);
    if (reviewToEdit) {
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
      setEditingReviewId(reviewId);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`/api/review/${reviewId}`);
      console.log('Review deleted');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [listingId]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label htmlFor="rating" className="block text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                className={`text-3xl cursor-pointer ${value <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleStarClick(value)}
              />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border rounded-md w-full h-32 py-2 px-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {editingReviewId ? 'Update Review' : 'Submit Review'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews available.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className={index < review.rating ? 'text-yellow-500' : 'text-gray-300'} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEdit(review._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;

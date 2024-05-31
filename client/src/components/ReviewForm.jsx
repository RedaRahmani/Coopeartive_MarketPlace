import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const { listingId } = useParams();
  const { currentUser } = useSelector(state => state.user);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewItem = {
      productId: listingId,
      rating,
      comment,
      name: currentUser.username,
      avatar: currentUser.avatar,
    };
    console.log(reviewItem)

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
      if (error.response) {
        console.error('Error submitting review:', error.response.data.message || error.response.statusText);
      } else if (error.request) {
        console.error('Error submitting review: No response received from server');
      } else {
        console.error('Error submitting review:', error.message);
      }
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

  return  (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
    <h3 className="text-3xl font-bold text-gray-900 mb-6">Leave a Review</h3>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="rating" className="block text-gray-700 font-medium mb-2">
          Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              className={`text-4xl cursor-pointer transition duration-200 ${
                value <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => handleStarClick(value)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        {editingReviewId ? 'Update Review' : 'Submit Review'}
      </button>
    </form>

    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews available.</p>
      ) : (
        <ul className="space-y-6">
          {reviews.map((review) => (
            <li key={review._id} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-6">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-semibold text-gray-900">{review.name}</h4>
                    <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <div className="flex space-x-2">
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

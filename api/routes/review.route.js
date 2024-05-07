import express from 'express';
import {
  createReview,
  getReviewsByProduct,
  updateReview,
  deleteReview
} from '../controllers/review.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to create a new review (POST)
router.post('/', verifyToken, createReview);

// Route to get reviews by product ID (GET)
router.get('/product/:productId', verifyToken, getReviewsByProduct);

// Route to update a review by review ID (PUT)
router.put('/:reviewId', verifyToken, updateReview);

// Route to delete a review by review ID (DELETE)
router.delete('/:reviewId', verifyToken, deleteReview);

export default router;
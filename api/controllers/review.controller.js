import Review from '../models/review.model.js';

// Controller function to create a new review
export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;
    const newReview = new Review({ productId, rating, comment });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};

// Controller function to get reviews for a specific product
export const getReviewsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// Controller function to update a review
export const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};

// Controller function to delete a review
export const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};
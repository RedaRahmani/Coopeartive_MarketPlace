import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  name:{
      type: String,
      required: true,
  },
  avatar:{
    type: String,
    required: true,
}
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
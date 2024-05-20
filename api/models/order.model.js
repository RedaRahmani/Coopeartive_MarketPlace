import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: false,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Listing', // Reference to the product listing
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // Default quantity is 1
        },
        regularPrice: {
          type: Number,
          required: true,
        },
        discountPrice: {
          type: Number,
          required: true,
        },
        imageUrls: {
          type: [String],
          required: true,
        },
      }
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

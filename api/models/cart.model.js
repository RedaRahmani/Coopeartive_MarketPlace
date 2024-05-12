import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
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
        addToCart: {
          type: Number,
          default: 0,
          required: false,
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

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

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
        sellerId: {
          type: String,
          ref: 'Seller',
          required: false,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
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

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: true,
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Listing',
          required: true,
        },
        sellerId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;

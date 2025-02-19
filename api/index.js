import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import cartRouter from './routes/cart.route.js';
import reviewRouter from './routes/review.route.js'
import order from './routes/orders.route.js';
import session from 'express-session';
import cors from 'cors';
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}
);

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/cart', cartRouter);
app.use('/api/review', reviewRouter)
app.use('/api/orders', order)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});





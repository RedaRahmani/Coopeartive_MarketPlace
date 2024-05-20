import express from 'express';
import { createOrder} from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createorder', verifyToken, createOrder);


export default router;
import express from 'express';
import { createOrder , getOrder} from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createorder', verifyToken, createOrder);
router.get('/getorder', verifyToken, getOrder);


export default router;
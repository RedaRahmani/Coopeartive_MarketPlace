import express from 'express'
import {addItemToCart , getUserCart , updateCartItemQuantity ,  removeItemFromCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/add', verifyToken,addItemToCart);

// Route to get the user's cart
router.get('/:userRef',verifyToken , getUserCart);

// Route to update an item's quantity in the cart
router.put('/update/:userRef',verifyToken , updateCartItemQuantity);


// Route to remove an item from the cart
router.delete('/remove/:userRef/:productId',verifyToken, removeItemFromCart);

export default router;
import express from 'express';
import { test , updateUser, deleteUser, getUserListings , getUser, updateUserAddToCart , getAddToCart} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test)
router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser);
router.patch('/addtocart/' , verifyToken , updateUserAddToCart );
router.get('/getaddtocart/' , verifyToken ,getAddToCart);


export default router;
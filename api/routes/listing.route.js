import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, viewed  ,getSharedByProduct,getViewedByProduct, getViewed, shares, getShared, getAddToCart} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get' , getListings);
router.post('/viewed', verifyToken , viewed ) ;
router.get('/viewedByProduct', verifyToken , getViewedByProduct ) ;
router.post('/shares', verifyToken , shares ) ;
router.get('/productviewed', verifyToken, getViewed);
router.get('/productshared', verifyToken, getShared);
router.get('/getproductshared', verifyToken, getSharedByProduct);
router.get('/addtocart', verifyToken, getAddToCart);

export default router;
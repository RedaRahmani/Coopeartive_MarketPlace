import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings, viewed  , getViewed} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id',verifyToken, getListing);
router.get('/get', verifyToken , getListings);
router.post('/viewed', verifyToken , viewed ) ;
router.get('/productviewed', verifyToken, getViewed);

export default router;
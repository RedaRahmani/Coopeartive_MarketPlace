import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

 if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listing!'));
 }

 try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
 } catch (error) {
   next (error);
 }
}

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    );
    res.status(200).json(updatedListing)
  } catch (error) {
     next (error);
  }
}

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    console.log(listing)
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

export const viewed = async (req, res) => {
  try {
    const { listingId } = req.body; // Assuming the listing ID is sent in the request body

    // Update the viewed count for the Listing model
    const listing = await Listing.findOneAndUpdate(
      { _id: listingId },
      { $inc: { viewed: 1 } }, // Increment the viewed field by 1
      { new: true } // Return the updated document
    );

    // Assuming there is a user associated with the listing, update their viewed count
    if (listing) {
      const user = await User.findOneAndUpdate(
        { _id: listing.userRef }, // Assuming userRef contains the ID of the user
        { $inc: { viewed: 1 } }, // Increment the viewed field by 1
        { new: true } // Return the updated document
      );
    } else {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    return res.status(200).json({ success: true, listing });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getViewed = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Missing id parameter' });
    }
    // Use the id parameter in your logic
    // Find the listing by ID
    const listing = await User.findById(id);

    if (!listing) {
      return res.status(404).json({ success: false, message: 'Listing not found' });
    }

    res.json({ success: true, views: listing.viewed });
  } catch (error) {
    console.error('Error fetching views:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['Agroalimentaire', 'Beaute','Artisanat'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
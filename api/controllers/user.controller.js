import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({
        message: 'Hello World!',
    });
};


export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can only update your own account!'));
    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password , 10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
                description: req.body.description,
            }
        },{new: true})

        const {password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    }catch(error){
        next(error)
    }
};


export  const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can only delete your own account!'));
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    }catch(error){
        next(error)
    }
};

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({ userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, 'You can only view your own listings!'));
    }
};
export const getUser = async (req, res, next) => {
    try {
  
      const user = await User.findById(req.params.id);
  
      if (!user) return next(errorHandler(404, 'User not found!'));
  
      const { password: pass, ...rest } = user._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };


// export const updateUserAddToCart = async (req, res) => {
//     try {
//         const { userId } = req.body;
//       const { addToCart } = req.body; // The value to increment addToCart by
//         console.log(userId)
//       // Find the user by userId
//       const user = await User.findByIdAndUpdate(userId, { $inc: { addToCart: addToCart || 1 } }, { new: true });
  
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         console.log(user.addToCart);

//         return res.status(200).json({ message: 'addToCart updated successfully', user });
//     } catch (error) {
//       console.error('Error updating addToCart:', error);
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//   };
export const updateUserAddToCart = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const { addToCartIncrement } = req.body; // The value to increment addToCart by
        console.log(userId)
        // Find the user by userId and update addToCart field
        const user = await User.findByIdAndUpdate(userId, { $inc: { addToCart: addToCartIncrement || 1 } }, { new: true });
  
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log(user);

        return res.status(200).json({ message: 'addToCart updated successfully', user });
    } catch (error) {
        next(error);
    }
};
// export const getAddToCart = async (req, res) => {
//     try {
//       const { id } = req.query;
//       if (!id) {
//         return res.status(400).json({ success: false, message: 'Missing id parameter' });
//       }
//       // Use the id parameter in your logic
//       // Find the listing by ID
//       const listing = await User.findById(id);
  
//       if (!listing) {
//         return res.status(404).json({ success: false, message: 'Listing not found' });
//       }
  
//       res.json({ success: true, addToCart: listing.addToCart });
//     } catch (error) {
//       console.error('Error fetching views:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
//   };
// export const getAddToCart = async (req, res, next) => {
//     try {
//       const { id } = req.query;
//       console.log(id)
//       if (!id) {
//         return res.status(400).json({ success: false, message: 'Missing id parameter' });
//       }
//       // Use the id parameter in your logic
//       // Find the listing by ID
//       const listing = await User.findById(id);
  
//       if (!listing) {
//         return res.status(404).json({ success: false, message: 'Listing not found' });
//       }
  
//       res.json({ success: true, addToCart: listing.addToCart });
//     } catch (error) {
//       next(error)
//     }
//   };

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const AddToCartButton = () => {
//     const [quantity, setQuantity] = useState(1);
//     const { listingId } = useParams();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchListing = async () => {
//             try {
//                 setLoading(true);
//                 const res = await axios.get(`/api/listing/get/${listingId}`);
//                 const data = res.data;
//                 if (data.success === false) {
//                     setError(true);
//                     setLoading(false);
//                     return;
//                 }
//                 console.log(data);
//                 const cartItem = {
//                     productId: data._id,
//                     userRef: data.name, // Assuming listingId is the product ID
//                     quantity: quantity,
//                     regularPrice: data.regularPrice,
//                     discountPrice: data.discountPrice,
//                     imageUrls: data.imageUrls,
//                 };
//                 console.log(cartItem)
//                 const response = await axios.post('/api/cart/add', cartItem);
//                 console.log('Item added to cart:', response.data);
//                 setLoading(false);
//                 setError(false);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };
//         fetchListing();
//     }, []); // Make sure to include listingId in the dependency array

//     const handleAddToCart = () => {
//         // Handle adding to cart logic here
//     };

//     return (
//         <div>
//             <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//             />
//             <button onClick={handleAddToCart}>Add to Cart</button>
//         </div>
//     );
// };

// export default AddToCartButton;
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddToCartButton = () => {
    const [quantity, setQuantity] = useState(1);
    const { listingId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {currentUser} = useSelector(state => state.user);

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            
            const res = await axios.get(`/api/listing/get/${listingId}`);
            const data = res.data;
            if (data.success === false) {
                setError(true);
                setLoading(false);
                return;
            }
            console.log(data);
            const cartItem = {
                productId: data._id,
                name: data.name,
                userRef: currentUser._id,
                quantity: quantity,
                regularPrice: data.regularPrice,
                discountPrice: data.discountPrice,
                imageUrls: data.imageUrls,
            };
            console.log(cartItem);

            const response = await axios.post('/api/cart/add', cartItem);
            console.log('Item added to cart:', response.data);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div>
            <label>Quantitie:</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <button onClick={handleAddToCart} 
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >Add to Cart</button>
        </div>
    );
};

export default AddToCartButton;

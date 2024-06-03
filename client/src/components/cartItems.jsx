import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';


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
                sellerId: data.userRef,
                quantity: quantity,
                regularPrice: data.regularPrice,
                discountPrice: data.discountPrice,
                imageUrls: data.imageUrls,
            };
            console.log(data.userRef)
            console.log(cartItem.sellerId)
            const userResponse = await axios.post(`/api/user/addtocart`, { userId: data.userRef, addToCart: 1 });
            console.log('User updated addToCart:', userResponse.data);
            const response = await axios.post('/api/cart/add', cartItem);
            console.log('Item added to cart:', response.data);
            if (!error) {
                await createOrder(cartItem.sellerId, cartItem);
            }

            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };
    // Function to create order
    const createOrder = async (sellerId, cartItem) => {
        try {
            const orderData = {
                userRef: sellerId,
                items: [cartItem]
            };
            const orderResponse = await axios.post(`/api/order/create`, orderData);
            console.log('Order created:', orderResponse.data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    return (
        <div className='flex items-center p-4 rounded-md'>
    <label className='block text-gray-700 text-sm font-semibold mb-1 mr-2'>Quantity:</label>
    <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className='shadow-sm appearance-none border rounded-md w-24 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
    />
    <button 
        onClick={handleAddToCart} 
        className='ml-2 bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out flex items-center'
    >
        <FaShoppingCart className='mr-1' />
        Add to Cart
    </button>
</div>

    );
};

export default AddToCartButton;
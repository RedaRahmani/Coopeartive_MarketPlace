import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiCartAlt } from "react-icons/bi";
import { motion } from 'framer-motion';

const CartList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    const userRef = currentUser._id;
    const [showCart, setShowCart] = useState(false); // State to control cart visibility

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/cart/${userRef}`);
                console.log(response.data.items)
                setCartItems(response.data.items); // Assuming response.data is an array of cart items
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        if (showCart) {
            fetchCartItems();
        }
    }, [userRef, showCart]);

    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            console.log(productId)
            console.log(userRef)
            await axios.delete(`/api/cart/remove/${userRef}/${productId}`);
            // After successfully removing the item, fetch updated cart items
            const response = await axios.get(`/api/cart/${userRef}`);
            console.log(response.data.items)
            setCartItems(response.data.items);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        // <>
        //     <div className="relative">
        //     <button className="text-slate-700 hover:text-slate-900 relative z-10" onClick={() => setShowCart(!showCart)}>
        //         <BiCartAlt className="h-7 w-7" />
        //         {cartItems.length > 0 && (
        //             <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
        //         )}
        //     </button>
        //     {showCart && (
        //         <div className="absolute top-full right-0 mt-2 bg-white rounded-lg p-8 max-w-3xl overflow-y-auto shadow-lg z-20" style={{ width: "400px", maxHeight: "400px" }}>
        //             <div className="flex justify-between items-center mb-4">
        //                 <h2 className="text-2xl font-semibold">Cart Items</h2>
        //                 <button className="text-red-500" onClick={() => setShowCart(false)}>Close</button>
        //             </div>
        //             {loading ? (
        //                 <div className="text-center">Loading...</div>
        //             ) : error ? (
        //                 <div className="text-center text-red-500">Error occurred while fetching cart items.</div>
        //             ) : (
        //                 <ul>
        //                     {cartItems.map(cartItem => (
        //                         <li key={cartItem._id} className="border-b py-4">
        //                             <div className="flex justify-between items-center">
        //                                 <div className="flex items-center">
        //                                     <img src={cartItem.imageUrls[0]} alt={cartItem.productId} className="w-16 h-16 object-cover rounded-md mr-4" />
        //                                     <div>
        //                                             <div className='text-gray-500 text-lg font-semibold'>Quantity:{cartItem.quantity}</div>
        //                                             <div className="text-gray-500 text-lg font-semibold">Price: {cartItem.regularPrice}</div>
        //                                             {/* Add more details as needed */}
        //                                         </div>
        //                                 </div>
        //                                 <button onClick={() => removeFromCart(cartItem.productId)} className="text-red-500">Remove</button>
        //                             </div>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             )}
        //         </div>
        //     )}
        // </div>
        // </>
        <div className="relative">
            <button className="text-slate-700 hover:text-slate-900 relative z-10" onClick={() => setShowCart(!showCart)}>
                <BiCartAlt className="h-7 w-7" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
                )}
            </button>
            {showCart && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-lg p-8 max-w-3xl overflow-y-auto shadow-lg z-20"
                    style={{ width: "400px", maxHeight: "400px" }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Cart Items</h2>
                        <button className="text-red-500" onClick={() => setShowCart(false)}>Close</button>
                    </div>
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">Error occurred while fetching cart items.</div>
                    ) : (
                        <ul>
                            {cartItems.map(cartItem => (
                                <li key={cartItem._id} className="border-b py-4">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img src={cartItem.imageUrls[0]} alt={cartItem.productId} className="w-16 h-16 object-cover rounded-md mr-4" />
                                            <div>
                                                <div className="text-gray-700 font-semibold">{cartItem.productName}</div>
                                                <div className='text-gray-500 text-lg font-semibold'>Quantity: {cartItem.quantity}</div>
                                                <div className="text-gray-500 text-lg font-semibold">Price: ${cartItem.regularPrice.toFixed(2)}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                value={cartItem.quantity}
                                                onChange={(e) => handleUpdateQuantity(cartItem.productId, parseInt(e.target.value))}
                                                min="1"
                                                className="border border-gray-300 rounded-md px-2 py-1 mr-4 w-16 text-center"
                                            />
                                            <button onClick={() => removeFromCart(cartItem.productId)} className="text-red-500">Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default CartList;

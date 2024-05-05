// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { BiCartAlt } from "react-icons/bi";
// import { motion } from 'framer-motion';
// import { loadStripe } from '@stripe/stripe-js';


// const stripePromise = loadStripe('pk_test_51OzMYS12N8v9eF69xK58GuISc9wjg8hcg3wvM0ms6pem0UUkwCzkxLxXsw7lrc3sRxIzOVjfcOGrngkR9x8f7MgP00xJ6Kwto4');

// const CartList = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const { currentUser } = useSelector(state => state.user);
//     const userRef = currentUser._id;
//     const [showCart, setShowCart] = useState(false);
    
//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/cart/${userRef}`);
//                 setCartItems(response.data.items);
//                 setLoading(false);
//                 setError(false);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };

//         if (showCart) {
//             fetchCartItems();
//         }
//     }, [userRef, showCart]);

//     const removeFromCart = async (productId) => {
//         try {
//             setLoading(true);
//             await axios.delete(`/api/cart/remove/${userRef}/${productId}`);
//             const response = await axios.get(`/api/cart/${userRef}`);
//             setCartItems(response.data.items);
//             setLoading(false);
//             setError(false);
//         } catch (error) {
//             setError(true);
//             setLoading(false);
//         }
//     };

//     // Function to calculate total price
//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => {
//             return total + item.regularPrice * item.quantity;
//         }, 0).toFixed(2);
//     };

//     const handlePayment = async () => {
//         setLoading(true);
//         setError(false);

//         try {
//             const stripe = await stripePromise;
//             const response = await axios.post('/api/create-checkout-session', {
//                 items: cartItems.map(item => ({
//                     id: item._id, // Assuming _id is the product ID
//                     quantity: item.quantity
//                 })),
//             });

//             // Redirect to Stripe checkout page
//             await stripe.redirectToCheckout({
//                 sessionId: response.data.sessionId,
//             });
//         } catch (error) {
//             setError(true);
//             setLoading(false);
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className="relative">
//             <button className="text-slate-700 hover:text-slate-900 relative z-10" onClick={() => setShowCart(!showCart)}>
//                 <BiCartAlt className="h-7 w-7" />
//                 {cartItems.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
//                 )}
//             </button>
//             {showCart && (
//                 <motion.div 
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="absolute top-full right-0 mt-2 bg-white rounded-lg p-8 max-w-3xl overflow-y-auto shadow-lg z-20"
//                     style={{ width: "400px", maxHeight: "600px" }}
                    
//                 >
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-2xl font-semibold">Cart Items</h2>
//                         <button className="text-red-500" onClick={() => setShowCart(false)}>Close</button>
//                     </div>
//                     {loading ? (
//                         <div className="text-center">Loading...</div>
//                     ) : error ? (
//                         <div className="text-center text-red-500">Error occurred while fetching cart items.</div>
//                     ) : (
//                         <div>
//                             <ul>
//                                 {cartItems.map(cartItem => (
//                                     <li key={cartItem._id} className="border-b py-4">
//                                         <div className="flex justify-between items-center">
//                                             <div className="flex items-center">
//                                                 <img src={cartItem.imageUrls[0]} alt={cartItem.productId} className="w-16 h-16 object-cover rounded-md mr-4" />
//                                                 <div>
//                                                     <div className="text-gray-700 font-semibold">{cartItem.productName}</div>
//                                                     <div className='text-gray-500 text-lg font-semibold'>Quantity: {cartItem.quantity}</div>
//                                                     <div className="text-gray-500 text-lg font-semibold">Price: ${cartItem.regularPrice.toFixed(2)}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center">
//                                                 <button onClick={() => removeFromCart(cartItem.productId)} className="text-red-500">Remove</button>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                             <div className="mt-4 text-xl font-semibold text-gray-900">Total: ${calculateTotal()}</div>
//                             <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handlePayment} disabled={cartItems.length === 0 || loading}>Proceed to Payment</button>
//                             {error && <div className="text-red-500 mt-2">Error occurred while processing payment.</div>}
//                         </div>
//                     )}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default CartList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiCartAlt } from "react-icons/bi";
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OzMYS12N8v9eF69xK58GuISc9wjg8hcg3wvM0ms6pem0UUkwCzkxLxXsw7lrc3sRxIzOVjfcOGrngkR9x8f7MgP00xJ6Kwto4');

const CartList = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { currentUser } = useSelector(state => state.user);
    const userRef = currentUser._id;
    const [showCart, setShowCart] = useState(false);
    
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/cart/${userRef}`);
                setCartItems(response.data.items);
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
            await axios.delete(`/api/cart/remove/${userRef}/${productId}`);
            const response = await axios.get(`/api/cart/${userRef}`);
            setCartItems(response.data.items);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    // Function to calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.regularPrice * item.quantity;
        }, 0).toFixed(2);
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(false);

        try {
            const response = await axios.post(`/api/cart/checkoutsession/${userRef}`)
               

            const stripe = await stripePromise;
            // Redirect to Stripe checkout page
            await stripe.redirectToCheckout({
                sessionId: response.data.sessionId,
            });
        } catch (error) {
            setError(true);
            setLoading(false);
            console.error('Error:', error);
        }
    };

    return (
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
                    style={{ width: "400px", maxHeight: "600px" }}
                    
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
                        <div>
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
                                                <button onClick={() => removeFromCart(cartItem.productId)} className="text-red-500">Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 text-xl font-semibold text-gray-900">Total: ${calculateTotal()}</div>
                            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={handlePayment} disabled={cartItems.length === 0 || loading}>Proceed to Payment</button>
                            {error && <div className="text-red-500 mt-2">Error occurred while processing payment.</div>}
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default CartList;

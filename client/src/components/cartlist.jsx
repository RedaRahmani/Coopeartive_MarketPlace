// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { BiCartAlt } from "react-icons/bi";

// const CartList = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const { currentUser } = useSelector(state => state.user);
//     const userRef = currentUser._id;

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/cart/${userRef}`);
//                 setCartItems(response.data); // Assuming response.data is an array of cart items
//                 setLoading(false);
//                 setError(false);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };

//         fetchCartItems();
//     }, [userRef]);

//     return (
//         <>
//         <button className="text-slate-700 hover:text-slate-900" onClick={CartList}>
//             <BiCartAlt className="h-7 w-7" />
//           </button>
//         <div className="max-w-6xl mx-auto px-4 py-8">
//             {loading ? (
//                 <div className="text-center">Loading...</div>
//             ) : error ? (
//                 <div className="text-center text-red-500">Error occurred while fetching cart items.</div>
//             ) : (
//                 <div>
//                     <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
//                     <ul>
//                         {cartItems.map(cartItem => (
//                             <li key={cartItem._id} className="border-b py-4">
//                                 <div className="text-lg font-semibold">{cartItem.productName}</div>
//                                 <div className="text-gray-500">{cartItem.price}</div>
//                                 {/* Add more details as needed */}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//         </>
//     );

// };

// export default CartList;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { BiCartAlt } from "react-icons/bi";

// const CartList = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const { currentUser } = useSelector(state => state.user);
//     const userRef = currentUser._id;
//     const [showCart, setShowCart] = useState(false); // State to control cart visibility

//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/cart/${userRef}`);
//                 console.log(response.data.items)
//                 setCartItems(response.data.items); // Assuming response.data is an array of cart items
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
//             console.log(userRef)
//             await axios.delete(`/api/cart/remove/${userRef}/${productId}`);
//             // After successfully removing the item, fetch updated cart items
//             const response = await axios.get(`/api/cart/${userRef}`);
//             console.log(response.data.items)
//             setCartItems(response.data.items);
//             setLoading(false);
//             setError(false);
//         } catch (error) {
//             setError(true);
//             setLoading(false);
//         }
//     };
//     const calculateTotalPrice = () => {
//         return cartItems.reduce((total, cartItem) => {
//             return total + cartItem.regularPrice * cartItem.quantity;
//         }, 0);
//     };
//     return (
//         <>
//             <div className="relative">
//             <button className="text-slate-700 hover:text-slate-900 relative z-10" onClick={() => setShowCart(!showCart)}>
//                 <BiCartAlt className="h-7 w-7" />
//                 {cartItems.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
//                 )}
//             </button>
//             {showCart && (
//                 <div className="absolute top-full right-0 mt-2 bg-white rounded-lg p-8 max-w-3xl overflow-y-auto shadow-lg z-20" style={{ width: "400px", maxHeight: "400px" }}>
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-2xl font-semibold">Cart Items</h2>
//                         <button className="text-red-500" onClick={() => setShowCart(false)}>Close</button>
//                     </div>
//                     <h3 className="text-lg font-bold">TOTAL: ${calculateTotalPrice()}</h3>
//                     {loading ? (
//                         <div className="text-center">Loading...</div>
//                     ) : error ? (
//                         <div className="text-center text-red-500">Error occurred while fetching cart items.</div>
//                     ) : (
//                         <ul>
//                             {cartItems.map(cartItem => (
//                                 <li key={cartItem._id} className="border-b py-4">
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center">
//                                             <img src={cartItem.imageUrls[0]} alt={cartItem.productId} className="w-16 h-16 object-cover rounded-md mr-4" />
//                                             <div>
//                                                 <div className=" text-gray-500 text-lg font-semibold"><span>Quantity: </span>{cartItem.quantity}</div>
//                                                 <div className="text-gray-500 "><span className='text-lg font-bold'>Price:</span>{cartItem.regularPrice}</div>
//                                                 {/* Add more details as needed */}
//                                             </div>
//                                         </div>
//                                         <button onClick={() => removeFromCart(cartItem.productId)} className="text-red-500">Remove</button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//                 </div>
//             )}
//         </div>
//         </>
//     );
// };

// export default CartList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BiCartAlt } from "react-icons/bi";

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

    const removeFromCart = (productId) => {
        setLoading(true);
        axios
            .delete(`/api/cart/remove/${userRef}/${productId}`)
            .then(() => {
                setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error removing from cart:', error);
                setLoading(false);
            });
    };

    const updateQuantity = (productId, newQuantity) => {
        setLoading(true);
        axios
            .put(`/api/cart/update`, { userRef, productId, quantity: newQuantity })
            .then(() => {
                setCartItems(prevItems => prevItems.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error updating quantity:', error);
                setLoading(false);
            });
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, cartItem) => {
            return total + (cartItem.regularPrice * cartItem.quantity);
        }, 0).toFixed(2);
    };

    return (
        <>
            <div className="relative">
                <button className="text-slate-700 hover:text-slate-900 relative z-10" onClick={() => setShowCart(!showCart)}>
                    <BiCartAlt className="h-7 w-7" />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
                    )}
                </button>
                {showCart && (
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg p-8 max-w-3xl overflow-y-auto shadow-lg z-20" style={{ width: "400px", maxHeight: "400px" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Cart Items</h2>
                            <button className="text-red-500" onClick={() => setShowCart(false)}>Close</button>
                        </div>
                        <h3 className="text-lg font-bold">TOTAL: ${calculateTotalPrice()}</h3>
                        {loading ? (
                            <div className="text-center">Loading...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">Error occurred while fetching cart items.</div>
                        ) : (
                            <ul>
                                {cartItems.map(cartItem => (
                                    <li key={cartItem.productId} className="border-b py-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <img src={cartItem.imageUrls[0]} alt={cartItem.productId} className="w-16 h-16 object-cover rounded-md mr-4" />
                                                <div>
                                                    <div className="text-gray-500 text-lg font-semibold"><span>Quantity: </span>{cartItem.quantity}</div>
                                                    <div className="text-gray-500"><span className='text-lg font-bold'>Price:</span>{cartItem.regularPrice}</div>
                                                    <input
                                                        type="number"
                                                        value={cartItem.quantity}
                                                        onChange={(e) => updateQuantity(cartItem.productId, e.target.value)}
                                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                    />
                                                </div>
                                            </div>
                                            <button onClick={() => removeFromCart(cartItem.productId)} className="text-red-500">Remove</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default CartList;


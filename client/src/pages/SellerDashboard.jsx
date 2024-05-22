// import React from 'react'
// import Dashboard from '../components/Userinfo'
// import Avatar from '../components/Avatar'
// import { VscAccount } from "react-icons/vsc";
// import { MdOutlineContactSupport } from "react-icons/md";
// import { MdOutlineNotificationsActive } from "react-icons/md";
// import { FaFileInvoiceDollar } from "react-icons/fa6";
// import { BsBoxSeamFill } from "react-icons/bs";
// import { LuClipboardList } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';
// import { useState, useEffect} from 'react';
// import { useSelector } from 'react-redux';


// const SellerDashboard = () => {
//   const [views, setViews] = useState(null);
//   const [addToCart, setAddToCart] = useState(null);
//   const [shares, setShares] = useState(null);
//   const {currentUser} = useSelector((state) => state.user);
//   const [recentOrders, setRecentOrders] = useState([]);
  
//   useEffect(() => {
//     // Simulated fetch of recent orders
//     const fetchRecentOrders = async () => {
//       // Simulated data
//       const ordersData = [
//         { id: 1, product: "Product A", quantity: 2, total: "$50", status: "Pending" },
//         { id: 2, product: "Product B", quantity: 1, total: "$30", status: "Completed" },
//         { id: 3, product: "Product C", quantity: 3, total: "$80", status: "Shipped" },
//         { id: 4, product: "Product D", quantity: 1, total: "$20", status: "Pending" },
//         { id: 5, product: "Product E", quantity: 2, total: "$60", status: "Completed" }
//       ];
//       // Simulated delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setRecentOrders(ordersData);
//     };

//     fetchRecentOrders();
//   }, []);

//   useEffect(() => {
    
//     const fetchViews = async () => {
//       try {
//         const res = await fetch(`/api/listing/productviewed?id=${currentUser._id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })
//         console.log(currentUser._id)
//         const data = await res.json();
//     setViews(data.views); 
//       } catch (error) {
//         console.error(error);
//       }
//     };

   
//     fetchViews();
//   }, []);
//   useEffect(() => {
//     if (currentUser) { // Null check
//       console.log("Current user:", currentUser);
//       const fetchAddToCart = async () => {
//         try {
//           const res = await fetch(`/api/listing/addtocart?id=${currentUser._id}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           console.log("Fetch response:", res);
//           const data = await res.json();
//           console.log("Fetched data:", data);
//           setAddToCart(data.addToCart); 
//         } catch (error) {
//           console.error(error);
//         }
//       };
  
//       fetchAddToCart();
//     }
//   }, [currentUser]);
  
  
//   useEffect(() => {
//     if (currentUser) { // Null check
//       const fetchShare = async () => {
//         try {
//           const res = await fetch(`/api/listing/productshared?id=${currentUser._id}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           const data = await res.json();
//           setShares(data.shares); 
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchShare();
//     }
//   }, [currentUser]);
//   return (
//     <>
//     <div className="fixed left-0 top-0 h-full w-1/7 bg-gray-900 text-white shadow-md  border-l border-gray-300">
//             <div className="mb-4  items-center justify-center ">
//                 <h2 className="text-l pt-4 pl-2 font-bold mb-6">Seller Dashboard</h2>
//                 <Link to="/profile" className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <VscAccount className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">Account</span>
//             </Link>

//             <Link to="/Product" className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <BsBoxSeamFill className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">Products</span>
//             </Link>

//             <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <LuClipboardList className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">My Orders</span>
//             </button>

//             <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <FaFileInvoiceDollar className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">Transactions</span>
//             </button>

//             <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <MdOutlineContactSupport className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">Support</span>
//             </button>

//             <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <MdOutlineNotificationsActive className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">Notifications</span>
//             </button>

//             <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
//                 <div className="mr-2">
//                     <IoSettingsOutline className="h-5 w-5" />
//                 </div>
//                 <span className="block py-2 px-4">Settings</span>
//             </button>
//             </div>
//         </div>
//         <div className="flex justify-between items-center bg-custom-green text-black p-4 pl-28" style={{ height: '200px' }}>
//         {/* Product Views Form */}
//           <div className="flex justify-between items-center bg-custom-green  text-white p-4 pl-28" style={{ height: '200px' }}>
//     {/* Product Views Information */}
//             <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:scale-110 focus:outline-none focus:shadow-outline" style={{ width: '200px' }}>
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Views</h2>
//                 <hr className="border-gray-300" />
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <span className="mr-2 font-semibold text-gray-700">Views:</span>
//                   <span className="text-gray-700">{views !== null ? views : 'Loading...'}</span>
//                 </div>
//     {/* Add more information or actions here */}
//               </div>
//         </div>

//           <div className="w-10"></div>


//           <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:scale-110 focus:outline-none focus:shadow-outline" style={{ width: '200px' }}>
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">Product shares</h2>
//                 <hr className="border-gray-300" />
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <span className="mr-2 font-semibold text-gray-700">shares:</span>
//                   <span className="text-gray-700">{shares !== null ? shares : 'Loading...'}</span>
//                 </div>
//     {/* Add more information or actions here */}
//               </div>
//               </div>



//           <div className="w-10"></div>
//           <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:scale-110 focus:outline-none focus:shadow-outline" style={{ width: '200px' }}>
//               <div className="mb-4">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2">add To Cart</h2>
//                 <hr className="border-gray-300" />
//               </div>
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center">
//                   <span className="mr-2 font-semibold text-gray-700">addToCart:</span>
//                   <span className="text-gray-700">{addToCart !== null ? addToCart : 'Loading...'}</span>
//                 </div>
//     {/* Add more information or actions here */}
//               </div>
//               </div>
          
//           <div className="w-10"></div>
          
// </div>  
//       </div>    
//       <div className="flex-grow p-8 pl-40 pr-0 border-solid">
//           <h2 className="text-2xl font-bold mb-5 pl-12">  Recent Orders</h2>
//           <div className="w-full overflow-hidden rounded-lg shadow-lg pl-10 pr-10">
//             <table className="w-full divide-y divide-gray-200 ">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {recentOrders.map((order) => (
//                   <tr key={order.id} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
//                     <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>


//     </>
//   )
// }

// export default SellerDashboard

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdOutlineContactSupport, MdOutlineNotificationsActive } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { BsBoxSeamFill } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';

const SellerDashboard = () => {
  const [views, setViews] = useState(null);
  const [addToCart, setAddToCart] = useState(null);
  const [shares, setShares] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Fetch recent orders for the current seller
    const fetchRecentOrders = async () => {
      try {
        const res = await fetch(`/api/orders/getorder?sellerId=${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        console.log('Recent Orders:', data);  // Log the data to debug the structure
        setRecentOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (currentUser) {
      fetchRecentOrders();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/listing/productviewed?id=${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setViews(data.views);
      } catch (error) {
        console.error(error);
      }
    };

    if (currentUser) {
      fetchViews();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchAddToCart = async () => {
        try {
          const res = await fetch(`/api/listing/addtocart?id=${currentUser._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          setAddToCart(data.addToCart);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAddToCart();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const fetchShare = async () => {
        try {
          const res = await fetch(`/api/listing/productshared?id=${currentUser._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await res.json();
          setShares(data.shares);
        } catch (error) {
          console.error(error);
        }
      };

      fetchShare();
    }
  }, [currentUser]);

  return (
    <>
      <div className="fixed left-0 top-0 h-full w-1/7 bg-gray-900 text-white shadow-md border-l border-gray-300">
        <div className="mb-4 items-center justify-center ">
          <h2 className="text-l pt-4 pl-2 font-bold mb-6">Seller Dashboard</h2>
          <Link to="/profile" className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <VscAccount className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">Account</span>
          </Link>

          <Link to="/Product" className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <BsBoxSeamFill className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">Products</span>
          </Link>

          <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <LuClipboardList className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">My Orders</span>
          </button>

          <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <FaFileInvoiceDollar className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">Transactions</span>
          </button>

          <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <MdOutlineContactSupport className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">Support</span>
          </button>

          <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <MdOutlineNotificationsActive className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">Notifications</span>
          </button>

          <button className="mb-4 flex items-center hover:bg-gray-300 rounded pl-4 w-full">
            <div className="mr-2">
              <IoSettingsOutline className="h-5 w-5" />
            </div>
            <span className="block py-2 px-4">Settings</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center bg-custom-green text-black p-4 pl-28" style={{ height: '200px' }}>
        {/* Product Views Form */}
        <div className="flex justify-between items-center bg-custom-green text-white p-4 pl-28" style={{ height: '200px' }}>
          {/* Product Views Information */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:scale-110 focus:outline-none focus:shadow-outline" style={{ width: '200px' }}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Views</h2>
              <hr className="border-gray-300" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2 font-semibold text-gray-700">Views:</span>
                <span className="text-gray-700">{views !== null ? views : 'Loading...'}</span>
              </div>
              {/* Add more information or actions here */}
            </div>
          </div>

          <div className="w-10"></div>

          <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:scale-110 focus:outline-none focus:shadow-outline" style={{ width: '200px' }}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Product shares</h2>
              <hr className="border-gray-300" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2 font-semibold text-gray-700">Shares:</span>
                <span className="text-gray-700">{shares !== null ? shares : 'Loading...'}</span>
              </div>
              {/* Add more information or actions here */}
            </div>
          </div>

          <div className="w-10"></div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:scale-110 focus:outline-none focus:shadow-outline" style={{ width: '200px' }}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Add To Cart</h2>
              <hr className="border-gray-300" />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2 font-semibold text-gray-700">Add To Cart:</span>
                <span className="text-gray-700">{addToCart !== null ? addToCart : 'Loading...'}</span>
              </div>
              {/* Add more information or actions here */}
            </div>
          </div>

          <div className="w-10"></div>
        </div>
      </div>
      <div className="flex-grow p-8 pl-40 pr-0 border-solid">
        <h2 className="text-2xl font-bold mb-5 pl-12">Recent Orders</h2>
        <div className="w-full overflow-hidden rounded-lg shadow-lg pl-10 pr-10">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order._id} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                  <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;

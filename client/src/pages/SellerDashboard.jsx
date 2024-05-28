// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { VscAccount } from 'react-icons/vsc';
// import { MdOutlineContactSupport, MdOutlineNotificationsActive } from 'react-icons/md';
// import { FaFileInvoiceDollar } from 'react-icons/fa';
// import { BsBoxSeamFill } from 'react-icons/bs';
// import { LuClipboardList } from 'react-icons/lu';
// import { IoSettingsOutline } from 'react-icons/io5';
// import fyler from "./fyler.png";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const SellerDashboard = () => {
//   const [views, setViews] = useState(null);
//   const [addToCart, setAddToCart] = useState(null);
//   const [shares, setShares] = useState(null);
//   const { currentUser } = useSelector((state) => state.user);
//   const [recentOrders, setRecentOrders] = useState([]);
//   const [date, setDate] = useState(new Date());

//   useEffect(() => {
//     const fetchRecentOrders = async () => {
//       try {
//         const res = await fetch(`/api/orders/getorder?userRef=${currentUser._id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await res.json();
//         setRecentOrders(data.orders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     if (currentUser) {
//       fetchRecentOrders();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     const fetchViews = async () => {
//       try {
//         const res = await fetch(`/api/listing/productviewed?id=${currentUser._id}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await res.json();
//         setViews(data.views);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (currentUser) {
//       fetchViews();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (currentUser) {
//       const fetchAddToCart = async () => {
//         try {
//           const res = await fetch(`/api/listing/addtocart?id=${currentUser._id}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           });
//           const data = await res.json();
//           setAddToCart(data.addToCart);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchAddToCart();
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (currentUser) {
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
//     <div className="flex h-screen">
//       <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-600 text-white shadow-md">
//         <div className="p-6">
//           <Link to="/sellerdashboard" className="mb-6 block text-2xl font-bold">
//             Seller Dashboard
//           </Link>
//           <nav>
//             <Link to="/profile" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <VscAccount className="mr-3 h-6 w-6" />
//               <span className="text-lg">Account</span>
//             </Link>
//             <Link to="/Product" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <BsBoxSeamFill className="mr-3 h-6 w-6" />
//               <span className="text-lg">Products</span>
//             </Link>
//             <Link to="/orders" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <LuClipboardList className="mr-3 h-6 w-6" />
//               <span className="text-lg">My Orders</span>
//             </Link>
//             <Link to="/transactions" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <FaFileInvoiceDollar className="mr-3 h-6 w-6" />
//               <span className="text-lg">Transactions</span>
//             </Link>
//             <Link to="/support" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <MdOutlineContactSupport className="mr-3 h-6 w-6" />
//               <span className="text-lg">Support</span>
//             </Link>
//             <Link to="/notifications" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <MdOutlineNotificationsActive className="mr-3 h-6 w-6" />
//               <span className="text-lg">Notifications</span>
//             </Link>
//             <Link to="/settings" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
//               <IoSettingsOutline className="mr-3 h-6 w-6" />
//               <span className="text-lg">Settings</span>
//             </Link>
//           </nav>
//         </div>
//       </aside>

//       <main className="ml-64 flex-grow p-8">
//         <div className="mb-8">
//           <img src={fyler} alt="Dashboard" className="w-full max-h-32 rounded-lg shadow-md object-cover" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
//             <InfoCard title="Product Views" value={views} />
//             <InfoCard title="Product Shares" value={shares} />
//             <InfoCard title="Total Amount" value={shares} />
//             <InfoCard title="Add To Cart" value={addToCart} />
//           </div>
//           <div className="bg-white p-8 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold mb-6">Calendar</h2>
//             <Calendar onChange={setDate} value={date} className="calendar-small" />
//           </div>
//         </div>

//         <OrdersTable recentOrders={recentOrders} />
//       </main>
//     </div>
//   );
// };

// const InfoCard = ({ title, value }) => (
//   <div className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition-transform">
//     <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
//     <hr className="border-gray-300 mb-4" />
//     <div className="text-gray-700 font-bold">{value !== null ? value : 'Loading...'}</div>
//   </div>
// );

// const OrdersTable = ({ recentOrders }) => (
//   <div className="flex flex-wrap mb-8">
//           <div className="w-full p-2">
//             <div className="bg-white p-8 rounded-lg shadow-lg">
//               <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
//               <div className="overflow-hidden rounded-lg shadow-lg">
//                 <table className="w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {recentOrders.length > 0 ? (
//                       recentOrders.map((order) => (
//                         order.items.slice(-5).map((item, index) => (
//                           <tr key={index} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
//                             <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{item.price !== undefined ? item.price : 'N/A'}</td>
//                           </tr>
//                         ))
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">No recent orders found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
// );

// export default SellerDashboard;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdOutlineContactSupport, MdOutlineNotificationsActive } from 'react-icons/md';
import { FaFileInvoiceDollar, FaEye, FaShareAlt, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import { BsBoxSeamFill } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import fyler from "./fyler.png";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SellerDashboard = () => {
  const [views, setViews] = useState(null);
  const [addToCart, setAddToCart] = useState(null);
  const [shares, setShares] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [recentOrders, setRecentOrders] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await fetch(`/api/orders/getorder?userRef=${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
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
    <div className="flex h-screen">
      <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-600 text-white shadow-md">
        <div className="p-6">
          <Link to="/sellerdashboard" className="mb-6 block text-2xl font-bold">
            Seller Dashboard
          </Link>
          <nav>
            <Link to="/profile" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <VscAccount className="mr-3 h-6 w-6" />
              <span className="text-lg">Account</span>
            </Link>
            <Link to="/Product" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <BsBoxSeamFill className="mr-3 h-6 w-6" />
              <span className="text-lg">Products</span>
            </Link>
            <Link to="/orders" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <LuClipboardList className="mr-3 h-6 w-6" />
              <span className="text-lg">My Orders</span>
            </Link>
            <Link to="/transactions" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <FaFileInvoiceDollar className="mr-3 h-6 w-6" />
              <span className="text-lg">Transactions</span>
            </Link>
            <Link to="/support" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <MdOutlineContactSupport className="mr-3 h-6 w-6" />
              <span className="text-lg">Support</span>
            </Link>
            <Link to="/notifications" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <MdOutlineNotificationsActive className="mr-3 h-6 w-6" />
              <span className="text-lg">Notifications</span>
            </Link>
            <Link to="/settings" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
              <IoSettingsOutline className="mr-3 h-6 w-6" />
              <span className="text-lg">Settings</span>
            </Link>
          </nav>
        </div>
      </aside>

      <main className="ml-64 flex-grow p-8">
      <div className="mb-8">
          <img src={fyler} alt="Dashboard Image" className="w-full max-h-32 rounded-lg shadow-md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            <InfoCard title="Product Views" value={views} icon={<FaEye />} />
            <InfoCard title="Product Shares" value={shares} icon={<FaShareAlt />} />
            <InfoCard title="Total Amount" value={shares} icon={<FaDollarSign />} />
            <InfoCard title="Add To Cart" value={addToCart} icon={<FaShoppingCart />} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Calendar</h2>
            <Calendar onChange={setDate} value={date} className="calendar-small" />
          </div>
        </div>

        <OrdersTable recentOrders={recentOrders} />
      </main>
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform">
    <div className="flex items-center mb-2">
      <div className="text-white text-2xl mr-3">{icon}</div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
    </div>
    <hr className="border-gray-300 mb-4" />
    <div className="text-white font-bold text-2xl">{value !== null ? value : 'Loading...'}</div>
  </div>
);

const OrdersTable = ({ recentOrders }) => (
  <div className="flex flex-wrap mb-8">
    <div className="w-full p-2">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) =>
                  order.items.slice(-5).map((item, index) => (
                    <tr key={index} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                      <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.price !== undefined ? item.price : 'N/A'}</td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center">No recent orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default SellerDashboard;


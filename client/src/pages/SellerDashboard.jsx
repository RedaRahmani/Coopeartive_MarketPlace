import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdOutlineContactSupport, MdOutlineNotificationsActive } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { BsBoxSeamFill } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import fyler from "./fyler.png"

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
    <div className="flex">
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-600 text-white shadow-md">
        <div className="p-6">
          <Link to="/sellerdashboard" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <span className="text-2xl font-bold">Seller Dashboard</span>
          </Link>
          <Link to="/profile" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <VscAccount className="mr-3 h-6 w-6" />
            <span className="text-lg">Account</span>
          </Link>
          <Link to="/Product" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <BsBoxSeamFill className="mr-3 h-6 w-6" />
            <span className="text-lg">Products</span>
          </Link>
          <Link to="/orders" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <LuClipboardList className="mr-3 h-6 w-6" />
            <span className="text-lg">My Orders</span>
          </Link>
          <Link to="/transactions" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <FaFileInvoiceDollar className="mr-3 h-6 w-6" />
            <span className="text-lg">Transactions</span>
          </Link>
          <Link to="/support" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <MdOutlineContactSupport className="mr-3 h-6 w-6" />
            <span className="text-lg">Support</span>
          </Link>
          <Link to="/notifications" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <MdOutlineNotificationsActive className="mr-3 h-6 w-6" />
            <span className="text-lg">Notifications</span>
          </Link>
          <Link to="/settings" className="mb-4 flex items-center p-2 rounded hover:bg-gray-700 transition-colors">
            <IoSettingsOutline className="mr-3 h-6 w-6" />
            <span className="text-lg">Settings</span>
          </Link>
        </div>
      </div>

      <div className="ml-64 flex-grow p-8">
        {/* Image Section */}
        <div className="mb-8">
          <img src={fyler} alt="Dashboard Image" className="w-full max-h-32 rounded-lg shadow-md" />
        </div>

        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Views</h2>
              <hr className="border-gray-300 mb-4" />
              <div className="text-gray-700 font-bold">Views: {views !== null ? views : 'Loading...'}</div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Product Shares</h2>
              <hr className="border-gray-300 mb-4" />
              <div className="text-gray-700 font-bold">Shares: {shares !== null ? shares : 'Loading...'}</div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Total Amount</h2>
              <hr className="border-gray-300 mb-4" />
              <div className="text-gray-700 font-bold">Total: {shares !== null ? shares : 'Loading...'}</div>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg p-6 transform hover:scale-105 transition-transform">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Add To Cart</h2>
              <hr className="border-gray-300 mb-4" />
              <div className="text-gray-700 font-bold">Add To Cart: {addToCart !== null ? addToCart : 'Loading...'}</div>
            </div>
          </div>
        </div>

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
                  recentOrders.map((order) => (
                    order.items.slice(-5).map((item, index) => (
                      <tr key={index} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                        <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.price !== undefined ? item.price : 'N/A'}</td>
                      </tr>
                    ))
                  ))
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
};

export default SellerDashboard;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscAccount } from 'react-icons/vsc';
import { MdOutlineContactSupport, MdOutlineNotificationsActive, MdAttachMoney } from 'react-icons/md';
import { FaFileInvoiceDollar, FaEye, FaShareAlt, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import { BsBoxSeamFill } from 'react-icons/bs';
import { LuClipboardList } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiBox , FiClock } from 'react-icons/fi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css'; // Import the custom CSS file
import fyler from "./fyler.png";

const SellerDashboard = () => {
  const [views, setViews] = useState(null);
  const [addToCart, setAddToCart] = useState(null);
  const [shares, setShares] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [recentOrders, setRecentOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await fetch(`/api/orders/getorder?userRef=${currentUser._id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setRecentOrders(data.orders);
        const total = data.orders.reduce((sum, order) => sum + order.totalAmount, 0);
        setTotalAmount(total);
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
          headers: { 'Content-Type': 'application/json' }
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
            headers: { 'Content-Type': 'application/json' }
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
            headers: { 'Content-Type': 'application/json' }
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
            <Link to="/Contact" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
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

        <div className="flex flex-wrap justify-between items-center mb-8 space-x-2">
          <InfoCard title="Product Views" value={views} icon={<FaEye />} />
          <InfoCard title="Product Shares" value={shares} icon={<FaShareAlt />} />
          <InfoCard title="Total Amount" value={totalAmount} icon={<FaDollarSign />} />
          <InfoCard title="Add To Cart" value={addToCart} icon={<FaShoppingCart />} />
        </div>

        <div className="flex space-x-4">
          <div className="w-2/3 p-2">
            <OrdersTable recentOrders={recentOrders} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
  <div className="bg-white rounded-lg shadow-lg p-6 md:p-16">
    <div className="flex justify-center mb-4">
      <div className="flex text-xl font-bold text-gray-800 items-center">
        <FiClock className="mr-2 text-3xl" />
        <span className="hidden md:block">
          {date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})}
        </span>
      </div>
    </div>
    <Calendar
      onChange={setDate}
      value={date}
      className="border-none shadow-none justify-center p-5"
    />
  </div>
  </div>
</div>

      </main>
    </div>
  );
};

const InfoCard = ({ title, value, icon }) => (
  <div className="flex-grow bg-gradient-to-r from-blue-50 to-blue-200 shadow-lg rounded-lg p-4 transform hover:scale-105 transition-transform">
    <div className="flex items-center mb-2">
      <div className="text-gray-600 text-2xl mr-3">{icon}</div>
      <h2 className="text-lg font-semibold text-blue-900">{title}</h2>
    </div>
    <hr className="border-gray-300 mb-4" />
    <div className="text-blue-500 font-bold text-2xl">{value !== null ? value : 'Loading...'}</div>
  </div>
);

const OrdersTable = ({ recentOrders, isLoading }) => (
  <div className="flex flex-wrap mb-3">
    <div className="w-full p-2">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center mb-6">
          <FaShoppingCart className="text-3xl text-gray-600 mr-2" />
          <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) =>
                order.items.slice(-3).map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-1 shadow-md transition-transform transform hover:scale-105"
                  >
                    <div className="flex justify-between mb-4">
                      <div className="text-sm text-blue-700">
                        <FiBox className="inline text-blue-500 mr-1" />
                        Order ID: <span className="font-medium text-blue-900">{order._id}</span>
                      </div>
                      <div className="text-sm text-blue-700">
                        {/* <MdAttachMoney className="inline text-blue-500 mr-1" /> */}
                        Price: <span className="font-medium text-blue-900">{item.price !== undefined ? `MAD ${item.price}` : 'N/A'}</span>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-800 mb-2">{item.name}</div>
                    <div className="text-sm text-blue-700">
                      Quantity: <span className="font-medium text-blue-900">{item.quantity}</span>
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="text-center text-gray-500">No recent orders found</div>
            )}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default SellerDashboard;

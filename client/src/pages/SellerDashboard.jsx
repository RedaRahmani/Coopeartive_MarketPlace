import React from 'react'
import Dashboard from '../components/Userinfo'
import Avatar from '../components/Avatar'
import { VscAccount } from "react-icons/vsc";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

const SellerDashboard = () => {
  const [views, setViews] = useState(null);
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    
    const fetchViews = async () => {
      try {
        const res = await fetch(`/api/listing/productviewed?id=${currentUser._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await res.json();
    setViews(data.views); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchViews();
  }, []);
  return (
    <>
    <div className="fixed left-0 top-0 h-full w-1/7 bg-gray-900 text-white shadow-md  border-l border-gray-300">
            <div className="mb-4  items-center justify-center ">
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
        <div className="flex justify-between items-center bg-custom-green  text-white p-4 pl-28" style={{ height: '200px' }}>
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
          <div className="bg-white shadow-md rounded-lg p-6 mb-4" style={{ width: '200px' }}>
            <h2 className="text-xl font-semibold mb-4">Product Orders</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2">Orders:</span>
                <span className="text-gray-700">{views !== null ? views : 'Loading...'}</span>
              </div>
              {/* Add more information or actions here */}
            </div>
          </div>
          <div className="w-10"></div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-4" style={{ width: '200px' }}>
            <h2 className="text-xl font-semibold mb-4">Product Orders</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2">Orders:</span>
                <span className="text-gray-700">{views !== null ? views : 'Loading...'}</span>
              </div>
              {/* Add more information or actions here */}
            </div>
          </div>
          <div className="w-10"></div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-4 "style={{ width: '200px' }}>
            <h2 className="text-xl font-semibold mb-4">Product Carts</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2">Carts:</span>
                <span className="text-gray-700">{views !== null ? views : 'Loading...'}</span>
              </div>
              {/* Add more information or actions here */}
            </div>
          </div>
</div>  
      </div>
    


    </>
  )
}

export default SellerDashboard

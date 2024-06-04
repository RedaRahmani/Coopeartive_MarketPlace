import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageFrame from './imagefarme'; // Assuming ImageFrame component is located here
import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice';
import { IoSettingsOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import lune from './laLune.jpeg'

export function LeftMenu  () {
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {
          dispatch(signOutUserStart());
          const res = await fetch('/api/auth/signout');
          const data = await res.json();
          if (data.success === false) {
            dispatch(deleteUserFailure(data.message));
            return;
          }
          dispatch(deleteUserSuccess(data));
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      };
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-800 to-gray-600 text-white shadow-md flex flex-col">
  <div className="p-6 flex-grow"
   style={{
    backgroundImage: `url(${lune})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    <Link to="/sellerdashboard" className="mb-6 block text-2xl font-bold">
      Seller Dashboard
    </Link>
    <nav className="flex flex-col h-full">
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

      <Link to="/Contact" className="flex items-center mb-4 p-2 rounded hover:bg-gray-700 transition-colors">
        <MdOutlineContactSupport className="mr-3 h-6 w-6" />
        <span className="text-lg">Support</span>
      </Link>
      <div className="flex-grow"></div> {/* This div will take up the remaining space */}
      <Link to="/sign-in" onClick={handleSignOut} className="flex items-center mb-10 p-2 rounded hover:bg-gray-700 transition-colors">
      <FiLogOut className="mr-3 h-6 w-6" />
        <span className="text-lg">Sign out</span>
      </Link>
    </nav>
  </div>
</aside>

    );
};

const RecentOrders = () => {
    // Assume recentOrders is an array of order objects
    const recentOrders = [];

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Order ID</th>
                        <th className="text-left">Customer</th>
                        <th className="text-left">Total</th>
                        <th className="text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>${order.total}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const UserInfo = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userData, setUserData] = useState(null);
    const { currentUser } = useSelector(state => state.user);
    const userRef = currentUser._id;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/user/${userRef}`);
                setUserData(response.data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userRef]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error || !userData) {
        return <div className="text-center text-red-500">Error fetching user data</div>;
    }

    return (
        <div className="ml-48 p-8">
            <div className="max-w-md bg-gray-100 rounded-lg shadow-md p-8 mb-8">
                <ImageFrame src={userData.avatar} alt="User Avatar" cadreSize="700" frameSize="5" frameColor="gray-500" className="mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">User Description</h2>
                <p>{userData.description}</p>
            </div>
            <div className="max-w-md bg-gray-100 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-semibold">Username:</span>
                        <span>{userData.username}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Email:</span>
                        <span>{userData.email}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Role:</span>
                        <span>{userData.role}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Cooperative ID:</span>
                        <span>{userData.cooperativeId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Birth:</span>
                        <span>{new Date(userData.birth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Created At:</span>
                        <span>{new Date(userData.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Updated At:</span>
                        <span>{new Date(userData.updatedAt).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="flex">
            <LeftMenu />
            <div className="w-full">
                <UserInfo />
                <RecentOrders />
            </div>
        </div>
    );
};

export default Dashboard;

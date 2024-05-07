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
import { IoSettingsOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'

export function LeftMenu  () {
    return (
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

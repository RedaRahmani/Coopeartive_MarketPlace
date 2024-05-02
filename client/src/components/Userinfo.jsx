// import React, {useState, useEffect} from 'react'
// import { useSelector } from 'react-redux';
// import axios from 'axios';


// const Userinfo = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const { currentUser } = useSelector(state => state.user);
//     const userRef = currentUser._id;
//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/user/${userRef}`);
//                 setUserData(response.data);
//                  // Assuming response.data is an array of cart items
//                 setLoading(false);
//                 setError(false);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };
//         fetchCartItems();
        
//     }, [userRef]);
//     if (loading) {
//         return <div>Loading...</div>; // Display loading indicator if data is being fetched
//     }

//     if (error || !userData) {
//         return <div>Error fetching user data</div>; // Display error message if an error occurred or data is empty
//     }
//   return (
//     <div className="container mx-auto py-8">
//     {loading && <div className="text-center">Loading...</div>}
//     {error && <div className="text-center text-red-500">Error fetching user data</div>}
//     {userData && (
//         <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//             <h2 className="text-2xl mb-4">User Information</h2>
//             <ul className="divide-y divide-gray-300">
//             <li className="py-2">
//                     <span className="font-bold">Avatar:</span> <img src={userData.avatar} alt="User Avatar" className="w-16 h-16 rounded-full" />
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Username:</span> {userData.username}
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Email:</span> {userData.email}
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Role:</span> {userData.role}
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Cooperative ID:</span> {userData.cooperativeId}
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Birth:</span> {new Date(userData.birth).toLocaleDateString()}
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Created At:</span> {new Date(userData.createdAt).toLocaleString()}
//                 </li>
//                 <li className="py-2">
//                     <span className="font-bold">Updated At:</span> {new Date(userData.updatedAt).toLocaleString()}
//                 </li>
//             </ul>
//         </div>
//     )}
// </div>
//   )
// }

// export default Userinfo
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Userinfo = () => {
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
        <div className="container mx-auto py-8 flex">
            <div className="w-1/4 mr-4">
                <img src={userData.avatar} alt="User Avatar" className="w-full rounded-lg" />
                <div className='mt-4'>
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="text-gray-700">{userData.description}</p>
                </div>
            </div>
            <div className="w-3/5 bg-gray-100 p-6">
                <h2 className="text-2xl mb-4">User Information</h2>
                <ul className="divide-y divide-gray-300">
                    <li className="py-2">
                        <span className="font-bold">Username:</span> {userData.username}
                    </li>
                    <li className="py-2">
                        <span className="font-bold">Email:</span> {userData.email}
                    </li>
                    <li className="py-2">
                        <span className="font-bold">Role:</span> {userData.role}
                    </li>
                    <li className="py-2">
                        <span className="font-bold">Cooperative ID:</span> {userData.cooperativeId}
                    </li>
                    <li className="py-2">
                        <span className="font-bold">Birth:</span> {new Date(userData.birth).toLocaleDateString()}
                    </li>
                    <li className="py-2">
                        <span className="font-bold">Created At:</span> {new Date(userData.createdAt).toLocaleString()}
                    </li>
                    <li className="py-2">
                        <span className="font-bold">Updated At:</span> {new Date(userData.updatedAt).toLocaleString()}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Userinfo;

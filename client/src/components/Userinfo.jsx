// // import React, {useState, useEffect} from 'react'
// // import { useSelector } from 'react-redux';
// // import axios from 'axios';


// // const Userinfo = () => {
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(false);
// //     const [userData, setUserData] = useState(null);
// //     const { currentUser } = useSelector(state => state.user);
// //     const userRef = currentUser._id;
// //     useEffect(() => {
// //         const fetchCartItems = async () => {
// //             try {
// //                 setLoading(true);
// //                 const response = await axios.get(`/api/user/${userRef}`);
// //                 setUserData(response.data);
// //                  // Assuming response.data is an array of cart items
// //                 setLoading(false);
// //                 setError(false);
// //             } catch (error) {
// //                 setError(true);
// //                 setLoading(false);
// //             }
// //         };
// //         fetchCartItems();
        
// //     }, [userRef]);
// //     if (loading) {
// //         return <div>Loading...</div>; // Display loading indicator if data is being fetched
// //     }

// //     if (error || !userData) {
// //         return <div>Error fetching user data</div>; // Display error message if an error occurred or data is empty
// //     }
// //   return (
// //     <div className="container mx-auto py-8">
// //     {loading && <div className="text-center">Loading...</div>}
// //     {error && <div className="text-center text-red-500">Error fetching user data</div>}
// //     {userData && (
// //         <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
// //             <h2 className="text-2xl mb-4">User Information</h2>
// //             <ul className="divide-y divide-gray-300">
// //             <li className="py-2">
// //                     <span className="font-bold">Avatar:</span> <img src={userData.avatar} alt="User Avatar" className="w-16 h-16 rounded-full" />
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Username:</span> {userData.username}
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Email:</span> {userData.email}
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Role:</span> {userData.role}
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Cooperative ID:</span> {userData.cooperativeId}
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Birth:</span> {new Date(userData.birth).toLocaleDateString()}
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Created At:</span> {new Date(userData.createdAt).toLocaleString()}
// //                 </li>
// //                 <li className="py-2">
// //                     <span className="font-bold">Updated At:</span> {new Date(userData.updatedAt).toLocaleString()}
// //                 </li>
// //             </ul>
// //         </div>
// //     )}
// // </div>
// //   )
// // }

// // export default Userinfo
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const Userinfo = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const { currentUser } = useSelector(state => state.user);
//     const userRef = currentUser._id;

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(`/api/user/${userRef}`);
                
//                 setUserData(response.data);
//                 setLoading(false);
//                 setError(false);
//             } catch (error) {
//                 setError(true);
//                 setLoading(false);
//             }
//         };
//         fetchUserData();
//     }, [userRef]);

//     if (loading) {
//         return <div className="text-center">Loading...</div>;
//     }

//     if (error || !userData) {
//         return <div className="text-center text-red-500">Error fetching user data</div>;
//     }

//     return (
//         // <div className="container mx-auto py-8 flex">
//         //     <div className="w-2/4 mr-4">
//         //         <img src={userData.avatar} alt="User Avatar" className="w-full rounded-lg" />
//         //         <div className='mt-4'>
//         //             <h3 className="text-xl font-semibold mb-2">Description</h3>
//         //             <p className="text-gray-700">{userData.description}</p>
//         //         </div>
//         //     </div>
//         //     <div className="w-3/5 bg-gray-100 p-2">
//         //         <h2 className="text-2xl mb-4">User Information</h2>
//         //         <ul className="">
//         //             <li className="py-2">
//         //                 <span className="font-bold">Username:</span> {userData.username}
//         //             </li>
//         //             <li className="py-2">
//         //                 <span className="font-bold">Email:</span> {userData.email}
//         //             </li>
//         //             <li className="py-2">
//         //                 <span className="font-bold">Role:</span> {userData.role}
//         //             </li>
//         //             <li className="py-2">
//         //                 <span className="font-bold">Cooperative ID:</span> {userData.cooperativeId}
//         //             </li>
//         //             <li className="py-2">
//         //                 <span className="font-bold">Birth:</span> {new Date(userData.birth).toLocaleDateString()}
//         //             </li>
//         //             <li className="py-2">
//         //                 <span className="font-bold">Created At:</span> {new Date(userData.createdAt).toLocaleString()}
//         //             </li>
//         //             <li className="py-2">
//         //                 <span className="font-bold">Updated At:</span> {new Date(userData.updatedAt).toLocaleString()}
//         //             </li>
//         //         </ul>
//         //     </div>
//         // </div>
//         <div className="container mx-auto py-8 flex">
//     <div className="w-1/2 mr-4">
//         <img src={userData.avatar} alt="User Avatar" className="w-full rounded-lg" />
//         <div className='mt-4'>
//             <h3 className="text-xl font-semibold mb-2">About Me</h3>
//             <p className="text-gray-700">{userData.description}</p>
//         </div>
//     </div>
//     <div className="bg-gray-100 p-4 rounded-lg">
//             <h2 className="text-2xl mb-4">User Information</h2>
//             <table className="table-auto w-full">
//                 <tbody>
//                     <tr>
//                         <td className="font-bold pr-4">Username:</td>
//                         <td>{userData.username}</td>
//                     </tr>
//                     <tr>
//                         <td className="font-bold pr-4">Email:</td>
//                         <td>{userData.email}</td>
//                     </tr>
//                     <tr>
//                         <td className="font-bold pr-4">Employes:</td>
//                         <td>{userData.employes}</td>
//                     </tr>
//                     <tr>
//                         <td className="font-bold pr-4">Cooperative ID:</td>
//                         <td>{userData.cooperativeId}</td>
//                     </tr>
//                     <tr>
//                         <td className="font-bold pr-4">Creation Date:</td>
//                         <td>{new Date(userData.birth).toLocaleDateString()}</td>
//                     </tr>
//                     <tr>
//                         <td className="font-bold pr-4">Created At:</td>
//                         <td>{new Date(userData.createdAt).toLocaleString()}</td>
//                     </tr>
//                     <tr>
//                         <td className="font-bold pr-4">Updated At:</td>
//                         <td>{new Date(userData.updatedAt).toLocaleString()}</td>
//                     </tr>
//                 </tbody>
//             </table>
//             </div>
// </div>

//     );
// };

// export default Userinfo;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageFrame from './imagefarme';
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
        <div className="w-1/2 mr-4">
            <div className="max-w-md mt-4 bg-slate-200 text-black p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <ImageFrame src={userData.avatar} alt="User Avatar" cadreSize="700" frameSize="5" frameColor="gray-500" className="" />
                <h2 className="text-xl mb-2">User Description</h2>
                <div className="description-container max-w-md">
                    <p className="text-black-300">{userData.description}</p>
                </div>
            </div>
        </div>
        <div className="top-20 left-700 bg-slate-200 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105">
            <h2 className="text-2xl mb-4">User Information</h2>
            <div className="max-w-md  text-gray-800 p-4 rounded-lg">
                <form className="space-y-4">
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Username:</label>
                        <span>{userData.username}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Email:</label>
                        <span>{userData.email}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Role:</label>
                        <span>{userData.role}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Cooperative ID:</label>
                        <span>{userData.cooperativeId}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Birth:</label>
                        <span>{new Date(userData.birth).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Created At:</label>
                        <span>{new Date(userData.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-wrap justify-between">
                        <label className="font-bold">Updated At:</label>
                        <span>{new Date(userData.updatedAt).toLocaleString()}</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Userinfo;

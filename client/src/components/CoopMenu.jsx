// import React from 'react';
// import { VscAccount } from "react-icons/vsc";
// import { MdOutlineContactSupport } from "react-icons/md";
// import { MdOutlineNotificationsActive } from "react-icons/md";
// import { FaFileInvoiceDollar } from "react-icons/fa6";
// import { BsBoxSeamFill } from "react-icons/bs";
// import { LuClipboardList } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';


// const CoopMenu = () => {
//   return (
//     <div className="absolute top-20 right-0 w-64 bg-slate-200 shadow-md border-l border-gray-300 p-4">
//       <div className="mb-4 flex items-center justify-center">
//         <h1 className="text-3xl font-bold text-gray-800 mr-4">Cooperative Dashboard</h1>
//         <div className="border-t border-gray-400 flex-grow"></div>
//       </div>
//       <Link to="/profile"  className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <VscAccount className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">Account</a>
//       </Link>

//       <Link to="/Product" className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <BsBoxSeamFill className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">Products</a>
//       </Link>

//       <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <LuClipboardList className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">My Orders</a>
//       </button>

//       <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <FaFileInvoiceDollar className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">Transactions</a>
//       </button>

//       <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <MdOutlineContactSupport className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">Support</a>
//       </button>

//       <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <MdOutlineNotificationsActive className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">Notifications</a>
//       </button>

//       <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
//         <div className="mr-2">
//           <IoSettingsOutline className="h-5 w-5" />
//         </div>
//         <a href="#" className="block py-2 px-4">Settings</a>
//       </button>

//       {/* Add more menu items as needed */}
//     </div>
//   );
// }

// export default CoopMenu;
import React from 'react';
import { VscAccount } from "react-icons/vsc";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { BsBoxSeamFill } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const CoopMenu = () => {
    return (
        <div className="absolute top-20 right-0 w-64 bg-slate-200 shadow-md border-l border-gray-300 p-4">
            <div className="mb-4 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mr-4">Cooperative Dashboard</h1>
                <div className="border-t border-gray-400 flex-grow"></div>
            </div>
            <Link to="/profile" className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <VscAccount className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">Account</span>
            </Link>

            <Link to="/Product" className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <BsBoxSeamFill className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">Products</span>
            </Link>

            <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <LuClipboardList className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">My Orders</span>
            </button>

            <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <FaFileInvoiceDollar className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">Transactions</span>
            </button>

            <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <MdOutlineContactSupport className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">Support</span>
            </button>

            <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <MdOutlineNotificationsActive className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">Notifications</span>
            </button>

            <button className="mb-4 flex items-center hover:bg-gray-300 rounded w-full">
                <div className="mr-2">
                    <IoSettingsOutline className="h-5 w-5" />
                </div>
                <span className="block py-2 px-4">Settings</span>
            </button>
        </div>
    );
};

export default CoopMenu;

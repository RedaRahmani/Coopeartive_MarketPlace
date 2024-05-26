import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LeftMenu } from '../components/Userinfo'

const Orders = () => {
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
  return (
    <>
    <LeftMenu />
    <div className="flex-grow p-8 pl-40 pr-0 border-solid">
     <h2 className="text-2xl font-bold mb-5 pl-12">All Orders</h2>
     <div className="w-full overflow-hidden rounded-lg shadow-lg pl-10 pr-10">
       <table className="w-full divide-y divide-gray-200">
         <thead className="bg-gray-50">
           <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
             {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th> */}
           </tr>
         </thead>
         <tbody className="bg-white divide-y divide-gray-200">
           {recentOrders.map((order) => (
             <React.Fragment key={order._id}>
               {order.items.map((item, index) => (
                 <tr key={index} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                   <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                   <td className="px-6 py-4 whitespace-nowrap">{item.price !== undefined ? item.price : 'N/A'}</td>
                   {/* <td className="px-6 py-4 whitespace-nowrap">{order.totalAmount}</td> */}
                 </tr>
               ))}
             </React.Fragment>
           ))}
         </tbody>
       </table>
     </div>
   </div>
    </>
  )
}

export default Orders

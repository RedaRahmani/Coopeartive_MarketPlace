import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LeftMenu } from '../components/Userinfo';
import { ClipLoader } from 'react-spinners';

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchRecentOrders();
    }
  }, [currentUser]);

  return (
    <>
      <LeftMenu />
      <div className="flex-grow p-6 md:pl-64 bg-gray-100 min-h-screen">
      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-4xl dark:text-white pl-32">
          All Orders
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ClipLoader size={50} color="#4A90E2" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center text-gray-600">
              <p className="text-xl">No orders found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <React.Fragment key={order._id}>
                      {order.items.map((item, index) => (
                        <tr key={index} className="transition-all duration-300 ease-in-out hover:bg-gray-100 transform hover:scale-105">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price !== undefined ? `$${item.price.toFixed(2)}` : 'N/A'}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;

// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const ThankYou = () => {
//   const { sessionId } = useParams(); // Retrieve sessionId from URL parameters
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const createOrder = async () => {
//       try {
//         const response = await axios.post('/api/orders/createorder', { sessionId });
//         if (response.status === 201) {
          
//           navigate('/thankyou');
//         }
//       } catch (error) {
//         console.error('Error creating order:', error);
//         setError('Failed to create order. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     createOrder();
//   }, [sessionId, navigate]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//   <>
//     <Header />
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl text-green-600 font-bold mb-8">Thank you! 😊</h1>
//       <p className="text-lg text-gray-700">Your submission has been received successfully. We appreciate your cooperation!</p>
//     </div>
//     </>
//   );
// };

// export default ThankYou;



// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../components/Header'; // Ensure the Header component is imported correctly

// const ThankYou = () => {
//   const { sessionId } = useParams(); // Retrieve sessionId from URL parameters
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const createOrder = async () => {
//       try {
//         const response = await axios.post('/api/orders/createorder', { sessionId });
//         if (response.status === 201) {
//           // Order creation is successful, stop loading and clear any error
//           setLoading(false);
//           setError(null);
//         }
//       } catch (error) {
//         console.error('Error creating order:', error);
//         setError('Failed to create order. Please try again.');
//         setLoading(false); // Stop loading even if there's an error
//       }
//     };

//     createOrder();
//   }, [sessionId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//         <h1 className="text-4xl text-green-600 font-bold mb-8">Thank you! 😊</h1>
//         <p className="text-lg text-gray-700 text-center">Your order has been successfully created. We appreciate your purchase!</p>
//       </div>
//     </>
//   );
// };

// export default ThankYou;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import Header from '../components/Header'; // Ensure the Header component is imported correctly

const ThankYou = () => {
  const { sessionId } = useParams(); // Retrieve sessionId from URL parameters
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const response = await axios.post('/api/orders/createorder', { sessionId });
        if (response.status === 201) {
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error('Error creating order:', error);
        setError('Failed to create order. Please try again.');
        setLoading(false);
      }
    };

    createOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-100 to-purple-200 animate-fadeIn">
        <div className="bg-white p-10 rounded-xl shadow-lg text-center">
          <h1 className="text-5xl text-green-600 font-extrabold mb-6">Thank you! 😊</h1>
          <p className="text-lg text-gray-700 mb-6">Your order has been successfully created. We appreciate your purchase!</p>
          <a href="/" className="inline-flex items-center px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300">
            <FaShoppingCart className="mr-2" />
            Continue Shopping
          </a>
        </div>
      </div>
    </>
  );
};

export default ThankYou;

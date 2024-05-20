import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
          // Redirect to order confirmation page or update the UI accordingly
          navigate('/thankyou');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        setError('Failed to create order. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    createOrder();
  }, [sessionId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
  <>
    <Header />
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-green-600 font-bold mb-8">Thank you! 😊</h1>
      <p className="text-lg text-gray-700">Your submission has been received successfully. We appreciate your cooperation!</p>
    </div>
    </>
  );
};

export default ThankYou;

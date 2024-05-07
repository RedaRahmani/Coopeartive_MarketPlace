import React from 'react';
import Header from '../components/Header';

const ThankYou = () => {
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

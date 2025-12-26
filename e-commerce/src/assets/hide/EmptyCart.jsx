// src/components/EmptyCart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-20 space-y-8">
      <div className="relative">
        <div className="text-8xl opacity-20">🛒</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl">📚</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-800">Your cart feels lonely</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Looks like you haven't added any books to your cart yet. 
          Discover amazing books and start building your collection!
        </p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => navigate('/shop')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 mx-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>Start Shopping</span>
        </button>
        
        <p className="text-sm text-gray-500">
          📖 New arrivals • 🎁 Special offers • 💰 Great deals
        </p>
      </div>
    </div>
  );
};

export default EmptyCart;

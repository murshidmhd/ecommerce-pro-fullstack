// src/components/CartItem.jsx
import React, { memo } from 'react';

const CartItem = memo(({ item, onUpdateQuantity, onRemove }) => {
  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 p-6 flex flex-col sm:flex-row gap-6">
      {/* Product Image */}
      <div className="relative sm:w-32 sm:h-32 w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0">
        <img
          src={item.imageUrl}
          alt={item.title || item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {item.title || item.name}
          </h3>
          {item.author && (
            <p className="text-gray-600 text-sm mb-3 font-medium">by {item.author}</p>
          )}
          
          {/* Price per unit */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-blue-600">₹{item.price}</span>
            <span className="text-gray-500 text-sm">per item</span>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 hover:bg-white rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-900"
              aria-label="Decrease quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            
            <span className="px-4 py-2 font-bold text-gray-900 min-w-12 text-center">
              {item.quantity}
            </span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-white rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-900"
              aria-label="Increase quantity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Item Total and Remove */}
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-gray-900">₹{totalPrice}</span>
            <button
              onClick={() => onRemove(item)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartItem;

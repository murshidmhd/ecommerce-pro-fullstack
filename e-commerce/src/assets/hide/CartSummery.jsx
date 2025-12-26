// src/components/CartSummary.jsx
import React from 'react';

const CartSummary = ({ cartItems, onClearCart, onPlaceOrder }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 sticky top-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Items ({itemCount})</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `₹${shipping}`
            )}
          </span>
        </div>
        
        {subtotal > 0 && subtotal < 500 && (
          <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl">
            💡 Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onPlaceOrder}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Place Order</span>
        </button>
        
        <button
          onClick={onClearCart}
          className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-200"
        >
          Clear Cart
        </button>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>🔒 Secure checkout • 📱 Easy returns</p>
      </div>
    </div>
  );
};

export default CartSummary;

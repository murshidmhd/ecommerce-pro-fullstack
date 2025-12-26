// src/components/BookCard.jsx
import React, { memo } from 'react';

const BookCard = memo(({ book, isInWishlist, isInCart, onAddToCart, onToggleWishlist }) => {
  const typeConfig = {
    sale: { bg: "bg-emerald-100", text: "text-emerald-800", label: "For Sale" },
    donation: { bg: "bg-blue-100", text: "text-blue-800", label: "Free" },
    bogo: { bg: "bg-amber-100", text: "text-amber-800", label: "BOGO" }
  };

  const config = typeConfig[book.type] || typeConfig.sale;

  return (
    <div className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col overflow-hidden">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Floating Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(book)}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            isInWishlist 
              ? "bg-red-500/90 text-white shadow-lg scale-110" 
              : "bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg className="w-5 h-5" fill={isInWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Type Badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 font-medium">{book.author}</p>
        
        <div className="mt-auto">
          {book.type === "sale" && book.price && (
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-3xl font-bold text-gray-900">₹{book.price}</span>
              <span className="text-sm text-gray-500 line-through">₹{Math.round(book.price * 1.2)}</span>
            </div>
          )}

          <button
            onClick={() => onAddToCart(book)}
            disabled={isInCart}
            className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isInCart 
                ? "bg-gray-100 text-gray-500 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 active:scale-95"
            }`}
          >
            {isInCart ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>In Cart</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

export default BookCard;

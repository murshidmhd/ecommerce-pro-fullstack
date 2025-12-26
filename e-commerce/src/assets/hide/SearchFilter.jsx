// src/components/SearchFilters.jsx
import React from 'react';

const SearchFilters = ({ search, setSearch, selectedType, setSelectedType, sortBy, setSortBy, resultCount, totalCount }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8 mb-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer text-lg font-medium"
          >
            <option value="all">All Categories</option>
            <option value="sale">💰 For Sale</option>
            <option value="donation">🎁 Free Books</option>
            <option value="bogo">🔥 BOGO Deals</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer text-lg font-medium"
          >
            <option value="newest">🆕 Latest First</option>
            <option value="title">🔤 A to Z</option>
            <option value="price-low">💵 Price: Low to High</option>
            <option value="price-high">💎 Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-gray-600 font-medium">
          Showing <span className="font-bold text-blue-600">{resultCount}</span> of <span className="font-bold">{totalCount}</span> books
        </p>
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-1"
          >
            <span>Clear search</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;

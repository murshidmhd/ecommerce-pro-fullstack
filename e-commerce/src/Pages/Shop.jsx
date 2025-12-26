import React, { useEffect, useState } from "react";
import { useCart } from "../features/context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useWishlist } from "../features/context/WishListContext";
import api from "../services/api";
import axios from "axios";

function Shop() {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setLoading(true);

      api
        .get("products/", {
          params: {
            search: search,
            type: selectedType !== "all" ? selectedType : null,
            ordering: sortBy,
          },
        })
        .then((res) => {
          setProducts(res.data.results);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load listing.");
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-lg text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async (item) => {
    const token = localStorage.getItem("accessToken"); 
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(
        "/cart/",
        { product_id: item.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ Item added to cart!");
    } catch (error) {
      if (error.response?.status == 400) {
        toast.info("Item aldredy in cart!");
      } else {
        toast.error("Failed to add item");
      }
    }
  };

  const toggleWishlist = (item) => {
    const isInWishlist = wishlist.find((w) => w.id === item.id);

    if (isInWishlist) {
      removeFromWishlist(item.id);
      // toast.error("❌ Removed from wishlist");
    } else {
      addToWishlist(item);
      toast.success("❤️ Added to wishlist");
    }
  };

  let filteredBooks = [...products];

  if (sortBy === "price-low") {
    filteredBooks.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredBooks.sort((a, b) => b.price - a.price);
  } else if (sortBy === "title") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredBooks.sort((a, b) => b.id - a.id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Books
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of books available for sale, donation, or
            through BOGO offers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by title or author…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer transition"
            >
              <option value="all">All Types</option>
              <option value="sale">For Sale</option>
              <option value="donation">Free/Donation</option>
              <option value="bogo">BOGO Offers</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer transition"
            >
              <option value="newest">Newest First</option>
              <option value="title">Title A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBooks.length} of {products.length} books
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No books found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((item) => {
              const isInWishlist = wishlist.find((w) => w.id === item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative">
                    <div className="h-100 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Wishlist Button (top-right) */}
                    <button
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
                        isInWishlist
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => toggleWishlist(item)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={isInWishlist ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    key={item.id}
                    onClick={() => navigate(`/listings/${item.id}`)}
                    className="bg-white rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition-all "
                  >
                    <div className="p-4 flex-1 flex flex-col">
                      <h2 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 mb-3 text-sm">
                        {item.author}
                      </p>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span
                            className={`text-sm px-2 py-1 rounded ${
                              item.type === "sale"
                                ? "bg-blue-100 text-blue-800"
                                : item.type === "donation"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.type === "sale"
                              ? "For Sale"
                              : item.type === "donation"
                              ? "Free"
                              : "BOGO Offer"}
                          </span>

                          {item.type === "sale" && (
                            <span className="text-lg font-bold text-blue-600">
                              ₹{item.price}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;

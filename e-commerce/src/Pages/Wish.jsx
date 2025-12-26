import React from "react";
import { useCart } from "../features/context/CartContext";
import toast from "react-hot-toast";
import { useWishlist } from "../features/context/WishListContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const handelAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id, false);
    toast.success("added to cart");
  };

  const handelClearWishlsit = () => {
    clearWishlist()
    toast("clear wishlist");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
          💖 My Wishlist
        </h2>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your wishlist is empty.
          </p>
        ) : (
          <>
            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
                >
                  {/* Image */}
                  <div className="w-full h-64 bg-gray-100 flex items-center justify-center p-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="object-contain h-full w-auto rounded"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="p-4 flex flex-col flex-grow text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {item.name || item.title}
                    </h3>
                    {item.author && (
                      <p className="text-sm text-gray-500 mb-4">
                        {item.author}
                      </p>
                    )}

                    {/* Buttons */}
                    <div className="mt-auto flex flex-col gap-2">
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                      >
                        Remove
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                        onClick={() => handelAddToCart(item)}
                      >
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear Wishlist Button */}
            <div className="text-center">
              <button
                onClick={handelClearWishlsit}
                className="w-full bg-gray-800 text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
              >
                Clear Wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Wishlist;

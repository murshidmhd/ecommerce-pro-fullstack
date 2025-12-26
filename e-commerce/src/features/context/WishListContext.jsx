import { createContext, useState, useEffect, useContext } from "react";
// import AddListing from "../features/products/AddListing";
import axios from "axios";
import toast from "react-hot-toast";
const WishListContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
        .then((res) => setWishlist(res.data.wishlist || []))
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [userId]);

  const saveWishlsitToServer = async (updatedWishlist) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        wishlist: updatedWishlist,
      });
    } catch (err) {
      console.error("Error Saving Wishlist", err);
    }
  };
  const addToWishlist = async (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (!exists) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist); /*we can see first ui*/
      await saveWishlsitToServer(updatedWishlist);
    }
  };
  const removeFromWishlist = async (productid, showToast = true) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productid);
    setWishlist(updatedWishlist);

    if (showToast) {
      toast.error("❌ Removed from wishlist");
    }

    await saveWishlsitToServer(updatedWishlist);
  };

  const clearWishlist = async () => {
    setWishlist([]);
    await saveWishlsitToServer([]);
  };
  return (
    <WishListContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
}

 const useWishlist = () => useContext(WishListContext);

export { useWishlist, WishlistProvider };

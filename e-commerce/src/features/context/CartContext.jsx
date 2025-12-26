import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(null);

      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
        .then((res) => {
          setCartItems(res.data.cart || []);
        })
        .catch((err) => {
          console.error("Error fetching cart: ", err);
          setError("Failed to load cart items. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userId]);

  const saveCartToServer = async (updatedCart) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.error("error saving cart:", err);
      setError(err);
    }
  };

  const addToCart = async (product) => {
    let updatedCart;
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    await saveCartToServer(updatedCart);
  };
  const removeFromCart = async (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
    toast.error("Item has been removed 🗑️");
    await saveCartToServer(updatedCart);
  };
  const updateQuantity = async (id, newQty) => {
    let updatedCart;
    if (newQty <= 0) {
      updatedCart = cartItems.filter((item) => item.id !== id);
    } else {
      updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
    }

    setCartItems(updatedCart);
    await saveCartToServer(updatedCart);
  };
  const clearCart = async () => {
    setCartItems([]);
    await saveCartToServer([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };

export const useCart = () => useContext(CartContext);

/* this is for we dont write in all section like this 
const {cartItems , addToCart} = useContext(CartContext); */

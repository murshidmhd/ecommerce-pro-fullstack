import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { clearCart, cartItems } = useCart();

  useEffect(() => {
    const addressData = localStorage.getItem("selectedAddress");
    if (addressData) {
      setSelectedAddress(JSON.parse(addressData));
    } else {
      toast.error("No address selected");
      navigate("/orderdetails");
    }
  }, [navigate]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${userId}`
      );
      const user = response.data;

      const newOrders = cartItems.map((item) => ({
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: item.title,
        author: item.author,
        type: item.type,
        price: item.price,
        condition: item.condition,
        imageUrl: item.imageUrl,
        quantity: item.quantity || 1,
        status: "Pending",
        date: new Date().toLocaleDateString(),
        paymentMethod,
        shippingAddress: selectedAddress, // Store the address with the order
        orderTotal: total,
      }));

      await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        ...user,
        order: [...(user.order || []), ...newOrders],
        cart: [],
      });

      clearCart();
      localStorage.removeItem("selectedAddress"); // Clean up
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong while placing order");
    }
  };

  if (!selectedAddress) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({cartItems.length} items)</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
        <div className="border rounded p-3 bg-gray-50">
          <div className="flex gap-2 mb-1">
            <span className="font-medium capitalize">
              {selectedAddress.type}
            </span>
          </div>
          <p>{selectedAddress.street}</p>
          <p>
            {selectedAddress.city}, {selectedAddress.state} -{" "}
            {selectedAddress.pincode}
          </p>
          <p>Phone: {selectedAddress.phone}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="space-y-3">
          {["UPI", "Card", "Cash on Delivery"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
      >
        Place Order - ₹{total}
      </button>
    </div>
  );
}

export default PaymentPage;

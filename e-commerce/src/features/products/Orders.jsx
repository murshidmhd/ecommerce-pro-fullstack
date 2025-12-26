// OrderPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`);
        setOrders(response.data.order || []);
      } catch {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">No orders placed yet.</p>
          <Link
            to="/shop"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id || order.title} className="p-4 border rounded-lg shadow bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{order.title || order.name}</h2>
                  <p className="text-gray-600">Price: ₹{order.price}</p>
                  <p className="text-gray-500 text-sm">Ordered on: {order.date}</p>
                  <span
                    className={`px-2 py-1 mt-2 inline-block rounded text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>
                </div>
                <Link
                  to={`/orders/${order.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;

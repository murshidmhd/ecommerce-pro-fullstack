import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => {
        const allOrders = res.data.flatMap((user) =>
          (user.order || []).map((o) => ({
            ...o,
            userId: user.id,
            name: user.name,
            userEmail: user.email,
            status: o.status || "Pending",
          }))
        );

        setOrders(allOrders);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching orders!");
        setLoading(false);
      });
  };

  const handleStatus = async (e, order) => {
    const newStatus = e.target.value;
    // console.log(order);

    try {
      const userRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/users${order.userId}`
      );

      const user = userRes.data;
      user.order = user.order.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${order.userId}`,
        user
      );

      fetchOrders();
    } catch {
      toast.error("Error updating status!");
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2 text-gray-600 font-semibold">
                User
              </th>
              <th className="text-left px-4 py-2 text-gray-600 font-semibold">
                Book
              </th>
              <th className="text-left px-4 py-2 text-gray-600 font-semibold">
                Price
              </th>
              <th className="text-left px-4 py-2 text-gray-600 font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <td className="px-4 py-3">{order.name}</td>
                <td className="px-4 py-3">{order.title}</td>
                <td className="px-4 py-3">₹{order.price}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatus(e, order)}
                    className="border rounded p-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;

import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(null);

  // Function to place a new order
  const placeOrder = (items, paymentMethod) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      items,
      total: items.reduce((sum, item) => sum + item.price, 0) + 50, // +shipping
      paymentMethod,
      status: "Pending",
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };
    setOrder(newOrder);
    return newOrder;
  };

  // Function to update status
  const updateOrderStatus = (status) => {
    if (!order) return;
    setOrder({ ...order, status });
  };

  return (
    <OrderContext.Provider value={{ order, placeOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);

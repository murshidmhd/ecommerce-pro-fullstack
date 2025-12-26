// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./features/context/CartContext.jsx";
import { WishlistProvider } from "./features/context/WishListContext.jsx";
import { OrderProvider } from "./features/context/OrderContext.jsx";
import { AuthProvider } from "./Admin/Context/AuthContext.jsx"; // Enable this

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Enable this */}
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>
);

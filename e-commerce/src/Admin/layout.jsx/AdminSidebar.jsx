// Admin/layout.jsx/AdminSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext"; 

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col shadow-lg h-screen sticky top-0">
      {/* Header */}
      <div className="p-5 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-3">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition ${
              isActive ? "bg-gray-800 text-yellow-400" : "hover:text-yellow-400"
            }`
          }
        >
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition ${
              isActive ? "bg-gray-800 text-yellow-400" : "hover:text-yellow-400"
            }`
          }
        >
          <Package size={20} /> Products
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition ${
              isActive ? "bg-gray-800 text-yellow-400" : "hover:text-yellow-400"
            }`
          }
        >
          <Users size={20} /> Users
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-md transition ${
              isActive ? "bg-gray-800 text-yellow-400" : "hover:text-yellow-400"
            }`
          }
        >
          <ShoppingCart size={20} /> Orders
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded-md bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;

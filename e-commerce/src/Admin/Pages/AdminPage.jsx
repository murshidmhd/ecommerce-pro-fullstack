import { Outlet } from "react-router-dom";
import AdminSidebar from "../layout.jsx/AdminSidebar"; // make sure path is correct

function AdminPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 ">
        <Outlet /> {/* Dynamic section here */}
      </div>
    </div>
  );
}
export default AdminPage;

import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import api from "../../services/api";
import { useEffect, useState } from "react";

function AdminRoute({ children }) {
  const { loading } = useAuth();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // ⛔ WAIT until auth is fully restored
    if (loading) return;

    const token = localStorage.getItem("access");

    if (!token) {
      setAllowed(false);
      setChecking(false);
      return;
    }

    api
      .get("/dashboard/products/health/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAllowed(true);
      })
      .catch(() => {
        setAllowed(false);
      })
      .finally(() => {
        setChecking(false);
      });
  }, [loading]);

  if (loading || checking) {
    return <div>Checking admin access...</div>;
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AdminRoute;

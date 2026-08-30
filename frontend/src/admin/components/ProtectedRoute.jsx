import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyAdmin } from "../lib/api";

const ProtectedRoute = () => {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setAuthenticated(false);
        setChecking(false);
        return;
      }

      try {
        await verifyAdmin();
        setAuthenticated(true);
      } catch (error) {
        console.error("Admin authentication failed:", error);

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        setAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };

    checkAuthentication();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-600 border-t-white rounded-full animate-spin mx-auto" />

          <p className="text-white mt-4 text-sm">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
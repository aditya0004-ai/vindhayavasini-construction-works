// frontend/src/context/AdminAuthContext.jsx

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as adminApi from "../lib/adminApi";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check whether a stored token still verifies against the API
  useEffect(() => {
    const checkToken = async () => {
      const token = adminApi.getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        await adminApi.verifyToken();
        setIsAuthenticated(true);
      } catch {
        adminApi.clearToken();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = useCallback(async (username, password) => {
    await adminApi.login(username, password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    adminApi.logout();
    setIsAuthenticated(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
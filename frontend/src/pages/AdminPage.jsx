// frontend/src/pages/AdminPage.jsx
import { Loader2 } from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "../context/AdminAuthContext";
import AdminLogin from "../components/admin/AdminLogin";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../components/admin/AdminDashboard";

function AdminGate() {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#14110F] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#C9A258] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
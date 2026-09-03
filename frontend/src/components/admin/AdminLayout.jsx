// frontend/src/components/admin/AdminLayout.jsx

import { Building2, LogOut } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLayout({ children }) {
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-[#14110F] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1A1613] border-r border-[#33291F] flex flex-col relative">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#C9A258 1px, transparent 1px), linear-gradient(90deg, #C9A258 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative px-6 py-6 border-b border-[#33291F]">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-[#C9A258]" />
            <span className="font-serif text-lg text-[#F5F1E8]">Vindhayavasini</span>
          </div>
          <p className="text-[10px] tracking-[0.25em] text-[#A79C8C] uppercase pl-7">
            Admin Panel
          </p>
        </div>

        <nav className="relative flex-1 px-3 py-4">
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-[#262019] text-[#C9A258] text-sm font-medium border-l-2 border-[#C9A258]">
            Projects
          </div>
        </nav>

        <div className="relative px-3 py-4 border-t border-[#33291F]">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm text-[#A79C8C] hover:text-[#F5F1E8] hover:bg-[#262019] transition"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
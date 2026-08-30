import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Plus,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const adminUser = localStorage.getItem("adminUser");

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/admin/login", {
      replace: true,
    });
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "All Projects",
      path: "/admin/projects",
      icon: Building2,
    },
    {
      label: "Add Project",
      path: "/admin/projects/new",
      icon: Plus,
    },
  ];

  const Sidebar = () => (
    <aside className="h-full w-72 bg-slate-950 text-white flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-xl font-bold">
          Vindhayavasini
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Construction Admin
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
        >
          <ExternalLink size={18} />
          View Website
        </a>
      </nav>

      <div className="p-4 border-t border-white/10">
        {adminUser && (
          <div className="mb-3 px-3">
            <p className="text-xs text-slate-500">
              Logged in as
            </p>

            <p className="text-sm text-slate-200 truncate mt-1">
              {adminUser}
            </p>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40">
        <Sidebar />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden h-16 bg-slate-950 text-white flex items-center justify-between px-4">
        <div>
          <h1 className="font-bold">
            Vindhayavasini
          </h1>

          <p className="text-[10px] text-slate-400">
            Construction Admin
          </p>
        </div>

        <button
          onClick={() => setMobileMenu(true)}
          className="p-2"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenu(false)}
          />

          <div className="absolute left-0 top-0 bottom-0">
            <div className="absolute right-3 top-3 z-10">
              <button
                onClick={() => setMobileMenu(false)}
                className="text-white"
              >
                <X />
              </button>
            </div>

            <Sidebar />
          </div>
        </div>
      )}

      <main className="lg:ml-72 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
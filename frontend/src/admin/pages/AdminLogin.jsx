import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, Building2 } from "lucide-react";
import { adminLogin } from "../lib/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from =
    location.state?.from || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await adminLogin(
        username.trim(),
        password
      );

      /*
       * Backend may return token in different common shapes.
       */
      const token =
        response.token ||
        response.accessToken ||
        response.data?.token ||
        response.data?.accessToken;

      if (!token) {
        throw new Error(
          "Login successful but authentication token was not returned by the server."
        );
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem(
        "adminUser",
        response.user?.username ||
          response.user?.name ||
          username.trim()
      );

      navigate(from, {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
            <Building2
              size={30}
              className="text-slate-950"
            />
          </div>

          <h1 className="text-2xl font-bold text-white mt-5">
            Vindhayavasini Construction
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Admin Panel
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-7 sm:p-8">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-slate-900">
              Admin Login
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Sign in to manage your projects.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Admin username"
                  autoComplete="username"
                  className="w-full h-12 rounded-xl border border-slate-200 pl-11 pr-4 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Admin password"
                  autoComplete="current-password"
                  className="w-full h-12 rounded-xl border border-slate-200 pl-11 pr-12 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} Vindhayavasini Construction
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
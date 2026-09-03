// frontend/src/components/admin/AdminLogin.jsx

import { useState } from "react";
import { Lock, User, AlertCircle, Loader2 } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14110F] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Faint blueprint-grid backdrop — the signature admin motif */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#C9A258 1px, transparent 1px), linear-gradient(90deg, #C9A258 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.3em] text-[#A79C8C] uppercase mb-2">
            Vindhayavasini Construction
          </p>
          <h1 className="font-serif text-2xl text-[#F5F1E8]">Admin Panel</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1A17] border border-[#33291F] rounded-lg p-8 shadow-2xl"
        >
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A79C8C]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                autoComplete="username"
                className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 pl-10 pr-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A79C8C]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 pl-10 pr-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2 text-sm text-[#E8A87C] bg-[#2A1B14] border border-[#4A2E1E] rounded-md px-3 py-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#C9A258] hover:bg-[#D9B570] disabled:opacity-60 disabled:cursor-not-allowed text-[#14110F] font-semibold py-2.5 rounded-md transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";

import Home from "./pages/home";
import AdminPage from "./pages/AdminPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import JobsDashboard from "./components/admin/JobsDashboard";
import CareersPage from "./pages/CarrersPage";
import ContactPage from "./pages/ContactPage";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Admin panel — password-protected, handles its own auth internally.
          Nested routes render inside AdminLayout via <Outlet /> in AdminPage. */}
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<Navigate to="projects" replace />} />
        <Route path="projects" element={<AdminDashboard />} />
        <Route path="jobs" element={<JobsDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
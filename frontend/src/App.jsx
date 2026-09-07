// frontend/src/App.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import AboutPage from "./pages/AboutPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Stop browser from restoring previous scroll position
    window.history.scrollRestoration = "manual";

    // Reset normal browser scroll
    window.scrollTo(0, 0);

    // Reset Lenis scroll after it has initialized
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          immediate: true,
        });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Admin panel — password-protected, handles its own auth internally.
          Nested routes render inside AdminLayout via <Outlet /> in AdminPage. */}
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<Navigate to="projects" replace />} />
        <Route path="projects" element={<AdminDashboard />} />
        <Route path="jobs" element={<JobsDashboard />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
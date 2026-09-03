// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";

import Home from "./pages/home";
import AdminPage from "./pages/AdminPage";
import ProjectPage from "./pages/ProjectPage";

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

      {/* Admin panel — password-protected, handles its own auth internally */}
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
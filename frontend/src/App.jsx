// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";  
import AdminPage from "./pages/AdminPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
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
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProjectsList from "./admin/pages/ProjectsList";
import ProjectForm from "./admin/pages/ProjectForm";

import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";

const App = () => {
  return (
    <Routes>
      {/* =========================
          PUBLIC WEBSITE
      ========================== */}

      <Route path="/" element={<Home />} />

      {/* =========================
          ADMIN LOGIN
      ========================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* =========================
          PROTECTED ADMIN
      ========================== */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="projects"
            element={<ProjectsList />}
          />

          <Route
            path="projects/new"
            element={<ProjectForm />}
          />

          <Route
            path="projects/:id/edit"
            element={<ProjectForm />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
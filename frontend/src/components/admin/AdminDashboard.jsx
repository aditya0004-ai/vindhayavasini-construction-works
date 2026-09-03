// frontend/src/components/admin/AdminDashboard.jsx

import { useState, useEffect, useCallback } from "react";
import { Plus, Loader2 } from "lucide-react";
import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";
import * as adminApi from "../../lib/adminApi";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // view: "list" | "create" | { edit: project }
  const [view, setView] = useState("list");

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await adminApi.getAllProjectsAdmin();
      setProjects(result.data);
    } catch (err) {
      setError(err.message || "Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSaved = (savedProject) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p._id === savedProject._id);
      return exists
        ? prev.map((p) => (p._id === savedProject._id ? savedProject : p))
        : [...prev, savedProject];
    });
    setView("list");
  };

  const handleDeleted = (id) => {
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  if (typeof view === "object" && view.edit) {
    return <ProjectForm project={view.edit} onSaved={handleSaved} onCancel={() => setView("list")} />;
  }

  if (view === "create") {
    return <ProjectForm project={null} onSaved={handleSaved} onCancel={() => setView("list")} />;
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-[#F5F1E8] mb-1">Projects</h1>
          <p className="text-sm text-[#A79C8C]">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setView("create")}
          className="flex items-center gap-2 bg-[#C9A258] hover:bg-[#D9B570] text-[#14110F] font-semibold text-sm px-4 py-2.5 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-[#A79C8C]">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading projects...
        </div>
      ) : error ? (
        <div className="text-sm text-[#E8A87C] bg-[#2A1B14] border border-[#4A2E1E] rounded-md px-4 py-3">
          {error}
        </div>
      ) : (
        <ProjectsTable
          projects={projects}
          onEdit={(project) => setView({ edit: project })}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
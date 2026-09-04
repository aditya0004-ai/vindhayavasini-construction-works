// frontend/src/components/admin/JobsDashboard.jsx
import { useState, useEffect, useCallback } from "react";
import { Plus, Loader2 } from "lucide-react";
import JobsTable from "./JobsTable";
import JobForm from "./JobForm";
import * as adminApi from "../../lib/adminApi";

export default function JobsDashboard() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  // view: "list" | "create" | { edit: job }
  const [view, setView] = useState("list");

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await adminApi.getAllJobsAdmin();
      setJobs(result.data);
    } catch (err) {
      setError(err.message || "Failed to load jobs.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSaved = (savedJob) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j._id === savedJob._id);
      return exists ? prev.map((j) => (j._id === savedJob._id ? savedJob : j)) : [...prev, savedJob];
    });
    setView("list");
  };

  const handleDeleted = (id) => {
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  if (typeof view === "object" && view.edit) {
    return <JobForm job={view.edit} onSaved={handleSaved} onCancel={() => setView("list")} />;
  }

  if (view === "create") {
    return <JobForm job={null} onSaved={handleSaved} onCancel={() => setView("list")} />;
  }

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-[#F5F1E8] mb-1">Jobs</h1>
          <p className="text-sm text-[#A79C8C]">
            {jobs.length} opening{jobs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => setView("create")}
          className="flex items-center gap-2 bg-[#C9A258] hover:bg-[#D9B570] text-[#14110F] font-semibold text-sm px-4 py-2.5 rounded-md transition"
        >
          <Plus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 text-[#A79C8C]">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Loading jobs...
        </div>
      ) : error ? (
        <div className="text-sm text-[#E8A87C] bg-[#2A1B14] border border-[#4A2E1E] rounded-md px-4 py-3">
          {error}
        </div>
      ) : (
        <JobsTable jobs={jobs} onEdit={(job) => setView({ edit: job })} onDeleted={handleDeleted} />
      )}
    </div>
  );
}
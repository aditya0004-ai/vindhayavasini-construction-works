import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Clock3,
  FileEdit,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import Toast from "../components/Toast";
import { getAdminProjects } from "../lib/api";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminProjects();

      const list =
        response.projects ||
        response.data?.projects ||
        response.data ||
        [];

      setProjects(
        Array.isArray(list) ? list : []
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const published = projects.filter(
      (project) => project.published === true
    );

    const drafts = projects.filter(
      (project) => project.published !== true
    );

    const ongoing = projects.filter(
      (project) =>
        String(project.status).toLowerCase() ===
        "ongoing"
    );

    const upcoming = projects.filter(
      (project) =>
        String(project.status).toLowerCase() ===
        "upcoming"
    );

    const completed = projects.filter(
      (project) =>
        String(project.status).toLowerCase() ===
        "completed"
    );

    return {
      total: projects.length,
      published: published.length,
      drafts: drafts.length,
      ongoing: ongoing.length,
      upcoming: upcoming.length,
      completed: completed.length,
    };
  }, [projects]);

  return (
    <div className="p-5 sm:p-8">
      <Toast
        message={error}
        type="error"
        onClose={() => setError("")}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-slate-500">
            Welcome back
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage Vindhayavasini Construction projects.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800"
        >
          <Building2 size={17} />
          Add Project
        </Link>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            <StatCard
              title="Total Projects"
              value={stats.total}
              icon={<Building2 size={21} />}
            />

            <StatCard
              title="Published"
              value={stats.published}
              icon={<CheckCircle2 size={21} />}
            />

            <StatCard
              title="Drafts"
              value={stats.drafts}
              icon={<FileEdit size={21} />}
            />

            <StatCard
              title="Ongoing"
              value={stats.ongoing}
              icon={<Clock3 size={21} />}
            />

            <StatCard
              title="Upcoming"
              value={stats.upcoming}
              icon={<Clock3 size={21} />}
            />

            <StatCard
              title="Completed"
              value={stats.completed}
              icon={<CheckCircle2 size={21} />}
            />
          </div>

          <div className="mt-8 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="px-5 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Projects
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Your latest project entries
                </p>
              </div>

              <Link
                to="/admin/projects"
                className="text-sm font-semibold text-slate-900 flex items-center gap-1"
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            {projects.length === 0 ? (
              <div className="py-16 text-center">
                <Building2
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="text-slate-500 mt-3">
                  No projects found.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {projects.slice(0, 5).map((project) => (
                  <div
                    key={project._id}
                    className="px-5 sm:px-6 py-4 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      {project.mainImage?.url ? (
                        <img
                          src={project.mainImage.url}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Building2
                          size={20}
                          className="m-auto mt-4 text-slate-300"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 truncate">
                        {project.name}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {project.location || "No location"}
                      </p>
                    </div>

                    <span
                      className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        project.published
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {project.published
                        ? "Published"
                        : "Draft"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Building2,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getAdminProjects,
  deleteProject,
} from "../lib/api";
import Toast from "../components/Toast";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [published, setPublished] = useState("all");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !query ||
        project.name
          ?.toLowerCase()
          .includes(query) ||
        project.location
          ?.toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "all" ||
        project.status?.toLowerCase() ===
          status.toLowerCase();

      const matchesPublished =
        published === "all" ||
        (published === "published" &&
          project.published === true) ||
        (published === "draft" &&
          project.published !== true);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPublished
      );
    });
  }, [
    projects,
    search,
    status,
    published,
  ]);

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeleting(project._id);
      setError("");

      await deleteProject(project._id);

      setProjects((current) =>
        current.filter(
          (item) => item._id !== project._id
        )
      );

      setSuccess(
        "Project deleted successfully."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete project."
      );
    } finally {
      setDeleting(null);
    }
  };

  const statusBadge = (value) => {
    const normalized =
      String(value || "").toLowerCase();

    if (normalized === "ongoing") {
      return "bg-blue-50 text-blue-700";
    }

    if (normalized === "completed") {
      return "bg-green-50 text-green-700";
    }

    if (normalized === "upcoming") {
      return "bg-amber-50 text-amber-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="p-5 sm:p-8">
      <Toast
        message={error || success}
        type={error ? "error" : "success"}
        onClose={() => {
          setError("");
          setSuccess("");
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Projects
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all construction projects.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white px-5 py-3 rounded-xl font-semibold text-sm"
        >
          <Plus size={18} />
          Add Project
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search project..."
              className="w-full h-11 border border-slate-200 rounded-xl pl-11 pr-4 outline-none focus:border-slate-900"
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="h-11 border border-slate-200 rounded-xl px-4 bg-white outline-none"
          >
            <option value="all">
              All Status
            </option>
            <option value="upcoming">
              Upcoming
            </option>
            <option value="ongoing">
              Ongoing
            </option>
            <option value="completed">
              Completed
            </option>
          </select>

          <select
            value={published}
            onChange={(e) =>
              setPublished(e.target.value)
            }
            className="h-11 border border-slate-200 rounded-xl px-4 bg-white outline-none"
          >
            <option value="all">
              All Projects
            </option>
            <option value="published">
              Published
            </option>
            <option value="draft">
              Draft
            </option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl py-20 text-center">
          <Building2
            size={40}
            className="mx-auto text-slate-300"
          />

          <h3 className="font-semibold text-slate-800 mt-4">
            No projects found
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Try changing your filters or create a new project.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-slate-500">
                    Project
                  </th>

                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-slate-500">
                    Location
                  </th>

                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="text-left px-5 py-4 text-xs uppercase tracking-wider text-slate-500">
                    Visibility
                  </th>

                  <th className="text-right px-5 py-4 text-xs uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map(
                  (project) => (
                    <tr key={project._id}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                            {project.mainImage
                              ?.url ? (
                              <img
                                src={
                                  project.mainImage.url
                                }
                                alt={
                                  project.name
                                }
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Building2
                                size={20}
                                className="mx-auto mt-4 text-slate-300"
                              />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {project.name}
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                              Order:{" "}
                              {project.displayOrder ??
                                0}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {project.location ||
                          "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(
                            project.status
                          )}`}
                        >
                          {project.status ||
                            "Unknown"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            project.published
                              ? "bg-green-50 text-green-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {project.published
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/projects/${project._id}/edit`}
                            className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </Link>

                          {project.published &&
                            project.slug && (
                              <a
                                href={`/projects/${project.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                                title="View"
                              >
                                <ExternalLink
                                  size={16}
                                />
                              </a>
                            )}

                          <button
                            onClick={() =>
                              handleDelete(
                                project
                              )
                            }
                            disabled={
                              deleting ===
                              project._id
                            }
                            className="w-9 h-9 rounded-lg border border-red-200 flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-50"
                            title="Delete"
                          >
                            {deleting ===
                            project._id ? (
                              <span className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                            ) : (
                              <Trash2
                                size={16}
                              />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
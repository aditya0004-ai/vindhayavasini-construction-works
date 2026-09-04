// frontend/src/components/admin/ProjectsTable.jsx

import { useState } from "react";
import { Pencil, Trash2, MapPin, EyeOff } from "lucide-react";
import StatusBadge from "./StatusBadge";
import CategoryBadge from "./CategoryBadge";
import ConfirmDialog from "./ConfirmDialog";
import * as adminApi from "../../lib/adminApi";

export default function ProjectsTable({ projects, onEdit, onDeleted }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setError("");
    try {
      await adminApi.deleteProject(deleteTarget._id);
      onDeleted(deleteTarget._id);
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || "Failed to delete project.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="border border-dashed border-[#33291F] rounded-lg py-16 text-center">
        <p className="text-[#A79C8C]">No projects yet.</p>
        <p className="text-sm text-[#6B5F51] mt-1">Click "Add Project" to create your first one.</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 text-sm text-[#E8A87C] bg-[#2A1B14] border border-[#4A2E1E] rounded-md px-3 py-2.5">
          {error}
        </div>
      )}

      <div className="border border-[#33291F] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1A1613] border-b border-[#33291F] text-left">
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Project</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Status</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Category</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Location</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Updated</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-b border-[#33291F] last:border-b-0 hover:bg-[#1A1613]/60 transition"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-md overflow-hidden bg-[#262019] flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image?.url}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#F5F1E8] font-medium">{project.name}</span>
                        {!project.isPublished && (
                          <span title="Not visible on live site">
                            <EyeOff className="w-3.5 h-3.5 text-[#6B5F51]" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-5 py-3">
                  <CategoryBadge category={project.category} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-[#A79C8C]">
                    <MapPin className="w-3.5 h-3.5" />
                    {project.location}
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-[#6B5F51]">
                  {new Date(project.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(project)}
                      className="p-2 rounded-md text-[#A79C8C] hover:text-[#C9A258] hover:bg-[#262019] transition"
                      aria-label={`Edit ${project.name}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(project)}
                      className="p-2 rounded-md text-[#A79C8C] hover:text-[#E8A87C] hover:bg-[#262019] transition"
                      aria-label={`Delete ${project.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this project?"
        message={`"${deleteTarget?.name}" and all its images will be permanently removed. This can't be undone.`}
        isConfirming={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
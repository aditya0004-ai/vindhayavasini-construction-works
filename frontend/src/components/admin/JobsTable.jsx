// frontend/src/components/admin/JobsTable.jsx
import { useState } from "react";
import { Pencil, Trash2, MapPin, EyeOff, Briefcase } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
import * as adminApi from "../../lib/adminApi";

export default function JobsTable({ jobs, onEdit, onDeleted }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setError("");
    try {
      await adminApi.deleteJob(deleteTarget._id);
      onDeleted(deleteTarget._id);
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || "Failed to delete job.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (jobs.length === 0) {
    return (
      <div className="border border-dashed border-[#33291F] rounded-lg py-16 text-center">
        <p className="text-[#A79C8C]">No job openings yet.</p>
        <p className="text-sm text-[#6B5F51] mt-1">Click "Add Job" to post your first opening.</p>
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
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Role</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Type</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Location</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide">Updated</th>
              <th className="px-5 py-3 text-xs font-medium text-[#A79C8C] uppercase tracking-wide text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-b border-[#33291F] last:border-b-0 hover:bg-[#1A1613]/60 transition"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#262019] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-[#C9A258]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#F5F1E8] font-medium">{job.title}</span>
                        {!job.isPublished && (
                          <span title="Not visible on careers page">
                            <EyeOff className="w-3.5 h-3.5 text-[#6B5F51]" />
                          </span>
                        )}
                      </div>
                      {job.department && (
                        <span className="text-xs text-[#6B5F51]">{job.department}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-[#C9A258]/15 text-[#C9A258] border-[#C9A258]/30">
                    {job.type}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-[#A79C8C]">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-[#6B5F51]">
                  {new Date(job.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(job)}
                      className="p-2 rounded-md text-[#A79C8C] hover:text-[#C9A258] hover:bg-[#262019] transition"
                      aria-label={`Edit ${job.title}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(job)}
                      className="p-2 rounded-md text-[#A79C8C] hover:text-[#E8A87C] hover:bg-[#262019] transition"
                      aria-label={`Delete ${job.title}`}
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
        title="Delete this job posting?"
        message={`"${deleteTarget?.title}" will be permanently removed. This can't be undone.`}
        isConfirming={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
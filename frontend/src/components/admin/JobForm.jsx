// frontend/src/components/admin/JobForm.jsx
import { useState } from "react";
import { X, Loader2, ArrowLeft } from "lucide-react";
import HighlightsInput from "./HighlightsInput";
import * as adminApi from "../../lib/adminApi";

const TYPE_OPTIONS = ["Full-time", "Part-time", "Contract", "Internship"];

// job: existing job object when editing, null when creating
export default function JobForm({ job, onSaved, onCancel }) {
  const isEditing = Boolean(job);

  const [title, setTitle] = useState(job?.title || "");
  const [department, setDepartment] = useState(job?.department || "");
  const [location, setLocation] = useState(job?.location || "");
  const [type, setType] = useState(job?.type || "Full-time");
  const [experience, setExperience] = useState(job?.experience || "");
  const [roleOverview, setRoleOverview] = useState(job?.roleOverview || "");
  const [responsibilities, setResponsibilities] = useState(job?.responsibilities || []);
  const [requirements, setRequirements] = useState(job?.requirements || []);
  const [order, setOrder] = useState(job?.order ?? 0);
  const [isPublished, setIsPublished] = useState(job?.isPublished ?? true);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      const payload = {
        title,
        department: department || null,
        location,
        type,
        experience: experience || null,
        roleOverview,
        responsibilities,
        requirements,
        order: Number(order) || 0,
        isPublished,
      };

      const result = isEditing
        ? await adminApi.updateJob(job._id, payload)
        : await adminApi.createJob(payload);

      onSaved(result.data);
    } catch (err) {
      setError(err.message || "Failed to save job.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-8">
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm text-[#A79C8C] hover:text-[#F5F1E8] transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to jobs
      </button>

      <h1 className="font-serif text-2xl text-[#F5F1E8] mb-1">
        {isEditing ? "Edit Job" : "Add New Job"}
      </h1>
      <p className="text-sm text-[#A79C8C] mb-8">
        {isEditing ? `Editing "${job.title}"` : "Fill in the details below to publish a new opening."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Job Title <span className="text-[#C9A258]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="e.g. Site Supervisor"
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Department <span className="text-[#6B5F51] normal-case">(optional)</span>
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Site Engineering"
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Location <span className="text-[#C9A258]">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g. Lucknow, Uttar Pradesh"
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Job Type <span className="text-[#C9A258]">*</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            >
              {TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Experience <span className="text-[#6B5F51] normal-case">(optional)</span>
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g. 2-4 years"
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
            Role Overview <span className="text-[#C9A258]">*</span>
          </label>
          <textarea
            value={roleOverview}
            onChange={(e) => setRoleOverview(e.target.value)}
            required
            rows={4}
            placeholder="A short summary of what this role involves..."
            className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
            Responsibilities
          </label>
          <HighlightsInput
            value={responsibilities}
            onChange={setResponsibilities}
            placeholder="e.g. Supervise daily site operations..."
            emptyText="No responsibilities added yet."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
            Requirements
          </label>
          <HighlightsInput
            value={requirements}
            onChange={setRequirements}
            placeholder="e.g. Diploma in Civil Engineering..."
            emptyText="No requirements added yet."
          />
        </div>

        <div className="grid grid-cols-2 gap-5 items-end">
          <div>
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Display Order
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
            <p className="text-xs text-[#6B5F51] mt-1.5">Lower numbers appear first.</p>
          </div>

          <label className="flex items-center gap-2.5 pb-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 rounded accent-[#C9A258]"
            />
            <span className="text-sm text-[#F5F1E8]">
              Published <span className="text-[#6B5F51]">— visible on the careers page</span>
            </span>
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-[#E8A87C] bg-[#2A1B14] border border-[#4A2E1E] rounded-md px-3 py-2.5">
            <X className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-[#33291F]">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm rounded-md text-[#A79C8C] hover:text-[#F5F1E8] hover:bg-[#262019] transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 text-sm rounded-md bg-[#C9A258] hover:bg-[#D9B570] disabled:opacity-60 text-[#14110F] font-semibold transition flex items-center gap-2"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEditing ? "Save Changes" : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
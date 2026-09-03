// frontend/src/components/admin/ProjectForm.jsx

import { useState } from "react";
import { X, Loader2, ArrowLeft } from "lucide-react";
import HighlightsInput from "./HighlightsInput";
import ImageUploadField from "./ImageUploadField";
import GalleryUploadField from "./GalleryUploadField";
import * as adminApi from "../../lib/adminApi";

const STATUS_OPTIONS = ["Upcoming", "Ongoing", "Completed"];

// project: existing project object when editing, null when creating
export default function ProjectForm({ project, onSaved, onCancel }) {
  const isEditing = Boolean(project);

  const [name, setName] = useState(project?.name || "");
  const [status, setStatus] = useState(project?.status || "Ongoing");
  const [location, setLocation] = useState(project?.location || "");
  const [overview, setOverview] = useState(project?.overview || "");
  const [highlights, setHighlights] = useState(project?.highlights || []);
  const [order, setOrder] = useState(project?.order ?? 0);
  const [isPublished, setIsPublished] = useState(project?.isPublished ?? true);

  const [imageFile, setImageFile] = useState(null);
  const [layoutPlanFile, setLayoutPlanFile] = useState(null);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState(project?.gallery || []);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleRemoveExistingGalleryImage = async (publicId) => {
    // Existing images are already persisted, so remove them immediately via the API
    if (!isEditing) return;
    try {
      await adminApi.deleteGalleryImage(project._id, publicId);
      setExistingGallery((prev) => prev.filter((img) => img.publicId !== publicId));
    } catch (err) {
      setError(err.message || "Failed to remove gallery image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isEditing && !imageFile) {
      setError("A main project image is required.");
      return;
    }

    setIsSaving(true);
    try {
      const formData = adminApi.buildProjectFormData({
        name,
        status,
        location,
        overview,
        highlights,
        order,
        isPublished,
        imageFile,
        layoutPlanFile,
        galleryFiles: newGalleryFiles,
      });

      const result = isEditing
        ? await adminApi.updateProject(project._id, formData)
        : await adminApi.createProject(formData);

      onSaved(result.data);
    } catch (err) {
      setError(err.message || "Failed to save project.");
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
        Back to projects
      </button>

      <h1 className="font-serif text-2xl text-[#F5F1E8] mb-1">
        {isEditing ? "Edit Project" : "Add New Project"}
      </h1>
      <p className="text-sm text-[#A79C8C] mb-8">
        {isEditing ? `Editing "${project.name}"` : "Fill in the details below to publish a new project."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Project Name <span className="text-[#C9A258]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Sunbreeze III"
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
              Status <span className="text-[#C9A258]">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
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
              placeholder="e.g. Sitapur Road, Lucknow"
              className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
            Overview <span className="text-[#C9A258]">*</span>
          </label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            required
            rows={4}
            placeholder="A short description of the project..."
            className="w-full bg-[#262019] border border-[#33291F] rounded-md py-2.5 px-3 text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
            Highlights
          </label>
          <HighlightsInput value={highlights} onChange={setHighlights} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ImageUploadField
            label="Main Image"
            required={!isEditing}
            existingUrl={project?.image?.url}
            file={imageFile}
            onChange={setImageFile}
            helpText={isEditing ? "Leave blank to keep the current image." : "Shown on project cards."}
          />
          <ImageUploadField
            label="Layout Plan"
            existingUrl={project?.layoutPlan?.url}
            accept="image/jpeg,image/png,image/webp,application/pdf"
            file={layoutPlanFile}
            onChange={setLayoutPlanFile}
            helpText="Optional. Image or PDF."
          />
        </div>

        <GalleryUploadField
          existingImages={existingGallery}
          newFiles={newGalleryFiles}
          onAddFiles={(files) => setNewGalleryFiles((prev) => [...prev, ...files])}
          onRemoveExisting={handleRemoveExistingGalleryImage}
          onRemoveNewFile={(index) => setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index))}
        />

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
              Published <span className="text-[#6B5F51]">— visible on the live site</span>
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
            {isEditing ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
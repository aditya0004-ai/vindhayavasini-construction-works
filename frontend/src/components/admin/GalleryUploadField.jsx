// frontend/src/components/admin/GalleryUploadField.jsx

import { useRef } from "react";
import { Plus, X } from "lucide-react";

// existingImages: [{ url, publicId }] already saved on the project
// newFiles: File[] queued to upload on next save
export default function GalleryUploadField({
  existingImages = [],
  newFiles = [],
  onAddFiles,
  onRemoveExisting,
  onRemoveNewFile,
}) {
  const inputRef = useRef(null);

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length) onAddFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
        Gallery Images
      </label>

      <div className="flex flex-wrap gap-3">
        {existingImages.map((img) => (
          <div key={img.publicId} className="relative w-20 h-20 rounded-md overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onRemoveExisting(img.publicId)}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        {newFiles.map((file, index) => (
          <div key={`${file.name}-${index}`} className="relative w-20 h-20 rounded-md overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-0.5 left-0.5 bg-[#C9A258] text-[#14110F] text-[9px] font-semibold px-1.5 py-0.5 rounded">
              NEW
            </div>
            <button
              type="button"
              onClick={() => onRemoveNewFile(index)}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
              aria-label="Remove image"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-20 h-20 rounded-md border border-dashed border-[#33291F] hover:border-[#C9A258]/50 flex items-center justify-center text-[#6B5F51] hover:text-[#C9A258] transition"
        >
          <Plus className="w-5 h-5" />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />
      </div>
      <p className="text-xs text-[#6B5F51] mt-2">Optional. Up to 10 images.</p>
    </div>
  );
}
import { useRef } from "react";
import { Plus, X, FileText } from "lucide-react";

export default function MultiFileUploadField({
  label,
  helpText,
  max = 10,
  accept = "image/jpeg,image/png,image/webp",
  existingFiles = [],
  newFiles = [],
  onAddFiles,
  onRemoveExisting,
  onRemoveNewFile,
}) {
  const inputRef = useRef(null);

  const totalCount = existingFiles.length + newFiles.length;
  const remaining = Math.max(0, max - totalCount);

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []).slice(0, remaining);

    if (files.length) {
      onAddFiles(files);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
        {label}
      </label>

      <div className="flex flex-wrap gap-3">

        {/* Existing Files */}
        {existingFiles.map((img) => (
          <div
            key={img.publicId}
            className="relative w-20 h-20 rounded-md overflow-visible bg-[#262019]"
          >
            <div className="w-full h-full rounded-md overflow-hidden">
              {img.url?.endsWith(".pdf") ? (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#A79C8C]" />
                </div>
              ) : (
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Always visible remove button */}
            <button
              type="button"
              onClick={() => onRemoveExisting(img.publicId)}
              className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-[#E8A87C] hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition"
              aria-label="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* New Files */}
        {newFiles.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="relative w-20 h-20 rounded-md overflow-visible bg-[#262019]"
          >
            <div className="w-full h-full rounded-md overflow-hidden">
              {file.type === "application/pdf" ? (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#A79C8C]" />
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="absolute top-1 left-1 z-10 bg-[#C9A258] text-[#14110F] text-[9px] font-semibold px-1.5 py-0.5 rounded">
              NEW
            </div>

            {/* Always visible remove button */}
            <button
              type="button"
              onClick={() => onRemoveNewFile(index)}
              className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-[#E8A87C] hover:bg-red-500 text-white flex items-center justify-center shadow-lg transition"
              aria-label="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}

        {/* Add Files */}
        {remaining > 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 rounded-md border border-dashed border-[#33291F] hover:border-[#C9A258]/50 flex items-center justify-center text-[#6B5F51] hover:text-[#C9A258] transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />
      </div>

      <p className="text-xs text-[#6B5F51] mt-2">
        {helpText || `Optional. Up to ${max}.`} ({totalCount}/{max} used)
      </p>
    </div>
  );
}
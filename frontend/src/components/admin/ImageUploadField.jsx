import { useRef, useState, useEffect } from "react";
import { Upload, X, FileText } from "lucide-react";

export default function ImageUploadField({
  label,
  required = false,
  existingUrl = null,
  accept = "image/jpeg,image/png,image/webp",
  file,
  onChange,
  helpText,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(existingUrl);
  const [removedExisting, setRemovedExisting] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(removedExisting ? null : existingUrl);
      return;
    }

    if (file.type === "application/pdf") {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file, existingUrl, removedExisting]);

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setRemovedExisting(false);
      onChange(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const dropped = e.dataTransfer.files?.[0];

    if (dropped) {
      setRemovedExisting(false);
      onChange(dropped);
    }
  };

  const clearFile = () => {
    setRemovedExisting(true);
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const isPdf = file?.type === "application/pdf";

  return (
    <div>
      <label className="block text-xs font-medium text-[#A79C8C] mb-2 uppercase tracking-wide">
        {label} {required && <span className="text-[#C9A258]">*</span>}
      </label>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="relative border border-dashed border-[#33291F] rounded-md bg-[#262019] hover:border-[#C9A258]/50 transition cursor-pointer overflow-hidden"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="relative h-40">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {/* Always visible cross icon */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 hover:bg-[#E8A87C] flex items-center justify-center text-white transition shadow-lg"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : isPdf ? (
          <div className="h-40 flex flex-col items-center justify-center gap-2 text-[#A79C8C]">
            <FileText className="w-8 h-8" />

            <span className="text-xs">{file.name}</span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/80 hover:bg-[#E8A87C] flex items-center justify-center text-white transition shadow-lg"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="h-40 flex flex-col items-center justify-center gap-2 text-[#6B5F51]">
            <Upload className="w-6 h-6" />
            <span className="text-xs">
              Click or drag an image here
            </span>
          </div>
        )}
      </div>

      {helpText && (
        <p className="text-xs text-[#6B5F51] mt-1.5">
          {helpText}
        </p>
      )}
    </div>
  );
}
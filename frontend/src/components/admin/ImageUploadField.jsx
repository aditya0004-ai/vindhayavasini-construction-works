// frontend/src/components/admin/ImageUploadField.jsx

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

  useEffect(() => {
    if (!file) {
      setPreview(existingUrl);
      return;
    }
    if (file.type === "application/pdf") {
      setPreview(null); // no image preview for PDFs
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, existingUrl]);

  const handleFileSelect = (e) => {
    const selected = e.target.files?.[0];
    if (selected) onChange(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onChange(dropped);
  };

  const clearFile = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition"
              aria-label="Remove file"
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
              className="text-xs text-[#E8A87C] hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="h-40 flex flex-col items-center justify-center gap-2 text-[#6B5F51]">
            <Upload className="w-6 h-6" />
            <span className="text-xs">Click or drag a file here</span>
          </div>
        )}
      </div>

      {helpText && <p className="text-xs text-[#6B5F51] mt-1.5">{helpText}</p>}
    </div>
  );
}
// frontend/src/components/admin/ConfirmDialog.jsx

import { AlertTriangle, Loader2 } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  isConfirming = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
      <div className="relative bg-[#1E1A17] border border-[#33291F] rounded-lg p-6 max-w-sm w-full shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#4A2E1E] flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-[#E8A87C]" />
          </div>
          <div>
            <h3 className="text-[#F5F1E8] font-medium mb-1">{title}</h3>
            <p className="text-sm text-[#A79C8C]">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onCancel}
            disabled={isConfirming}
            className="px-4 py-2 text-sm rounded-md text-[#A79C8C] hover:text-[#F5F1E8] hover:bg-[#262019] transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className="px-4 py-2 text-sm rounded-md bg-[#B04A3B] hover:bg-[#C25A4A] text-white transition disabled:opacity-60 flex items-center gap-2"
          >
            {isConfirming && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
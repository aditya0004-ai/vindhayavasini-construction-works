// frontend/src/components/admin/HighlightsInput.jsx

import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function HighlightsInput({ value = [], onChange }) {
  const [draft, setDraft] = useState("");

  const addHighlight = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft("");
  };

  const removeHighlight = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addHighlight();
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. RERA approved, Clubhouse, 24x7 security..."
          className="flex-1 bg-[#262019] border border-[#33291F] rounded-md py-2 px-3 text-sm text-[#F5F1E8] placeholder:text-[#6B5F51] focus:outline-none focus:ring-1 focus:ring-[#C9A258] focus:border-[#C9A258] transition"
        />
        <button
          type="button"
          onClick={addHighlight}
          className="px-3 rounded-md bg-[#262019] border border-[#33291F] text-[#C9A258] hover:bg-[#2E2620] transition flex items-center gap-1.5 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-xs text-[#6B5F51] italic">No highlights added yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {value.map((highlight, index) => (
            <li
              key={`${highlight}-${index}`}
              className="flex items-center gap-1.5 bg-[#262019] border border-[#33291F] rounded-full pl-3 pr-2 py-1 text-sm text-[#F5F1E8]"
            >
              {highlight}
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="text-[#A79C8C] hover:text-[#E8A87C] transition"
                aria-label={`Remove ${highlight}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
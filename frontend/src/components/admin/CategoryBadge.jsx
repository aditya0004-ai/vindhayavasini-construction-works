// frontend/src/components/admin/CategoryBadge.jsx
export default function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-[#33291F]/40 text-[#D8CBB8] border-[#33291F]">
      {category}
    </span>
  );
}
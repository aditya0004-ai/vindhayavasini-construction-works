// frontend/src/components/admin/StatusBadge.jsx
const STATUS_STYLES = {
  Ongoing: "bg-[#C9A258]/15 text-[#C9A258] border-[#C9A258]/30",
  Completed: "bg-[#6B9080]/15 text-[#8FB5A5] border-[#6B9080]/30",
  Upcoming: "bg-[#7C93A8]/15 text-[#9DB2C4] border-[#7C93A8]/30",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Ongoing;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${style}`}
    >
      {status}
    </span>
  );
}
const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div
        className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${
          isError
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-white border-slate-200 text-slate-800"
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isError ? "bg-red-500" : "bg-green-500"
          }`}
        />

        <span className="text-sm font-medium">{message}</span>

        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-slate-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
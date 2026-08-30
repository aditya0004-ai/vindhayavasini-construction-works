const StatCard = ({
  title,
  value,
  icon,
  description,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h3>

          {description && (
            <p className="text-xs text-slate-400 mt-2">
              {description}
            </p>
          )}
        </div>

        <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
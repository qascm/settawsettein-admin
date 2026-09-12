export default function SummaryCard({
  label,
  value,
  suffix,
  trend,
  accent = "default",
}) {
  const accentClasses = {
    default: "",
    success: "text-green-400",
    warning: "text-yellow-400",
    primary: "text-purple-400",
    cold: "text-blue-400",
  };

  return (
    <div
      className="
        bg-[var(--surface)]
        border border-[var(--border)]
        rounded-2xl
        p-5
        min-h-[130px]
        flex
        flex-col
        justify-between
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          {label}
        </p>

        <span
          className={`text-xs ${accentClasses[accent]}`}
        >
          ●
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <p className="text-[27px] font-light leading-none">
            {value}
          </p>

          {suffix && (
            <span className="text-sm text-[var(--muted)]">
              {suffix}
            </span>
          )}
        </div>

        {trend && (
          <p className="text-[10px] text-green-400 mt-2">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}
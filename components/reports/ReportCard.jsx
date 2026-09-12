export default function ReportCard({ report }) {
  return (
    <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
      <p className="text-xs text-[var(--muted)]">
        {report.title}
      </p>

      <p className="text-xl font-semibold mt-2">
        {report.value}
      </p>

      <p className="text-xs text-[var(--muted)] mt-1">
        {report.subtitle}
      </p>
    </div>
  );
}
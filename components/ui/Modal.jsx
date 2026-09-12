export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <div
        className="
          relative
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          bg-[var(--surface)]
          border-t
          border-[var(--border)]
          rounded-t-2xl
          p-5
        "
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-[var(--surface-light)] text-xl"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
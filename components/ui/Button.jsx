export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-[var(--primary)] text-white active:opacity-80",
    secondary:
      "bg-[var(--surface-light)] text-[var(--foreground)] border border-[var(--border)] active:opacity-80",
    danger:
      "bg-[var(--danger)] text-white active:opacity-80",
    ghost:
      "bg-transparent text-[var(--foreground)] active:bg-[var(--surface-light)]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        min-h-11
        px-4
        rounded-lg
        font-medium
        transition-opacity
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
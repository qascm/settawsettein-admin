export default function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default:
      "bg-[var(--surface-light)] text-[var(--foreground)]",
    success:
      "bg-green-500/10 text-green-400",
    warning:
      "bg-yellow-500/10 text-yellow-400",
    danger:
      "bg-red-500/10 text-red-400",
    primary:
      "bg-purple-500/10 text-purple-400",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        rounded-full
        text-xs
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}
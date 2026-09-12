export default function Input({
  label,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}

        {required && (
          <span className="text-red-400 ml-1">*</span>
        )}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          min-h-11
          bg-[var(--surface-light)]
          border border-[var(--border)]
          rounded-lg
          px-4
          outline-none
          focus:border-[var(--primary)]
          placeholder:text-[var(--muted)]
        "
      />
    </div>
  );
}
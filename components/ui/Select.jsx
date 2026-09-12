export default function Select({
  label,
  required = false,
  value,
  onChange,
  options = [],
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

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          min-h-11
          bg-[var(--surface-light)]
          border border-[var(--border)]
          rounded-lg
          px-4
          outline-none
          focus:border-[var(--primary)]
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
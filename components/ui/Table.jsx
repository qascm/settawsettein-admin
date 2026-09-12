export default function Table({
  headers = [],
  children,
}) {
  return (
    <div className="w-full overflow-x-auto border border-[var(--border)] rounded-xl">
      <table className="w-full text-sm">
        <thead className="bg-[var(--surface-light)]">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="text-left px-4 py-3 font-medium text-[var(--muted)] whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
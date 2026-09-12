"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const titles = {
    "/dashboard": "Dashboard",
    "/orders": "Orders",
    "/expenses": "Expenses",
    "/reports": "Reports",
    "/settings": "Settings",
  };

  const title =
    Object.keys(titles).find((path) =>
      pathname.startsWith(path)
    ) || "66 Admin";

  return (
    <header className="sticky top-0 z-40 h-16 bg-[var(--background)] border-b border-[var(--border)]">
      <div className="h-full px-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--muted)]">
            66 Admin
          </p>

          <h1 className="text-base font-semibold">
            {title}
          </h1>
        </div>

        <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
          <span className="text-sm font-bold text-white">
            66
          </span>
        </div>
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Orders",
    href: "/orders",
    icon: "▤",
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: "−",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "◒",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <div className="max-w-md mx-auto h-16 rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-2 flex items-center justify-between shadow-xl">
        {navigation.map((item) => {
          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 h-full flex flex-col items-center justify-center gap-1 rounded-xl transition ${
                active
                  ? "text-white bg-[var(--primary)]"
                  : "text-[var(--muted)]"
              }`}
            >
              <span className="text-lg leading-none">
                {item.icon}
              </span>

              <span className="text-[10px] font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
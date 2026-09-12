"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  ShoppingBag,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Home",
    href: "/dashboard",
    icon: House,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ShoppingBag,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const activeIndex = navigation.findIndex(
    (item) =>
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <div
        className="
          relative
          max-w-md
          mx-auto
          h-20
          rounded-2xl
          bg-[var(--surface)]
          border border-[var(--border)]
          px-2
          flex
          items-center
          justify-between
          shadow-xl
        "
      >
        {/* Sliding active background */}
        <div
          className="
            absolute
            top-0
            bottom-0
            left-2
            rounded-2xl
            bg-[var(--primary)]
            transition-transform
            duration-300
            ease-out
          "
          style={{
            width: "calc((100% - 1rem) / 5)",
            transform: `translateX(${Math.max(
              activeIndex,
              0
            ) * 100}%)`,
          }}
        />

        {navigation.map((item, index) => {
          const active = activeIndex === index;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative
                z-10
                flex-1
                h-full
                flex
                flex-col
                items-center
                justify-center
                gap-1
                rounded-xl
                transition-all
                duration-200
                ease-out
                active:scale-95
                ${
                  active
                    ? "text-white"
                    : "text-[var(--muted)] hover:text-white"
                }
              `}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                className={`
                  transition-all
                  duration-300
                  ease-out
                  ${
                    active
                      ? "scale-105 -translate-y-0.5"
                      : "scale-100"
                  }
                `}
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  transition-all
                  duration-300
                "
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
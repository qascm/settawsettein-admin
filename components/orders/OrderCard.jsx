"use client";

import { useRouter } from "next/navigation";

const statusStyles = {
  Completed: "bg-green-500/10 text-green-400",
  Shipped: "bg-blue-500/10 text-blue-400",
  Preparing: "bg-purple-500/10 text-purple-400",
  Confirmed: "bg-cyan-500/10 text-cyan-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Cancelled: "bg-red-500/10 text-red-400",
};

export default function OrderCard({ order }) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(
          `/orders/${order.id.replace("#", "")}`
        )
      }
      className="w-full text-left p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] active:scale-[0.99] transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {order.id}
          </p>

          <p className="text-sm mt-1 truncate">
            {order.customer}
          </p>
        </div>

        <span
          className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
            statusStyles[order.status] ||
            "bg-white/10 text-white"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-[var(--muted)] line-clamp-2">
          {order.products}
        </p>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs text-[var(--muted)]">
            {order.date}
          </p>

          <p className="text-xs text-[var(--muted)] mt-1">
            {order.payment}
          </p>
        </div>

        <p className="text-lg font-semibold whitespace-nowrap">
          {order.total.toLocaleString()} EGP
        </p>
      </div>
    </button>
  );
}
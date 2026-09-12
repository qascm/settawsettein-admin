"use client";

import { useRouter } from "next/navigation";

export default function ActionButtons() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <button
        onClick={() => router.push("/orders/new")}
        className="h-14 rounded-2xl bg-[var(--primary)] text-white text-sm font-medium active:scale-[0.98] transition"
      >
        + Add Order
      </button>

      <button
        onClick={() => router.push("/expenses/new")}
        className="h-14 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-sm font-medium active:scale-[0.98] transition"
      >
        + Add Expense
      </button>
    </div>
  );
}
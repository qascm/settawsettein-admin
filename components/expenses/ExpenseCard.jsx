"use client";

import { useRouter } from "next/navigation";

export default function ExpenseCard({ expense }) {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(`/expenses/${expense.id.replace("#EXP", "")}`)
      }
      className="w-full text-left p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] active:scale-[0.99] transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{expense.id}</p>

          <p className="text-sm mt-1">
            {expense.description}
          </p>
        </div>

        <p className="text-lg font-semibold whitespace-nowrap">
          {expense.amount.toLocaleString()} EGP
        </p>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs text-[var(--muted)]">
            {expense.date}
          </p>

          <p className="text-xs text-[var(--muted)] mt-1">
            {expense.category}
          </p>
        </div>

        <p className="text-xs text-[var(--muted)]">
          {expense.paymentMethod}
        </p>
      </div>
    </button>
  );
}
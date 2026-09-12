"use client";

import { useRouter } from "next/navigation";

export default function ExpenseActions({ expenseId }) {
  const router = useRouter();

  const id = expenseId.replace("#EXP", "");

  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={() => router.push(`/expenses/${id}/edit`)}
        className="flex-1 h-12 rounded-xl bg-[var(--primary)] text-white text-sm font-medium"
      >
        Edit Expense
      </button>

      <button
        onClick={() => router.back()}
        className="flex-1 h-12 rounded-xl border border-[var(--border)] text-sm font-medium"
      >
        Back
      </button>
    </div>
  );
}
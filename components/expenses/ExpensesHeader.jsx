"use client";

import { useRouter } from "next/navigation";

export default function ExpensesHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold">Expenses</h1>

        <p className="text-sm text-[var(--muted)] mt-1">
          Track your business expenses
        </p>
      </div>

      <button
        onClick={() => router.push("/expenses/new")}
        className="h-11 px-4 rounded-xl bg-[var(--primary)] text-white text-sm font-medium active:scale-95 transition"
      >
        + New Expense
      </button>
    </div>
  );
}
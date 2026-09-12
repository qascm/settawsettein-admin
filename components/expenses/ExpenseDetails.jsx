"use client";

import { useRouter } from "next/navigation";
import ExpenseActions from "./ExpenseActions";

export default function ExpenseDetails({ expense }) {
  const router = useRouter();

  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center"
        >
          ←
        </button>

        <div>
          <h1 className="text-2xl font-semibold">
            {expense.id}
          </h1>

          <p className="text-sm text-[var(--muted)]">
            {expense.date}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h2 className="font-medium mb-4">
            Expense
          </h2>

          <Info
            label="Description"
            value={expense.description}
          />

          <Info
            label="Category"
            value={expense.category}
          />

          <Info
            label="Payment Method"
            value={expense.paymentMethod}
          />
        </section>

        <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h2 className="font-medium mb-4">
            Amount
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--muted)]">
              Total
            </span>

            <span className="text-xl font-semibold">
              {expense.amount.toLocaleString()} EGP
            </span>
          </div>
        </section>

        {expense.notes && (
          <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
            <h2 className="font-medium mb-3">
              Notes
            </h2>

            <p className="text-sm text-[var(--muted)]">
              {expense.notes}
            </p>
          </section>
        )}

        <ExpenseActions expenseId={expense.id} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <span className="text-sm text-[var(--muted)]">
        {label}
      </span>

      <span className="text-sm text-right">
        {value}
      </span>
    </div>
  );
}
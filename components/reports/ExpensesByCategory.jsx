"use client";

import { useEffect, useState } from "react";

export default function ExpensesByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const response = await fetch("/api/expenses", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load expenses"
          );
        }

        const totals = {};

        (result.expenses || []).forEach((expense) => {
          const category = expense.category || "Other";

          totals[category] =
            (totals[category] || 0) +
            Number(expense.amount || 0);
        });

        const totalExpenses = Object.values(totals).reduce(
          (sum, amount) => sum + amount,
          0
        );

        const data = Object.entries(totals)
          .map(([name, amount]) => ({
            name,
            amount,
            percentage:
              totalExpenses > 0
                ? Number(
                    ((amount / totalExpenses) * 100).toFixed(1)
                  )
                : 0,
          }))
          .sort((a, b) => b.amount - a.amount);

        setCategories(data);
      } catch (error) {
        console.error(
          "LOAD EXPENSE REPORT ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, []);

  return (
    <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
      <div className="mb-5">
        <h2 className="font-medium">
          Expenses by Category
        </h2>

        <p className="text-xs text-[var(--muted)] mt-1">
          All time
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">
          Loading...
        </p>
      ) : categories.length > 0 ? (
        <div className="space-y-5">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">
                  {category.name}
                </span>

                <span className="text-sm font-medium">
                  {category.amount.toLocaleString()} EGP
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--primary)]"
                  style={{
                    width: `${category.percentage}%`,
                  }}
                />
              </div>

              <p className="text-xs text-[var(--muted)] mt-1">
                {category.percentage}%
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          No expenses found.
        </p>
      )}
    </section>
  );
}
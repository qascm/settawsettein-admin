"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecentExpenses() {
  const router = useRouter();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const response = await fetch(
          "/api/expenses",
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error ||
              "Failed to load expenses"
          );
        }

        setExpenses(
          (result.expenses || []).slice(0, 3)
        );
      } catch (error) {
        console.error(
          "LOAD RECENT EXPENSES ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, []);

  return (
    <section className="pb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium">
          Recent Expenses
        </h2>

        <button
          onClick={() => router.push("/expenses")}
          className="text-xs text-[var(--muted)]"
        >
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-6 text-center">
            <p className="text-sm text-[var(--muted)]">
              Loading...
            </p>
          </div>
        ) : expenses.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-[var(--muted)]">
              No expenses found.
            </p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense.id}
              onClick={() =>
                router.push(
                  `/expenses/${String(
                    expense.id
                  ).replace("#EXP", "")}`
                )
              }
              className="
                bg-[var(--surface)]
                border border-[var(--border)]
                rounded-2xl
                p-4
                flex
                items-center
                justify-between
                cursor-pointer
                active:bg-[var(--surface-light)]
              "
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {expense.category}
                </p>

                <p className="text-xs text-[var(--muted)] mt-1 truncate">
                  {expense.description}
                </p>

                <p className="text-[10px] text-[var(--muted)] mt-2">
                  {expense.id}
                </p>
              </div>

              <div className="text-right ml-3">
                <p className="text-sm">
                  - EGP{" "}
                  {Number(
                    expense.amount || 0
                  ).toLocaleString()}
                </p>

                <p className="text-[10px] text-green-400 mt-1">
                  ● {expense.paymentMethod}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
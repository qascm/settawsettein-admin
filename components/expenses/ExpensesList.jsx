"use client";

import { useEffect, useMemo, useState } from "react";
import ExpenseCard from "./ExpenseCard";

const categories = [
  "All",
  "Packaging",
  "Marketing",
  "Shipping",
  "Production",
  "Operations",
  "Other",
];

export default function ExpensesList() {
  const [expenseData, setExpenseData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  async function loadExpenses() {
    try {
      setLoading(true);

      const response = await fetch("/api/expenses", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to load expenses"
        );
      }

      setExpenseData(result.expenses || []);
    } catch (error) {
      console.error("LOAD EXPENSES ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    return [...expenseData]
      .sort((a, b) => {
        const idA = String(a.id || "");
        const idB = String(b.id || "");

        // Extract number from IDs such as EXP-001
        const numberA = parseInt(
          idA.match(/\d+/)?.[0] || "0",
          10
        );

        const numberB = parseInt(
          idB.match(/\d+/)?.[0] || "0",
          10
        );

        return numberB - numberA;
      })
      .filter((expense) => {
        const searchValue = search
          .toLowerCase()
          .trim();

        const matchesSearch =
          !searchValue ||
          String(expense.id || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(expense.description || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(expense.category || "")
            .toLowerCase()
            .includes(searchValue);

        const matchesCategory =
          category === "All" ||
          expense.category === category;

        return matchesSearch && matchesCategory;
      });
  }, [expenseData, search, category]);

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search expenses..."
          className="w-full h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 text-sm outline-none focus:border-[var(--primary)] transition"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
        {categories.map((item) => {
          const active = category === item;

          return (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`shrink-0 px-4 h-11 rounded-full text-xs font-medium transition ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <p className="text-sm text-[var(--muted)]">
            Loading expenses...
          </p>
        </div>
      ) : filteredExpenses.length > 0 ? (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm font-medium">
            No expenses found
          </p>

          <p className="text-xs text-[var(--muted)] mt-1">
            Try a different search or filter
          </p>
        </div>
      )}
    </div>
  );
}
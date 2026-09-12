"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import ExpenseForm from "@/components/expenses/ExpenseForm";

export default function EditExpensePage() {
  const params = useParams();

  const expenseId = `#EXP${params.id.replace("EXP", "")}`;

  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExpense() {
      try {
        const response = await fetch("/api/expenses", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load expense"
          );
        }

        const foundExpense = result.expenses.find(
          (item) =>
            item.id.replace("#EXP", "") ===
            expenseId.replace("#EXP", "")
        );

        if (foundExpense) {
          setExpense({
            date: foundExpense.date,
            expenseId: expenseId,
            description: foundExpense.description,
            category: foundExpense.category,
            amount: String(foundExpense.amount),
            paymentMethod:
              foundExpense.paymentMethod,
            notes: foundExpense.notes,
          });
        }
      } catch (error) {
        console.error(
          "LOAD EXPENSE ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadExpense();
  }, [expenseId]);

  if (loading) {
    return (
      <>
        <Header />

        <PageContainer>
          <div className="py-12 text-center">
            <p className="text-sm text-[var(--muted)]">
              Loading expense...
            </p>
          </div>
        </PageContainer>
      </>
    );
  }

  if (!expense) {
    return (
      <>
        <Header />

        <PageContainer>
          <div className="py-12 text-center">
            <p className="text-sm">
              Expense not found
            </p>
          </div>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header />

      <PageContainer>
        <ExpenseForm initialData={expense} />
      </PageContainer>
    </>
  );
}
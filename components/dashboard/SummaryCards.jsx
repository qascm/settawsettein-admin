"use client";

import { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

export default function SummaryCards() {
  const [data, setData] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    orders: 0,
    itemsSold: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      try {
        const [ordersResponse, expensesResponse] =
          await Promise.all([
            fetch("/api/orders", { cache: "no-store" }),
            fetch("/api/expenses", { cache: "no-store" }),
          ]);

        const ordersResult = await ordersResponse.json();
        const expensesResult = await expensesResponse.json();

        if (!ordersResponse.ok) {
          throw new Error(
            ordersResult.error || "Failed to load orders"
          );
        }

        if (!expensesResponse.ok) {
          throw new Error(
            expensesResult.error || "Failed to load expenses"
          );
        }

        // Exclude cancelled orders
        const orders = (ordersResult.orders || []).filter(
          (order) => order.status !== "Cancelled"
        );

        const expenses = expensesResult.expenses || [];

        // ----------------------------------------
        // REVENUE
        // ----------------------------------------

        const revenue = orders.reduce(
          (sum, order) =>
            sum + Number(order.total || 0),
          0
        );

        // ----------------------------------------
        // EXPENSES
        // ----------------------------------------

        const totalExpenses = expenses.reduce(
          (sum, expense) =>
            sum + Number(expense.amount || 0),
          0
        );

        // ----------------------------------------
        // NET PROFIT
        // ----------------------------------------

        const profit = revenue - totalExpenses;

        // ----------------------------------------
        // ITEMS SOLD
        // Uses the "No Items" column
        // from Google Sheets
        // ----------------------------------------

        const itemsSold = orders.reduce(
          (sum, order) =>
            sum + Number(order.noItems || 0),
          0
        );

        // ----------------------------------------
        // UPDATE DATA
        // ----------------------------------------

        setData({
          revenue,
          expenses: totalExpenses,
          profit,
          orders: orders.length,
          itemsSold,
        });
      } catch (error) {
        console.error(
          "LOAD DASHBOARD SUMMARY ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  // ----------------------------------------
  // LOADING STATE
  // ----------------------------------------

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[1, 2, 3, 4].map((item) => (
          <SummaryCard
            key={item}
            label="Loading..."
            value="—"
          />
        ))}
      </div>
    );
  }

  // ----------------------------------------
  // SUMMARY CARDS
  // ----------------------------------------

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {/* Net Profit */}
      <SummaryCard
        label="Net Profit"
        value={data.profit.toLocaleString()}
        suffix="EGP"
        accent="success"
      />

      {/* Total Orders */}
      <SummaryCard
        label="Total Orders"
        value={data.orders.toLocaleString()}
        accent="cold"
      />

      {/* Revenue */}
      <SummaryCard
        label="Revenue"
        value={data.revenue.toLocaleString()}
        suffix="EGP"
        accent="primary"
      />

      {/* Items Sold */}
      <SummaryCard
        label="Items Sold"
        value={data.itemsSold.toLocaleString()}
        suffix="pcs"
        accent="warning"
      />
    </div>
  );
}
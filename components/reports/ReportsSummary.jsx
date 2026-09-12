"use client";

import { useEffect, useState } from "react";
import ReportCard from "./ReportCard";

export default function ReportsSummary() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const [ordersResponse, expensesResponse] =
          await Promise.all([
            fetch("/api/orders", {
              cache: "no-store",
            }),
            fetch("/api/expenses", {
              cache: "no-store",
            }),
          ]);

        const ordersResult =
          await ordersResponse.json();

        const expensesResult =
          await expensesResponse.json();

        if (!ordersResponse.ok) {
          throw new Error(
            ordersResult.error ||
              "Failed to load orders"
          );
        }

        if (!expensesResponse.ok) {
          throw new Error(
            expensesResult.error ||
              "Failed to load expenses"
          );
        }

        // Exclude cancelled orders
        const orders = (
          ordersResult.orders || []
        ).filter(
          (order) => order.status !== "Cancelled"
        );

        const expenses =
          expensesResult.expenses || [];

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
        // PROFIT
        // ----------------------------------------

        const profit =
          revenue - totalExpenses;

        // ----------------------------------------
        // ORDERS
        // ----------------------------------------

        const orderCount = orders.length;

        // ----------------------------------------
        // ITEMS SOLD
        // Uses "No Items" column
        // ----------------------------------------

        const itemsSold = orders.reduce(
          (sum, order) =>
            sum + Number(order.noItems || 0),
          0
        );

        // ----------------------------------------
        // AVERAGE ORDER
        // ----------------------------------------

        const averageOrder =
          orderCount > 0
            ? revenue / orderCount
            : 0;

        // ----------------------------------------
        // REPORT CARDS
        // ----------------------------------------

        setReports([
          {
            title: "Revenue",
            value: `${revenue.toLocaleString()} EGP`,
            subtitle: "All time",
          },
          {
            title: "Expenses",
            value: `${totalExpenses.toLocaleString()} EGP`,
            subtitle: "All time",
          },
          {
            title: "Profit",
            value: `${profit.toLocaleString()} EGP`,
            subtitle: "All time",
          },
          {
            title: "Orders",
            value: orderCount.toLocaleString(),
            subtitle: "All time",
          },
          {
            title: "No Items Sold",
            value: itemsSold.toLocaleString(),
            subtitle: "All time",
          },
          {
            title: "Average Order",
            value: `${Math.round(
              averageOrder
            ).toLocaleString()} EGP`,
            subtitle: "Per order",
          },
        ]);
      } catch (error) {
        console.error(
          "LOAD REPORTS SUMMARY ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 py-8 text-center">
          <p className="text-sm text-[var(--muted)]">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {reports.map((report) => (
        <ReportCard
          key={report.title}
          report={report}
        />
      ))}
    </div>
  );
}
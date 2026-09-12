"use client";

import { useEffect, useState } from "react";

export default function SalesByPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const response = await fetch(
          "/api/orders",
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error ||
              "Failed to load orders"
          );
        }

        const totals = {};

        (result.orders || [])
          .filter(
            (order) =>
              order.status !== "Cancelled"
          )
          .forEach((order) => {
            const payment =
              order.payment || "Other";

            totals[payment] =
              (totals[payment] || 0) +
              Number(order.total || 0);
          });

        const totalSales = Object.values(
          totals
        ).reduce(
          (sum, amount) => sum + amount,
          0
        );

        const data = Object.entries(totals)
          .map(([name, amount]) => ({
            name,
            amount,
            percentage:
              totalSales > 0
                ? Number(
                    (
                      (amount / totalSales) *
                      100
                    ).toFixed(1)
                  )
                : 0,
          }))
          .sort(
            (a, b) => b.amount - a.amount
          );

        setPayments(data);
      } catch (error) {
        console.error(
          "LOAD PAYMENT REPORT ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  return (
    <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
      <div className="mb-5">
        <h2 className="font-medium">
          Sales by Payment
        </h2>

        <p className="text-xs text-[var(--muted)] mt-1">
          All time
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">
          Loading...
        </p>
      ) : payments.length > 0 ? (
        <div className="space-y-5">
          {payments.map((payment) => (
            <div key={payment.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">
                  {payment.name}
                </span>

                <span className="text-sm font-medium">
                  {payment.amount.toLocaleString()} EGP
                </span>
              </div>

              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--primary)]"
                  style={{
                    width: `${payment.percentage}%`,
                  }}
                />
              </div>

              <p className="text-xs text-[var(--muted)] mt-1">
                {payment.percentage}%
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          No sales found.
        </p>
      )}
    </section>
  );
}
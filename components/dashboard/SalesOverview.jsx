"use client";

import { useEffect, useMemo, useState } from "react";

export default function SalesOverview() {
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSales() {
      try {
        setLoading(true);

        const [ordersResponse, expensesResponse] =
          await Promise.all([
            fetch("/api/orders", {
              cache: "no-store",
            }),
            fetch("/api/expenses", {
              cache: "no-store",
            }),
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

        // ----------------------------------------
        // ORDERS
        // ----------------------------------------

        const orders = (ordersResult.orders || []).filter(
          (order) => order.status !== "Cancelled"
        );

        // ----------------------------------------
        // EXPENSES
        // ----------------------------------------

        const expenses = expensesResult.expenses || [];

        // ----------------------------------------
        // LAST 6 MONTHS
        // ----------------------------------------

        const months = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date();

          date.setDate(1);
          date.setHours(0, 0, 0, 0);
          date.setMonth(date.getMonth() - i);

          months.push({
            month: date.toLocaleString("en-US", {
              month: "short",
            }),
            year: date.getFullYear(),
            monthIndex: date.getMonth(),
            revenue: 0,
            expense: 0,
          });
        }

        // ----------------------------------------
        // ADD REVENUE
        // ----------------------------------------

        orders.forEach((order) => {
          const date = new Date(order.date);

          if (isNaN(date.getTime())) return;

          const month = months.find(
            (item) =>
              item.monthIndex === date.getMonth() &&
              item.year === date.getFullYear()
          );

          if (month) {
            month.revenue += Number(order.total || 0);
          }
        });

        // ----------------------------------------
        // ADD EXPENSES
        // ----------------------------------------

        expenses.forEach((expense) => {
          const date = new Date(expense.date);

          if (isNaN(date.getTime())) return;

          const month = months.find(
            (item) =>
              item.monthIndex === date.getMonth() &&
              item.year === date.getFullYear()
          );

          if (month) {
            month.expense += Number(expense.amount || 0);
          }
        });

        // ----------------------------------------
        // TOTAL REVENUE
        // Only the displayed 6-month period
        // ----------------------------------------

        const sixMonthRevenue = months.reduce(
          (sum, month) => sum + month.revenue,
          0
        );

        setChartData(months);
        setTotalRevenue(sixMonthRevenue);
      } catch (error) {
        console.error(
          "LOAD SALES OVERVIEW ERROR:",
          error
        );

        setChartData([]);
        setTotalRevenue(0);
      } finally {
        setLoading(false);
      }
    }

    loadSales();
  }, []);

  // ----------------------------------------
  // CHART SCALE
  // ----------------------------------------

  const maxValue = useMemo(() => {
    if (!chartData.length) return 1000;

    return Math.max(
      ...chartData.flatMap((item) => [
        item.revenue,
        item.expense,
      ]),
      1000
    );
  }, [chartData]);

  /*
    Keep the chart clean with rounded numbers.

    Example:
    2,480 -> 3,000
    7,200 -> 10,000
    12,000 -> 20,000
  */

  const chartMax = useMemo(() => {
    if (maxValue <= 3000) return 3000;
    if (maxValue <= 5000) return 5000;
    if (maxValue <= 7000) return 7000;
    if (maxValue <= 10000) return 10000;
    if (maxValue <= 15000) return 15000;
    if (maxValue <= 20000) return 20000;

    return Math.ceil(maxValue / 5000) * 5000;
  }, [maxValue]);

  // ----------------------------------------
  // GRID LABELS
  // ----------------------------------------

  const gridValues = useMemo(() => {
    return [
      chartMax,
      chartMax * 0.7,
      chartMax * 0.3,
      0,
    ];
  }, [chartMax]);

  // ----------------------------------------
  // FORMAT CURRENCY
  // ----------------------------------------

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-US");
  };

  return (
    <section className="mb-5">
      <div
        className="
          bg-[var(--surface)]
          border border-[var(--border)]
          rounded-2xl
          p-5
        "
      >
        {/* ======================================
            HEADER
        ====================================== */}

        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--muted)]">
              Total Revenue
            </p>

            <p className="text-[32px] leading-none font-light mt-1 tracking-tight">
              EGP {formatCurrency(totalRevenue)}
            </p>
          </div>

          <button
            type="button"
            className="
              flex
              items-center
              bg-[var(--surface-light)]
              border
              border-[var(--border)]
              rounded-full
              px-4
              py-2
              text-xs
              whitespace-nowrap
              transition
              hover:opacity-80
            "
          >
            <span>Last 6 months</span>
          </button>
        </div>

        {/* ======================================
            CHART
        ====================================== */}

        {loading ? (
          <div className="h-56 flex items-center justify-center">
            <p className="text-sm text-[var(--muted)]">
              Loading...
            </p>
          </div>
        ) : (
          <div className="mt-7">
            {/* Chart area */}

            <div className="relative h-48">
              {/* ----------------------------------
                  GRID LINES
              ---------------------------------- */}

              {gridValues.map((value, index) => {
                const position =
                  value === 0
                    ? 0
                    : (value / chartMax) * 100;

                return (
                  <div
                    key={`${value}-${index}`}
                    className="
                      absolute
                      left-0
                      right-0
                      border-t
                      border-[var(--border)]
                    "
                    style={{
                      bottom: `${position}%`,
                    }}
                  >
                    <span
                      className="
                        absolute
                        -top-[7px]
                        left-0
                        text-[9px]
                        leading-none
                        text-[var(--muted)]
                      "
                    >
                      {value === 0
                        ? "0"
                        : `${Math.round(
                            value / 1000
                          )}K`}
                    </span>
                  </div>
                );
              })}

              {/* ----------------------------------
                  BARS
              ---------------------------------- */}

              <div
                className="
                  absolute
                  inset-0
                  pl-8
                  pr-1
                  flex
                  items-end
                  justify-between
                "
              >
                {chartData.map((item) => {
                  const revenueHeight =
                    chartMax > 0
                      ? (item.revenue / chartMax) * 100
                      : 0;

                  const expenseHeight =
                    chartMax > 0
                      ? (item.expense / chartMax) * 100
                      : 0;

                  return (
                    <div
                      key={`${item.month}-${item.year}`}
                      className="
                        h-full
                        flex-1
                        flex
                        items-end
                        justify-center
                        gap-1
                        min-w-0
                      "
                    >
                      {/* Revenue */}

                      <div
                        title={`Revenue: EGP ${formatCurrency(
                          item.revenue
                        )}`}
                        className="
                          w-full
                          max-w-9
                          rounded-t-lg
                          bg-[var(--primary)]
                          opacity-90
                          transition-all
                          duration-300
                          hover:opacity-100
                        "
                        style={{
                          height:
                            item.revenue > 0
                              ? `${Math.max(
                                  revenueHeight,
                                  1
                                )}%`
                              : "0%",
                        }}
                      />

                      {/* Expenses */}

                      <div
                        title={`Expenses: EGP ${formatCurrency(
                          item.expense
                        )}`}
                        className="
                          w-full
                          max-w-9
                          rounded-t-lg
                          bg-gray-500
                          opacity-80
                          transition-all
                          duration-300
                          hover:opacity-100
                        "
                        style={{
                          height:
                            item.expense > 0
                              ? `${Math.max(
                                  expenseHeight,
                                  1
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ----------------------------------
                MONTH LABELS
            ---------------------------------- */}

            <div
              className="
                pl-8
                pr-1
                mt-2
                flex
                justify-between
              "
            >
              {chartData.map((item) => (
                <span
                  key={`${item.month}-${item.year}`}
                  className="
                    flex-1
                    text-center
                    text-[10px]
                    text-[var(--muted)]
                  "
                >
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ======================================
            LEGEND
        ====================================== */}

        <div
          className="
            flex
            items-center
            gap-5
            mt-5
            pt-4
            border-t
            border-[var(--border)]
          "
        >
          {/* Revenue */}

          <div className="flex items-center gap-2 text-xs">
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[var(--primary)]
              "
            />

            <span>Revenue</span>
          </div>

          {/* Expenses */}

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-[var(--muted)]
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-gray-500
              "
            />

            <span>Expenses</span>
          </div>
        </div>
      </div>
    </section>
  );
}
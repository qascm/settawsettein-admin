"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RecentOrders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/api/orders", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load orders"
          );
        }

        setOrders(
          (result.orders || [])
            .filter(
              (order) => order.status !== "Cancelled"
            )
            .slice(0, 3)
        );
      } catch (error) {
        console.error(
          "LOAD RECENT ORDERS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  function getProductName(products) {
    if (!products) return "Order";

    try {
      const parsed =
        typeof products === "string"
          ? JSON.parse(products)
          : products;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return (
          parsed[0].name ||
          parsed[0].product ||
          parsed[0].title ||
          "Order"
        );
      }

      if (parsed && typeof parsed === "object") {
        return (
          parsed.name ||
          parsed.product ||
          parsed.title ||
          "Order"
        );
      }
    } catch {
      return String(products);
    }

    return "Order";
  }

  function getItemsCount(products) {
    if (!products) return 0;

    try {
      const parsed =
        typeof products === "string"
          ? JSON.parse(products)
          : products;

      if (Array.isArray(parsed)) {
        return parsed.reduce(
          (sum, item) =>
            sum +
            Number(
              item.qty ||
                item.quantity ||
                1
            ),
          0
        );
      }

      if (parsed && typeof parsed === "object") {
        return Number(
          parsed.qty ||
            parsed.quantity ||
            1
        );
      }
    } catch {
      return 1;
    }

    return 1;
  }

  function getStatusClasses(status) {
    switch (status) {
      case "Delivered":
      case "Completed":
        return "bg-green-500/10 text-green-400";

      case "Pending":
        return "bg-yellow-500/10 text-yellow-400";

      case "Shipped":
        return "bg-blue-500/10 text-blue-400";

      case "Cancelled":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-white/5 text-[var(--muted)]";
    }
  }

  return (
    <section className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium">
          Recent Orders
        </h2>

        <button
          onClick={() => router.push("/orders")}
          className="text-xs text-[var(--muted)]"
        >
          View All →
        </button>
      </div>

      <div
        className="
          bg-[var(--surface)]
          border border-[var(--border)]
          rounded-2xl
          overflow-hidden
        "
      >

        {loading ? (
          <div className="px-4 py-6 text-center">
            <p className="text-sm text-[var(--muted)]">
              Loading...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="px-4 py-6 text-center">
            <p className="text-sm text-[var(--muted)]">
              No orders found.
            </p>
          </div>
        ) : (
          orders.map((order) => {
            const items = getItemsCount(
              order.products
            );

            return (
              <div
                key={order.id}
                onClick={() =>
                  router.push(
                    `/orders/${String(order.id).replace(
                      "#",
                      ""
                    )}`
                  )
                }
                className="
                  px-4
                  py-4
                  border-b
                  border-[var(--border)]
                  last:border-b-0
                  cursor-pointer
                  active:bg-[var(--surface-light)]
                "
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {getProductName(
                        order.products
                      )}
                    </p>

                    <p className="text-xs text-[var(--muted)] mt-1">
                      {order.customer}
                    </p>

                    <p className="text-[10px] text-[var(--muted)] mt-2">
                      {order.id} · {items}{" "}
                      {items === 1 ? "Item" : "Items"}
                    </p>
                  </div>

                  <div className="text-right ml-3">
                    <p className="text-sm">
                      EGP{" "}
                      {Number(
                        order.total || 0
                      ).toLocaleString()}
                    </p>

                    <span
                      className={`
                        inline-block
                        mt-2
                        px-2
                        py-1
                        rounded-full
                        text-[9px]
                        ${getStatusClasses(
                          order.status
                        )}
                      `}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
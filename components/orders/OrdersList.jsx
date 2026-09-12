"use client";

import { useEffect, useMemo, useState } from "react";
import OrderCard from "./OrderCard";

const statuses = [
  "All",
  "Pending",
  "Confirmed",
  "Preparing",
  "Shipped",
  "Completed",
  "Cancelled",
];

export default function OrdersList() {
  const [orderData, setOrderData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to load orders"
        );
      }

      setOrderData(result.orders || []);
    } catch (error) {
      console.error("LOAD ORDERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orderData
      .filter((order) => {
        const searchValue = search
          .toLowerCase()
          .trim();

        const matchesSearch =
          !searchValue ||
          order.id
            .toLowerCase()
            .includes(searchValue) ||
          order.customer
            .toLowerCase()
            .includes(searchValue) ||
          order.products
            .toLowerCase()
            .includes(searchValue);

        const matchesStatus =
          status === "All" ||
          order.status === status;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const idA = parseInt(
          String(a.id).replace(/\D/g, ""),
          10
        );

        const idB = parseInt(
          String(b.id).replace(/\D/g, ""),
          10
        );

        return idB - idA;
      });
  }, [orderData, search, status]);

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search orders..."
          className="w-full h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 text-sm outline-none focus:border-[var(--primary)] transition"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
        {statuses.map((item) => {
          const active = status === item;

          return (
            <button
              key={item}
              onClick={() => setStatus(item)}
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
            Loading orders...
          </p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-sm font-medium">
            No orders found
          </p>

          <p className="text-xs text-[var(--muted)] mt-1">
            Try a different search or filter
          </p>
        </div>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OrderActions from "./OrderActions";

const statusStyles = {
  Completed: "bg-green-500/10 text-green-400",
  Shipped: "bg-blue-500/10 text-blue-400",
  Preparing: "bg-purple-500/10 text-purple-400",
  Confirmed: "bg-cyan-500/10 text-cyan-400",
  Pending: "bg-yellow-500/10 text-yellow-400",
  Cancelled: "bg-red-500/10 text-red-400",
};

const statuses = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Shipped",
  "Completed",
  "Cancelled",
];

export default function OrderDetails({ order }) {
  const router = useRouter();

  const [status, setStatus] = useState(
    order.status || "Pending"
  );

  const [savingStatus, setSavingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");

  async function handleStatusChange(e) {
    const newStatus = e.target.value;

    // Keep the previous status in case saving fails
    const previousStatus = status;

    setStatus(newStatus);
    setSavingStatus(true);
    setStatusError("");

    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          date: order.date,
          customerName: order.customerName,
          phone: order.phone,
          address: order.address,
          products: order.products,
          totalAmount: order.totalAmount,
          paymentMethod: order.paymentMethod,

          // Only changing the status
          status: newStatus,

          // Keep No Items when updating the order
          noItems: order.noItems || 0,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to update status"
        );
      }

      // Refresh server data
      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE ORDER STATUS ERROR:",
        error
      );

      // Revert UI if saving failed
      setStatus(previousStatus);

      setStatusError(
        error.message || "Failed to update status"
      );
    } finally {
      setSavingStatus(false);
    }
  }

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="
            w-10
            h-10
            rounded-xl
            border
            border-[var(--border)]
            flex
            items-center
            justify-center
          "
        >
          ←
        </button>

        <div>
          <h1 className="text-2xl font-semibold">
            {order.id}
          </h1>

          <p className="text-sm text-[var(--muted)]">
            {order.date}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* ======================================
            STATUS
        ====================================== */}

        <section
          className="
            p-4
            rounded-2xl
            bg-[var(--surface)]
            border
            border-[var(--border)]
          "
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-medium">
              Order Status
            </h2>

            <span
              className={`
                px-3
                py-1.5
                rounded-full
                text-xs
                font-medium
                ${statusStyles[status] || ""}
              `}
            >
              {status}
            </span>
          </div>

          <select
            value={status}
            onChange={handleStatusChange}
            disabled={savingStatus}
            className="
              w-full
              h-12
              rounded-xl
              bg-[var(--background)]
              border
              border-[var(--border)]
              px-4
              text-sm
              outline-none
              focus:border-[var(--primary)]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {statuses.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          {savingStatus ? (
            <p className="text-xs text-[var(--muted)] mt-2">
              Saving status...
            </p>
          ) : statusError ? (
            <p className="text-xs text-red-400 mt-2">
              {statusError}
            </p>
          ) : (
            <p className="text-xs text-[var(--muted)] mt-2">
              Status is saved automatically.
            </p>
          )}
        </section>

        {/* ======================================
            CUSTOMER
        ====================================== */}

        <section
          className="
            p-4
            rounded-2xl
            bg-[var(--surface)]
            border
            border-[var(--border)]
          "
        >
          <h2 className="font-medium mb-4">
            Customer
          </h2>

          <Info
            label="Name"
            value={order.customerName}
          />

          <Info
            label="Phone"
            value={order.phone}
          />

          <Info
            label="Address"
            value={order.address}
          />
        </section>

        {/* ======================================
            PRODUCTS
        ====================================== */}

        <section
          className="
            p-4
            rounded-2xl
            bg-[var(--surface)]
            border
            border-[var(--border)]
          "
        >
          <h2 className="font-medium mb-4">
            Products
          </h2>

          <p className="text-sm text-[var(--muted)]">
            {order.products}
          </p>
        </section>

        {/* ======================================
            PAYMENT
        ====================================== */}

        <section
          className="
            p-4
            rounded-2xl
            bg-[var(--surface)]
            border
            border-[var(--border)]
          "
        >
          <h2 className="font-medium mb-4">
            Payment
          </h2>

          <Info
            label="Method"
            value={order.paymentMethod}
          />

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--border)]">
            <span className="text-sm text-[var(--muted)]">
              Total Amount
            </span>

            <span className="text-lg font-semibold">
              {order.totalAmount.toLocaleString()} EGP
            </span>
          </div>
        </section>

        <OrderActions orderId={order.id} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <span className="text-sm text-[var(--muted)]">
        {label}
      </span>

      <span className="text-sm text-right">
        {value}
      </span>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderForm({ initialData = null }) {
  const router = useRouter();

  const [form, setForm] = useState(
    initialData || {
      date: new Date().toISOString().split("T")[0],
      orderId: "",
      customerName: "",
      phone: "",
      address: "",
      products: "",
      noItems: "",
      totalAmount: "",
      paymentMethod: "",
      status: "Pending",
    }
  );

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(initialData);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: form.date,
          orderId: form.orderId,
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          products: form.products,

          // No. of items
          noItems: Number(form.noItems),

          totalAmount: Number(form.totalAmount),
          paymentMethod: form.paymentMethod,
          status: form.status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to save order"
        );
      }

      router.push(
        `/orders/${form.orderId.replace("#", "")}`
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Something went wrong"
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          {isEditing ? "Edit Order" : "New Order"}
        </h1>

        <p className="text-sm text-[var(--muted)] mt-1">
          {isEditing
            ? "Update order information"
            : "Add a new order"}
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Order ID */}

        <Field
          label="Order ID"
          value={form.orderId}
          onChange={(v) => updateField("orderId", v)}
          placeholder="#0067"
          required
        />

        {/* Date */}

        <Field
          label="Date"
          type="date"
          value={form.date}
          onChange={(v) => updateField("date", v)}
          required
        />

        {/* Customer Name */}

        <Field
          label="Customer Name"
          value={form.customerName}
          onChange={(v) =>
            updateField("customerName", v)
          }
          placeholder="Customer name"
          required
        />

        {/* Phone */}

        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => updateField("phone", v)}
          placeholder="01XXXXXXXXX"
          required
        />

        {/* Address */}

        <Field
          label="Address"
          value={form.address}
          onChange={(v) => updateField("address", v)}
          placeholder="Customer address"
          textarea
          required
        />

        {/* Products */}

        <Field
          label="Products"
          value={form.products}
          onChange={(v) =>
            updateField("products", v)
          }
          placeholder="Arsenal 24/25 Home ×1"
          textarea
          required
        />

        {/* No Items */}

        <Field
          label="No. Items"
          type="number"
          value={form.noItems}
          onChange={(v) =>
            updateField("noItems", v)
          }
          placeholder="1"
          min="1"
          required
        />

        {/* Total Amount */}

        <Field
          label="Total Amount"
          type="number"
          value={form.totalAmount}
          onChange={(v) =>
            updateField("totalAmount", v)
          }
          placeholder="1200"
          min="0"
          required
        />

        {/* Payment Method */}

        <SelectField
          label="Payment Method"
          value={form.paymentMethod}
          onChange={(v) =>
            updateField("paymentMethod", v)
          }
          options={[
            "Cash",
            "InstaPay",
            "Vodafone Cash",
          ]}
          required
        />

        {/* Status */}

        <SelectField
          label="Status"
          value={form.status}
          onChange={(v) =>
            updateField("status", v)
          }
          options={[
            "Pending",
            "Confirmed",
            "Preparing",
            "Shipped",
            "Completed",
            "Cancelled",
          ]}
          required
        />

        {/* Buttons */}

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSaving}
            className="
              flex-1
              h-12
              rounded-xl
              border
              border-[var(--border)]
              text-sm
              font-medium
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="
              flex-1
              h-12
              rounded-xl
              bg-[var(--primary)]
              text-white
              text-sm
              font-medium
              disabled:opacity-50
            "
          >
            {isSaving
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Save Order"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
  min,
}) {
  const className =
    "w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 text-sm outline-none focus:border-[var(--primary)] transition";

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          rows={3}
          required={required}
          className={`${className} py-3 resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          min={min}
          required={required}
          className={`${className} h-12`}
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        required={required}
        className="
          w-full
          h-12
          rounded-xl
          bg-[var(--surface)]
          border
          border-[var(--border)]
          px-4
          text-sm
          outline-none
          focus:border-[var(--primary)]
        "
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
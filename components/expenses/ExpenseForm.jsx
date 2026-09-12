"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ExpenseForm({ initialData = null }) {
  const router = useRouter();

  const [form, setForm] = useState(
    initialData || {
      date: new Date().toISOString().split("T")[0],
      expenseId: "",
      description: "",
      category: "",
      amount: "",
      paymentMethod: "",
      notes: "",
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
      const response = await fetch("/api/expenses", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: form.date,
          expenseId: form.expenseId,
          description: form.description,
          category: form.category,
          amount: Number(form.amount),
          paymentMethod: form.paymentMethod,
          notes: form.notes,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to save expense"
        );
      }

      router.push(
        `/expenses/${form.expenseId.replace("#EXP", "")}`
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
          {isEditing ? "Edit Expense" : "New Expense"}
        </h1>

        <p className="text-sm text-[var(--muted)] mt-1">
          {isEditing
            ? "Update expense information"
            : "Add a new expense"}
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Expense ID"
          value={form.expenseId}
          onChange={(v) => updateField("expenseId", v)}
          placeholder="#EXP007"
          required
        />

        <Field
          label="Date"
          type="date"
          value={form.date}
          onChange={(v) => updateField("date", v)}
          required
        />

        <Field
          label="Description"
          value={form.description}
          onChange={(v) => updateField("description", v)}
          placeholder="Instagram Ads"
          required
        />

        <SelectField
          label="Category"
          value={form.category}
          onChange={(v) => updateField("category", v)}
          options={[
            "Packaging",
            "Marketing",
            "Shipping",
            "Production",
            "Operations",
            "Other",
          ]}
          required
        />

        <Field
          label="Amount"
          type="number"
          value={form.amount}
          onChange={(v) => updateField("amount", v)}
          placeholder="1200"
          required
        />

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
            "Bank Transfer",
          ]}
          required
        />

        <Field
          label="Notes"
          value={form.notes}
          onChange={(v) => updateField("notes", v)}
          placeholder="Optional notes"
          textarea
        />

        <div className="flex gap-3 pt-3">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={isSaving}
            className="flex-1 h-12 rounded-xl border border-[var(--border)] text-sm font-medium disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="flex-1 h-12 rounded-xl bg-[var(--primary)] text-white text-sm font-medium disabled:opacity-50"
          >
            {isSaving
              ? "Saving..."
              : isEditing
              ? "Save Changes"
              : "Save Expense"}
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
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          required={required}
          className={`${className} py-3 resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
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
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 text-sm outline-none focus:border-[var(--primary)]"
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
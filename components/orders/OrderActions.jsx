"use client";

import { useRouter } from "next/navigation";

export default function OrderActions({ orderId }) {
  const router = useRouter();

  const id = orderId.replace("#", "");

  return (
    <div className="flex gap-3 pt-2">
      <button
        onClick={() => router.push(`/orders/${id}/edit`)}
        className="flex-1 h-12 rounded-xl bg-[var(--primary)] text-white text-sm font-medium"
      >
        Edit Order
      </button>

      <button
        onClick={() => router.back()}
        className="flex-1 h-12 rounded-xl border border-[var(--border)] text-sm font-medium"
      >
        Back
      </button>
    </div>
  );
}
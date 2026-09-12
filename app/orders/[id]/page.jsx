"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import OrderDetails from "@/components/orders/OrderDetails";

export default function OrderDetailsPage() {
  const params = useParams();

  const orderId = `#${params.id}`;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await fetch("/api/orders", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load order"
          );
        }

        const foundOrder = result.orders.find(
          (item) =>
            item.id.replace("#", "") ===
            orderId.replace("#", "")
        );

        if (foundOrder) {
          setOrder({
            id: orderId,
            date: foundOrder.date,
            customerName: foundOrder.customer,
            phone: foundOrder.phone,
            address: foundOrder.address,
            totalAmount: foundOrder.total,
            paymentMethod: foundOrder.payment,
            status: foundOrder.status,
            products: foundOrder.products,
          });
        }
      } catch (error) {
        console.error(
          "LOAD ORDER ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <>
        <Header />

        <PageContainer>
          <div className="py-12 text-center">
            <p className="text-sm text-[var(--muted)]">
              Loading order...
            </p>
          </div>
        </PageContainer>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />

        <PageContainer>
          <div className="py-12 text-center">
            <p className="text-sm">
              Order not found
            </p>
          </div>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header />

      <PageContainer>
        <OrderDetails order={order} />
      </PageContainer>
    </>
  );
}
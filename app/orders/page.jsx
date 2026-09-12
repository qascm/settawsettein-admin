import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrdersList from "@/components/orders/OrdersList";

const orders = [
  {
    id: "#0066",
    customer: "Mohamed Ali",
    date: "Sep 10, 2026",
    products: "Arsenal 24/25 Home ×1",
    total: 1200,
    payment: "InstaPay",
    status: "Completed",
  },
  {
    id: "#0065",
    customer: "Omar Hassan",
    date: "Sep 9, 2026",
    products: "Brazil 2002 ×1, Ghana 2026 ×1",
    total: 2400,
    payment: "Cash",
    status: "Shipped",
  },
  {
    id: "#0064",
    customer: "Youssef Ahmed",
    date: "Sep 8, 2026",
    products: "England 1990 ×1",
    total: 1200,
    payment: "Vodafone Cash",
    status: "Preparing",
  },
  {
    id: "#0063",
    customer: "Karim Samir",
    date: "Sep 7, 2026",
    products: "Scotland 2026 ×1",
    total: 1200,
    payment: "InstaPay",
    status: "Pending",
  },
];

export default function OrdersPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <OrdersHeader />
        <OrdersList orders={orders} />
      </PageContainer>
    </>
  );
}
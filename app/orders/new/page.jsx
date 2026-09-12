import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import OrderForm from "@/components/orders/OrderForm";

export default function NewOrderPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <OrderForm />
      </PageContainer>
    </>
  );
}
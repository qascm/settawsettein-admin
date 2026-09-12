import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import ExpenseForm from "@/components/expenses/ExpenseForm";

export default function NewExpensePage() {
  return (
    <>
      <Header />

      <PageContainer>
        <ExpenseForm />
      </PageContainer>
    </>
  );
}
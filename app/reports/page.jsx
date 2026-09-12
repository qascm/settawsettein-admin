import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import ReportsHeader from "@/components/reports/ReportsHeader";
import ReportsSummary from "@/components/reports/ReportsSummary";
import SalesByPayment from "@/components/reports/SalesByPayment";
import ExpensesByCategory from "@/components/reports/ExpensesByCategory";

export default function ReportsPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <ReportsHeader />

        <div className="space-y-4">
          <ReportsSummary />
          <SalesByPayment />
          <ExpensesByCategory />
        </div>
      </PageContainer>
    </>
  );
}
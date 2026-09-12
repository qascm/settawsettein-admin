import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import ExpensesHeader from "@/components/expenses/ExpensesHeader";
import ExpensesList from "@/components/expenses/ExpensesList";

const expenses = [
  {
    id: "#EXP006",
    date: "Sep 10, 2026",
    description: "Packaging Boxes",
    category: "Packaging",
    amount: 3300,
    paymentMethod: "Cash",
  },
  {
    id: "#EXP005",
    date: "Sep 9, 2026",
    description: "Shipping",
    category: "Shipping",
    amount: 850,
    paymentMethod: "Cash",
  },
  {
    id: "#EXP004",
    date: "Sep 7, 2026",
    description: "Instagram Ads",
    category: "Marketing",
    amount: 1200,
    paymentMethod: "InstaPay",
  },
  {
    id: "#EXP003",
    date: "Sep 5, 2026",
    description: "Printing",
    category: "Production",
    amount: 650,
    paymentMethod: "Cash",
  },
];

export default function ExpensesPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <ExpensesHeader />
        <ExpensesList expenses={expenses} />
      </PageContainer>
    </>
  );
}
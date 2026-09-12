"use client";


import Header from "../../components/layout/Header";
import PageContainer from "../../components/layout/PageContainer";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import ActionButtons from "../../components/dashboard/ActionButtons";
import SalesOverview from "../../components/dashboard/SalesOverview";
import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentOrders from "../../components/dashboard/RecentOrders";
import RecentExpenses from "../../components/dashboard/RecentExpenses";

export default function DashboardPage() {

  return (
    <div className="min-h-screen">
      <Header
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <PageContainer>
        <DashboardHeader />

        <ActionButtons />

        <SalesOverview />

        <SummaryCards />

        <RecentOrders />

        <RecentExpenses />
      </PageContainer>
    </div>
  );
}
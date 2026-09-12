import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import SettingsPage from "@/components/settings/SettingsPage";

export default function Settings() {
  return (
    <>
      <Header />

      <PageContainer>
        <SettingsPage />
      </PageContainer>
    </>
  );
}
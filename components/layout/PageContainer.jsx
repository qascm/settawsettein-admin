import Sidebar from "./Sidebar";

export default function PageContainer({ children }) {
  return (
    <>
      <main className="px-4 pt-5 pb-24 max-w-md mx-auto">
        {children}
      </main>

      <Sidebar />
    </>
  );
}
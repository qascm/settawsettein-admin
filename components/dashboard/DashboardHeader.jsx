"use client";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
  } else if (hour >= 18) {
    greeting = "Good Evening";
  }

  return (
    <div className="pt-6 pb-6">
      <p className="text-sm text-[var(--muted)]">
        Hello,Qasem
      </p>

      <h1 className="text-[34px] leading-none font-light tracking-tight mt-1">
        {greeting}
      </h1>
    </div>
  );
}
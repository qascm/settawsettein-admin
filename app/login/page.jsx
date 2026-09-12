"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const ADMIN_EMAIL = "admin@settawsettein.com";
    const ADMIN_PASSWORD = "qasem66";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            SETTAWSETTEIN
          </h1>

          <p className="text-sm mt-2 text-[var(--muted)]">
            Admin Dashboard
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5"
        >
          <div className="mb-5">
            <label className="block text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="
                w-full
                bg-[var(--surface-light)]
                border border-[var(--border)]
                rounded-lg
                px-4 py-3
                outline-none
                focus:border-[var(--primary)]
              "
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="
                w-full
                bg-[var(--surface-light)]
                border border-[var(--border)]
                rounded-lg
                px-4 py-3
                outline-none
                focus:border-[var(--primary)]
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-[var(--primary)]
              hover:bg-[var(--primary-dark)]
              transition-colors
              rounded-lg
              py-3
              font-medium
            "
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
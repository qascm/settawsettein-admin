"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    storeName: "Setta w Settein",
    currency: "EGP",
    defaultPayment: "Cash",
    notifications: true,
  });

  function updateSetting(field, value) {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    // Settings connection will be added later.
    console.log(settings);
  }

  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Settings
        </h1>

        <p className="text-sm text-[var(--muted)] mt-1">
          Manage your admin settings
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h2 className="font-medium mb-4">
            General
          </h2>

          <div className="space-y-4">
            <Field
              label="Store Name"
              value={settings.storeName}
              onChange={(value) =>
                updateSetting("storeName", value)
              }
            />

            <Field
              label="Currency"
              value={settings.currency}
              onChange={(value) =>
                updateSetting("currency", value)
              }
            />
          </div>
        </section>

        <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h2 className="font-medium mb-4">
            Orders
          </h2>

          <SelectField
            label="Default Payment Method"
            value={settings.defaultPayment}
            onChange={(value) =>
              updateSetting("defaultPayment", value)
            }
            options={[
              "Cash",
              "InstaPay",
              "Vodafone Cash",
            ]}
          />
        </section>

        <section className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <h2 className="font-medium mb-4">
            Notifications
          </h2>

          <button
            type="button"
            onClick={() =>
              updateSetting(
                "notifications",
                !settings.notifications
              )
            }
            className="w-full flex items-center justify-between"
          >
            <div className="text-left">
              <p className="text-sm font-medium">
                Order notifications
              </p>

              <p className="text-xs text-[var(--muted)] mt-1">
                Receive notifications for new orders
              </p>
            </div>

            <div
              className={`w-11 h-6 rounded-full p-1 transition ${
                settings.notifications
                  ? "bg-[var(--primary)]"
                  : "bg-white/10"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition ${
                  settings.notifications
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </div>
          </button>
        </section>

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-[var(--primary)] text-white text-sm font-medium"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 text-sm outline-none focus:border-[var(--primary)] transition"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] px-4 text-sm outline-none focus:border-[var(--primary)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
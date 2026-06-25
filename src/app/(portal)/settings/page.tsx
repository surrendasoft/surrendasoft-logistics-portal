"use client";

import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const { integrations, showToast } = useApp();

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Business profile, users, branding, and integration placeholders"
      />

      <div className="space-y-6">
        {/* Business Profile */}
        <section className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Business Profile</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="Company Name" value="Romann Logistics" />
            <Detail label="Contact Email" value="Ryan@romannlogistics.com" />
            <Detail label="Phone" value="02 9000 0000" />
            <Detail label="Address" value="Sydney, NSW, Australia" />
          </dl>
          <button
            onClick={() => showToast("Demo: Business profile save placeholder")}
            className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit Profile (demo)
          </button>
        </section>

        {/* Users & Roles */}
        <section className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Users & Roles</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 font-medium">Ryan</td>
                <td className="py-3 text-slate-600">Ryan@romannlogistics.com</td>
                <td className="py-3 text-slate-500">Admin</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-xs text-slate-400">Demo placeholder — user management not implemented</p>
        </section>

        {/* Branding */}
        <section className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Branding</h2>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-600 text-white font-bold">
              RL
            </div>
            <div>
              <p className="font-medium text-slate-900">Romann Logistics</p>
              <p className="text-sm text-slate-500">White-label portal powered by SurrendaSoft</p>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Integration Settings</h2>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
            Demo placeholders — no real API connections in this MVP
          </p>
          <div className="space-y-3">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-slate-900">{integration.name}</p>
                  <p className="text-xs text-slate-500">{integration.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={integration.status} />
                  <button
                    onClick={() => showToast(`Demo: ${integration.name} connection placeholder`)}
                    className="inline-flex items-center gap-1 text-sm text-sky-600 hover:underline"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900 mt-0.5">{value}</dd>
    </div>
  );
}

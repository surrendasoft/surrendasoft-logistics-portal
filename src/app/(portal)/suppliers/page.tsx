"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function SuppliersPage() {
  const { suppliers } = useApp();
  const [search, setSearch] = useState("");

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.serviceType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Suppliers / Agents"
        description="Manage freight suppliers and agent partners"
        action={{ label: "Add Supplier", href: "/suppliers/new" }}
      />
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Service Type</th>
              <th className="px-5 py-3">System/Platform</th>
              <th className="px-5 py-3">Compliance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/suppliers/${s.id}`} className="font-medium text-sky-600 hover:underline">
                    {s.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{s.contactPerson}</td>
                <td className="px-5 py-3 text-slate-500">{s.serviceType}</td>
                <td className="px-5 py-3 text-slate-500">{s.relatedSystem}</td>
                <td className="px-5 py-3"><StatusBadge status={s.complianceStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

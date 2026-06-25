"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";

export default function CustomersPage() {
  const { customers } = useApp();
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage customer accounts and relationships"
        action={{ label: "Add Customer", href: "/customers/new" }}
      />
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Xero Ref</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/customers/${c.id}`} className="font-medium text-sky-600 hover:underline">
                    {c.companyName}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{c.contactPerson}</td>
                <td className="px-5 py-3 text-slate-500">{c.phone}</td>
                <td className="px-5 py-3 text-slate-500">{c.email}</td>
                <td className="px-5 py-3 text-slate-500">{c.xeroContactRef || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

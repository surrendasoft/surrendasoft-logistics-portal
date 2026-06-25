"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";

export default function ConsignmentsPage() {
  const { consignments } = useApp();
  const [search, setSearch] = useState("");

  const filtered = consignments.filter(
    (c) =>
      c.consignmentId.toLowerCase().includes(search.toLowerCase()) ||
      c.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Consignments"
        description="External consignment references linked to General Freight records"
      />
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search consignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Consignment ID</th>
              <th className="px-5 py-3">External System</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Supplier</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Synced</th>
              <th className="px-5 py-3">GF Job</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((con) => (
              <tr key={con.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-900">{con.consignmentId}</td>
                <td className="px-5 py-3 text-slate-600">{con.externalSystem}</td>
                <td className="px-5 py-3 text-slate-600">{con.customerName}</td>
                <td className="px-5 py-3 text-slate-500">{con.supplierName}</td>
                <td className="px-5 py-3"><StatusBadge status={con.status} /></td>
                <td className="px-5 py-3 text-slate-500">{formatDateTime(con.lastSynced)}</td>
                <td className="px-5 py-3">
                  <Link href={`/general-freight/${con.generalFreightJobId}`} className="text-sky-600 hover:underline">
                    {con.generalFreightJobNumber}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

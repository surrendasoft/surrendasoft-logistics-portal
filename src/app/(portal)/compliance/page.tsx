"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { ComplianceStatus } from "@/lib/types";

export default function CompliancePage() {
  const { complianceRecords } = useApp();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = complianceRecords.filter(
    (c) => statusFilter === "all" || c.status === statusFilter
  );

  const statuses: ComplianceStatus[] = ["Valid", "Expiring Soon", "Expired", "Missing"];

  return (
    <div>
      <PageHeader
        title="Compliance"
        description="Supplier compliance documents and expiry tracking"
        action={{ label: "Add Document", href: "/compliance/new" }}
      />
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">
          Future: Firebase AI Integration may extract expiry dates from uploaded documents.
        </span>
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Supplier</th>
              <th className="px-5 py-3">Document Type</th>
              <th className="px-5 py-3">Document Name</th>
              <th className="px-5 py-3">Expiry Date</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/compliance/${record.id}`} className="font-medium text-sky-600 hover:underline">
                    {record.supplierName}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{record.documentType}</td>
                <td className="px-5 py-3 text-slate-500">{record.documentName || "—"}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(record.expiryDate)}</td>
                <td className="px-5 py-3"><StatusBadge status={record.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

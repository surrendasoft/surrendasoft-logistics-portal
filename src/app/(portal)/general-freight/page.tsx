"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import type { SyncState } from "@/lib/types";

export default function GeneralFreightPage() {
  const { generalFreightJobs } = useApp();
  const [search, setSearch] = useState("");
  const [syncFilter, setSyncFilter] = useState("all");

  const filtered = generalFreightJobs.filter((j) => {
    const matchSearch =
      j.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
      j.customerName.toLowerCase().includes(search.toLowerCase()) ||
      j.externalSystem.toLowerCase().includes(search.toLowerCase());
    const matchSync = syncFilter === "all" || j.syncState === syncFilter;
    return matchSearch && matchSync;
  });

  const syncStates: SyncState[] = ["Synced", "Pending", "Syncing", "Error", "Needs Review"];

  return (
    <div>
      <PageHeader
        title="General Freight"
        description="Third-party TMS integration — Transvirtual, Transmate, Internet Courier"
        action={{ label: "Create Request", href: "/general-freight/new" }}
      />
      <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        General Freight is managed via third-party supplier/TMS systems. Not integrated with Xero in Phase 1.
      </div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <select value={syncFilter} onChange={(e) => setSyncFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="all">All sync states</option>
          {syncStates.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Job #</th>
              <th className="px-5 py-3">External System</th>
              <th className="px-5 py-3">External ID</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Supplier</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Sync</th>
              <th className="px-5 py-3">Last Synced</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/general-freight/${job.id}`} className="font-medium text-sky-600 hover:underline">
                    {job.jobNumber}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{job.externalSystem}</td>
                <td className="px-5 py-3 text-slate-500">{job.externalJobId}</td>
                <td className="px-5 py-3 text-slate-600">{job.customerName}</td>
                <td className="px-5 py-3 text-slate-500">{job.supplierName}</td>
                <td className="px-5 py-3"><StatusBadge status={job.status} /></td>
                <td className="px-5 py-3"><StatusBadge status={job.syncState} /></td>
                <td className="px-5 py-3 text-slate-500">{formatDateTime(job.lastSynced)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

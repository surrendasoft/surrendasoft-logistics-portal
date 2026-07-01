"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { formatDate } from "@/lib/utils";
import type { ProjectFreightStatus } from "@/lib/types";

const statuses: ProjectFreightStatus[] = [
  "Draft", "Pending", "In Progress", "Waiting on Supplier", "Completed", "Cancelled",
];

export default function ProjectFreightPage() {
  const { projectFreightJobs } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = projectFreightJobs.filter((j) => {
    const matchSearch =
      j.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
      j.customerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || j.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <DemoBanner message="Project Freight is managed inside the portal. This is demo data — create and edit forms show the full field set." />
      <PageHeader
        title="Project Freight"
        description="Internal project freight jobs managed in Romann Logistics"
        action={{ label: "Create Job", href: "/project-freight/new" }}
      />
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Job #</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Supplier</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Due Date</th>
              <th className="px-5 py-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/project-freight/${job.id}`} className="font-medium text-sky-600 hover:underline">
                    {job.jobNumber}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{job.customerName}</td>
                <td className="px-5 py-3 text-slate-500">{job.assignedSupplierName || "—"}</td>
                <td className="px-5 py-3"><StatusBadge status={job.status} /></td>
                <td className="px-5 py-3 text-slate-500">{formatDate(job.dueDate)}</td>
                <td className="px-5 py-3 text-slate-500 text-xs">{job.paymentStatusRef}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

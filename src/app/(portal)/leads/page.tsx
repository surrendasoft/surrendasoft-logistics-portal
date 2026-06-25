"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = [
  "New",
  "Contacted",
  "Proposal",
  "Follow Up",
  "Won",
  "Lost",
];

export default function LeadsPage() {
  const { leads } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.companyName.toLowerCase().includes(search.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Manage sales leads and CRM pipeline"
        action={{ label: "Add Lead", href: "/leads/new" }}
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Freight Type</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Follow-up</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={`/leads/${lead.id}`} className="font-medium text-sky-600 hover:underline">
                    {lead.companyName}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-600">{lead.contactPerson}</td>
                <td className="px-5 py-3 text-slate-500">{lead.leadSource}</td>
                <td className="px-5 py-3 text-slate-600">{lead.freightType}</td>
                <td className="px-5 py-3"><StatusBadge status={lead.status} /></td>
                <td className="px-5 py-3 text-slate-500">{formatDate(lead.followUpDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { formatDate } from "@/lib/utils";
import type { ExternalSystem } from "@/lib/types";

const platforms: ExternalSystem[] = [
  "Transvirtual",
  "Transmate",
  "Internet Courier",
  "Other Supplier System",
];

export default function ConsignmentsPage() {
  const { consignments } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const statuses = Array.from(new Set(consignments.map((c) => c.status)));

  const filtered = consignments.filter((c) => {
    const matchSearch =
      c.consignmentId.toLowerCase().includes(search.toLowerCase()) ||
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.senderName.toLowerCase().includes(search.toLowerCase()) ||
      c.receiverName.toLowerCase().includes(search.toLowerCase()) ||
      c.receiverSuburb.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchPlatform = platformFilter === "all" || c.externalSystem === platformFilter;
    const matchDate = !dateFilter || c.bookingDate === dateFilter;
    return matchSearch && matchStatus && matchPlatform && matchDate;
  });

  return (
    <div>
      <DemoBanner message="Consignments mirror third-party platform data (Transvirtual, Transmate, Internet Courier). This is demo data — the platform stays the source of truth." />
      <PageHeader
        title="Consignments"
        description="External consignment references linked to General Freight records (TransVirtual-style view)"
      />
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search ID, sender, receiver, suburb..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 min-w-64"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="all">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="all">All platforms</option>
          {platforms.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          aria-label="Booking date"
        />
        {(statusFilter !== "all" || platformFilter !== "all" || dateFilter || search) && (
          <button
            onClick={() => { setSearch(""); setStatusFilter("all"); setPlatformFilter("all"); setDateFilter(""); }}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-4 py-3">Consignment ID</th>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Sender</th>
              <th className="px-4 py-3">Receiver</th>
              <th className="px-4 py-3">Suburb</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3">Cubic</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">GF Job</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((con) => (
              <tr key={con.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/consignments/${con.id}`} className="font-medium text-sky-600 hover:underline">
                    {con.consignmentId}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(con.bookingDate)}</td>
                <td className="px-4 py-3 text-slate-600">{con.externalSystem}</td>
                <td className="px-4 py-3 text-slate-600">{con.senderName}</td>
                <td className="px-4 py-3 text-slate-600">{con.receiverName}</td>
                <td className="px-4 py-3 text-slate-500">{con.receiverSuburb}</td>
                <td className="px-4 py-3 text-slate-500">{con.quantity}</td>
                <td className="px-4 py-3 text-slate-500">{con.weight}</td>
                <td className="px-4 py-3 text-slate-500">{con.cubic}</td>
                <td className="px-4 py-3"><StatusBadge status={con.status} /></td>
                <td className="px-4 py-3">
                  <Link href={`/general-freight/${con.generalFreightJobId}`} className="text-sky-600 hover:underline">
                    {con.generalFreightJobNumber}
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-sm text-slate-500">
                  No consignments match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

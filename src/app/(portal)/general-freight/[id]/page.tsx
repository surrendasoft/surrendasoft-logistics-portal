"use client";

import { use } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { RefreshCw, AlertTriangle } from "lucide-react";

export default function GeneralFreightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { generalFreightJobs, syncGeneralFreight } = useApp();
  const job = generalFreightJobs.find((j) => j.id === id);

  if (!job) {
    return <div className="text-center py-12 text-slate-500">Job not found</div>;
  }

  const isPrimaryCandidate = job.externalSystem === "Transvirtual";

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{job.jobNumber}</h1>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={job.status} />
            <StatusBadge status={job.syncState} />
            <span className="text-sm text-slate-500">{job.externalSystem}</span>
          </div>
        </div>
        <button
          onClick={() => syncGeneralFreight(id)}
          disabled={job.syncState === "Syncing"}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${job.syncState === "Syncing" ? "animate-spin" : ""}`} />
          {job.syncState === "Syncing" ? "Syncing..." : "Sync Now"}
        </button>
      </div>

      {job.errorMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Sync Error</p>
            <p className="text-sm text-red-700">{job.errorMessage}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Job Details</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="External System" value={job.externalSystem} />
            <Detail label="External Job / Consignment ID" value={job.externalJobId || "—"} />
            <Detail label="Customer" value={job.customerName} />
            <Detail label="Supplier / TMS" value={job.supplierName} />
            <Detail label="Status" value={job.status} />
            <Detail label="Last Synced" value={formatDateTime(job.lastSynced)} />
          </dl>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Third-Party Integration</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Sync State</span>
              <StatusBadge status={job.syncState} />
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">API Position</span>
              {isPrimaryCandidate ? (
                <span className="text-sky-600 font-medium">Primary candidate</span>
              ) : (
                <span className="text-slate-500 font-medium">Manual / reference</span>
              )}
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Xero Integration</span>
              <span className="text-slate-400">Reference only (Phase 1)</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            {isPrimaryCandidate
              ? `${job.externalSystem} is the primary Phase 1 API candidate — a live read/create proof-of-concept is targeted, subject to API access. Demo placeholder only.`
              : `${job.externalSystem} is manual / reference in Phase 1. A live API is a potential bonus if vendor API access is confirmed in writing. Demo placeholder only.`}
          </p>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Sender & Receiver</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="Sender" value={job.senderName || "—"} />
            <Detail label="Sender Address" value={job.senderAddress || "—"} />
            <Detail label="Receiver" value={job.receiverName || "—"} />
            <Detail label="Receiver Address" value={job.receiverAddress || "—"} />
            <Detail label="Receiver Suburb" value={job.receiverSuburb || "—"} />
            <Detail label="Pickup" value={job.pickupDetails || "—"} />
            <Detail label="Delivery" value={job.deliveryDetails || "—"} />
          </dl>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Freight Details</h2>
          <dl className="grid grid-cols-3 gap-4 text-sm">
            <Detail label="Quantity" value={job.quantity || "—"} />
            <Detail label="Weight" value={job.weight || "—"} />
            <Detail label="Cubic" value={job.cubic || "—"} />
          </dl>
          <div className="mt-4">
            <p className="text-slate-500 text-sm">Notes</p>
            <p className="font-medium text-slate-900 mt-0.5 text-sm">{job.notes || "—"}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/consignments" className="text-sm text-sky-600 hover:underline">
          View related consignments →
        </Link>
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

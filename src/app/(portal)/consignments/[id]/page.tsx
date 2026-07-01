"use client";

import { use } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatDateTime } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

export default function ConsignmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { consignments, showToast } = useApp();
  const consignment = consignments.find((c) => c.id === id);

  if (!consignment) {
    return <div className="text-center py-12 text-slate-500">Consignment not found</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{consignment.consignmentId}</h1>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={consignment.status} />
            <span className="text-sm text-slate-500">{consignment.externalSystem}</span>
          </div>
        </div>
        <button
          onClick={() => showToast("Demo: Consignment refreshed from " + consignment.externalSystem)}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
        >
          <RefreshCw className="h-4 w-4" /> Refresh from platform
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Consignment Details</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="Platform" value={consignment.externalSystem} />
            <Detail label="Booking Date" value={formatDate(consignment.bookingDate)} />
            <Detail label="Customer" value={consignment.customerName} />
            <Detail label="Supplier" value={consignment.supplierName} />
            <Detail label="Last Synced" value={formatDateTime(consignment.lastSynced)} />
            <Detail label="Status" value={consignment.status} />
          </dl>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Sender & Receiver</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="Sender" value={consignment.senderName} />
            <Detail label="Receiver" value={consignment.receiverName} />
            <Detail label="Receiver Suburb" value={consignment.receiverSuburb} />
          </dl>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Freight Details</h2>
          <dl className="grid grid-cols-3 gap-4 text-sm">
            <Detail label="Quantity" value={consignment.quantity} />
            <Detail label="Weight" value={consignment.weight} />
            <Detail label="Cubic" value={consignment.cubic} />
          </dl>
          <div className="mt-4">
            <p className="text-slate-500 text-sm">Notes</p>
            <p className="font-medium text-slate-900 mt-0.5 text-sm">{consignment.notes || "—"}</p>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Linked Records</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">General Freight Job</span>
              <Link href={`/general-freight/${consignment.generalFreightJobId}`} className="text-sky-600 hover:underline font-medium">
                {consignment.generalFreightJobNumber}
              </Link>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Xero Integration</span>
              <span className="text-slate-400">Not connected (Phase 1)</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            {consignment.externalSystem} remains the source of truth for this consignment. The portal stores references and sync status only.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/consignments" className="text-sm text-sky-600 hover:underline">
          ← Back to consignments
        </Link>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900 mt-0.5">{value || "—"}</dd>
    </div>
  );
}

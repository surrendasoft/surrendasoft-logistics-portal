"use client";

import { use } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Pencil, Upload } from "lucide-react";

export default function ComplianceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { complianceRecords, showToast } = useApp();
  const record = complianceRecords.find((r) => r.id === id);

  if (!record) {
    return <div className="text-center py-12 text-slate-500">Record not found</div>;
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{record.documentType}</h1>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={record.status} />
            <Link href={`/suppliers/${record.supplierId}`} className="text-sm text-sky-600 hover:underline">
              {record.supplierName}
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showToast("Demo: Document upload placeholder")}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Upload className="h-4 w-4" /> Upload
          </button>
          <Link
            href={`/compliance/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" /> Edit
          </Link>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm space-y-4">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <Detail label="Supplier" value={record.supplierName} />
          <Detail label="Document Type" value={record.documentType} />
          <Detail label="Document Name" value={record.documentName || "—"} />
          <Detail label="Expiry Date" value={formatDate(record.expiryDate)} />
          <Detail label="Status" value={record.status} />
        </dl>
        {record.notes && (
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-1">Notes</h3>
            <p className="text-sm text-slate-600">{record.notes}</p>
          </div>
        )}
        <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">
          Future: Firebase AI Integration may extract expiry dates from uploaded documents.
        </p>
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

"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { ComplianceStatus } from "@/lib/types";

export default function EditCompliancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { complianceRecords, updateCompliance } = useApp();
  const record = complianceRecords.find((r) => r.id === id);

  if (!record) {
    return <div className="text-center py-12 text-slate-500">Record not found</div>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateCompliance({
      ...record!,
      documentName: form.get("documentName") as string,
      expiryDate: form.get("expiryDate") as string,
      status: form.get("status") as ComplianceStatus,
      notes: form.get("notes") as string,
    });
    router.push(`/compliance/${id}`);
  }

  return (
    <div>
      <PageHeader title="Edit Compliance Record" description={record.supplierName} />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
            <p className="text-sm py-2">{record.supplierName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
            <p className="text-sm py-2">{record.documentType}</p>
          </div>
          <Field label="Document Name" name="documentName" defaultValue={record.documentName} />
          <Field label="Expiry Date" name="expiryDate" type="date" defaultValue={record.expiryDate} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" defaultValue={record.status} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {["Valid", "Expiring Soon", "Expired", "Missing"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={2} defaultValue={record.notes} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Save Changes</button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", defaultValue }: { label: string; name: string; type?: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input name={name} type={type} defaultValue={defaultValue} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
    </div>
  );
}

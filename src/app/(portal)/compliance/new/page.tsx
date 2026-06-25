"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { ComplianceRecord, ComplianceStatus, DocumentType } from "@/lib/types";

export default function NewCompliancePage() {
  const router = useRouter();
  const { addCompliance, suppliers, showToast } = useApp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const supplierId = form.get("supplierId") as string;
    const supplier = suppliers.find((s) => s.id === supplierId);

    const record: ComplianceRecord = {
      id: `comp-${Date.now()}`,
      supplierId,
      supplierName: supplier?.name || "",
      documentType: form.get("documentType") as DocumentType,
      documentName: form.get("documentName") as string,
      expiryDate: form.get("expiryDate") as string,
      status: form.get("status") as ComplianceStatus,
      notes: form.get("notes") as string,
    };
    addCompliance(record);
    router.push("/compliance");
  }

  function handleUpload() {
    showToast("Demo: Document upload placeholder — PDF would be stored here");
  }

  return (
    <div>
      <PageHeader title="Add Compliance Document" />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Supplier / Agent</label>
            <select name="supplierId" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
            <select name="documentType" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {["Insurance", "Public Liability", "Police Check", "Licence", "Contractor Agreement", "Other"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <Field label="Document Name" name="documentName" />
          <Field label="Expiry Date" name="expiryDate" type="date" />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="Valid">Valid</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
              <option value="Missing">Missing</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
          <button
            type="button"
            onClick={handleUpload}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Upload Document (placeholder)
          </button>
          <p className="mt-2 text-xs text-slate-400">
            Future: Firebase AI Integration may extract expiry dates from uploaded documents.
          </p>
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Save Record</button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input name={name} type={type} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
    </div>
  );
}

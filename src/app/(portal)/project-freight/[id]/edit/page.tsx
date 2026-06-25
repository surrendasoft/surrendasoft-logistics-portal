"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { ProjectFreightStatus } from "@/lib/types";

export default function EditProjectFreightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { projectFreightJobs, updateProjectFreight, customers, suppliers } = useApp();
  const job = projectFreightJobs.find((j) => j.id === id);

  if (!job) {
    return <div className="text-center py-12 text-slate-500">Job not found</div>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const supplierId = form.get("supplierId") as string;
    const supplier = suppliers.find((s) => s.id === supplierId);
    updateProjectFreight({
      ...job!,
      contactPerson: form.get("contactPerson") as string,
      pickupDetails: form.get("pickupDetails") as string,
      deliveryDetails: form.get("deliveryDetails") as string,
      jobDescription: form.get("jobDescription") as string,
      status: form.get("status") as ProjectFreightStatus,
      dueDate: form.get("dueDate") as string,
      assignedSupplierId: supplierId,
      assignedSupplierName: supplier?.name || "",
      internalNotes: form.get("internalNotes") as string,
      xeroInvoiceRef: form.get("xeroInvoiceRef") as string,
      paymentStatusRef: form.get("paymentStatusRef") as string,
    });
    router.push(`/project-freight/${id}`);
  }

  return (
    <div>
      <PageHeader title="Edit Project Freight Job" description={job.jobNumber} />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
            <p className="text-sm text-slate-900 py-2">{job.customerName}</p>
          </div>
          <Field label="Contact Person" name="contactPerson" defaultValue={job.contactPerson} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Supplier</label>
            <select name="supplierId" defaultValue={job.assignedSupplierId} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="">— Select —</option>
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" defaultValue={job.status} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {["Draft", "Pending", "In Progress", "Waiting on Supplier", "Completed", "Cancelled"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <Field label="Due Date" name="dueDate" type="date" defaultValue={job.dueDate} />
          <Field label="Xero Invoice Ref" name="xeroInvoiceRef" defaultValue={job.xeroInvoiceRef} />
          <Field label="Payment Status" name="paymentStatusRef" defaultValue={job.paymentStatusRef} />
        </div>
        <TextArea label="Pickup Details" name="pickupDetails" defaultValue={job.pickupDetails} />
        <TextArea label="Delivery Details" name="deliveryDetails" defaultValue={job.deliveryDetails} />
        <TextArea label="Job Description" name="jobDescription" defaultValue={job.jobDescription} rows={3} />
        <TextArea label="Internal Notes" name="internalNotes" defaultValue={job.internalNotes} />
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

function TextArea({ label, name, defaultValue, rows = 2 }: { label: string; name: string; defaultValue: string; rows?: number }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <textarea name={name} rows={rows} defaultValue={defaultValue} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
    </div>
  );
}

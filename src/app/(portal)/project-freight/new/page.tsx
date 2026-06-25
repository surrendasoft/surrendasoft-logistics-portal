"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { ProjectFreightJob, ProjectFreightStatus } from "@/lib/types";

export default function NewProjectFreightPage() {
  const router = useRouter();
  const { addProjectFreight, customers, suppliers } = useApp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customerId = form.get("customerId") as string;
    const customer = customers.find((c) => c.id === customerId);
    const supplierId = form.get("supplierId") as string;
    const supplier = suppliers.find((s) => s.id === supplierId);
    const jobNumber = `PF-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const job: ProjectFreightJob = {
      id: `pf-${Date.now()}`,
      jobNumber,
      customerId,
      customerName: customer?.companyName || "",
      contactPerson: form.get("contactPerson") as string,
      pickupDetails: form.get("pickupDetails") as string,
      deliveryDetails: form.get("deliveryDetails") as string,
      jobDescription: form.get("jobDescription") as string,
      status: form.get("status") as ProjectFreightStatus,
      dueDate: form.get("dueDate") as string,
      assignedSupplierId: supplierId,
      assignedSupplierName: supplier?.name || "",
      internalNotes: form.get("internalNotes") as string,
      xeroContactRef: customer?.xeroContactRef || "",
      xeroInvoiceRef: "",
      paymentStatusRef: "Draft",
      tasks: [],
    };
    addProjectFreight(job);
    router.push("/project-freight");
  }

  return (
    <div>
      <PageHeader title="Create Project Freight Job" />
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
            <select name="customerId" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {customers.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </select>
          </div>
          <Field label="Contact Person" name="contactPerson" />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Supplier</label>
            <select name="supplierId" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="">— Select —</option>
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <Field label="Due Date" name="dueDate" type="date" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Details</label>
          <textarea name="pickupDetails" rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Details</label>
          <textarea name="deliveryDetails" rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
          <textarea name="jobDescription" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
          <textarea name="internalNotes" rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Create Job</button>
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

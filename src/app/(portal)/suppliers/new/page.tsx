"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Supplier } from "@/lib/types";

export default function NewSupplierPage() {
  const router = useRouter();
  const { addSupplier } = useApp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const supplier: Supplier = {
      id: `sup-${Date.now()}`,
      name: form.get("name") as string,
      contactPerson: form.get("contactPerson") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      serviceType: form.get("serviceType") as string,
      relatedSystem: form.get("relatedSystem") as string,
      notes: form.get("notes") as string,
      complianceStatus: "Missing",
    };
    addSupplier(supplier);
    router.push("/suppliers");
  }

  return (
    <div>
      <PageHeader title="Add Supplier / Agent" />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Supplier Name" name="name" required />
          <Field label="Contact Person" name="contactPerson" />
          <Field label="Phone" name="phone" />
          <Field label="Email" name="email" type="email" />
          <Field label="Service Type" name="serviceType" />
          <Field label="Related System/Platform" name="relatedSystem" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Save Supplier</button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input name={name} type={type} required={required} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
    </div>
  );
}

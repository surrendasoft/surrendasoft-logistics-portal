"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";

export default function EditSupplierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { suppliers, updateSupplier } = useApp();
  const supplier = suppliers.find((s) => s.id === id);

  if (!supplier) {
    return <div className="text-center py-12 text-slate-500">Supplier not found</div>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateSupplier({
      ...supplier!,
      name: form.get("name") as string,
      contactPerson: form.get("contactPerson") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      serviceType: form.get("serviceType") as string,
      relatedSystem: form.get("relatedSystem") as string,
      notes: form.get("notes") as string,
    });
    router.push(`/suppliers/${id}`);
  }

  return (
    <div>
      <PageHeader title="Edit Supplier" description={supplier.name} />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Supplier Name" name="name" defaultValue={supplier.name} required />
          <Field label="Contact Person" name="contactPerson" defaultValue={supplier.contactPerson} />
          <Field label="Phone" name="phone" defaultValue={supplier.phone} />
          <Field label="Email" name="email" type="email" defaultValue={supplier.email} />
          <Field label="Service Type" name="serviceType" defaultValue={supplier.serviceType} />
          <Field label="Related System" name="relatedSystem" defaultValue={supplier.relatedSystem} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={3} defaultValue={supplier.notes} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Save Changes</button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", defaultValue, required }: { label: string; name: string; type?: string; defaultValue: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input name={name} type={type} defaultValue={defaultValue} required={required} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
    </div>
  );
}

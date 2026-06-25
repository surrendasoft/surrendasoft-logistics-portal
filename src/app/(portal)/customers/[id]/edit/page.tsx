"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { customers, updateCustomer } = useApp();
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return <div className="text-center py-12 text-slate-500">Customer not found</div>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateCustomer({
      ...customer!,
      companyName: form.get("companyName") as string,
      contactPerson: form.get("contactPerson") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      address: form.get("address") as string,
      notes: form.get("notes") as string,
      xeroContactRef: form.get("xeroContactRef") as string,
    });
    router.push(`/customers/${id}`);
  }

  return (
    <div>
      <PageHeader title="Edit Customer" description={customer.companyName} />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Name" name="companyName" defaultValue={customer.companyName} required />
          <Field label="Contact Person" name="contactPerson" defaultValue={customer.contactPerson} required />
          <Field label="Phone" name="phone" defaultValue={customer.phone} />
          <Field label="Email" name="email" type="email" defaultValue={customer.email} />
          <Field label="Xero Contact Ref" name="xeroContactRef" defaultValue={customer.xeroContactRef} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
          <input name="address" defaultValue={customer.address} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={3} defaultValue={customer.notes} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
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

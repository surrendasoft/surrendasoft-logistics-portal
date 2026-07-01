"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { GeneralFreightJob, ExternalSystem, SyncState } from "@/lib/types";

export default function NewGeneralFreightPage() {
  const router = useRouter();
  const { addGeneralFreight, customers, suppliers } = useApp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const customerId = form.get("customerId") as string;
    const customer = customers.find((c) => c.id === customerId);
    const supplierId = form.get("supplierId") as string;
    const supplier = suppliers.find((s) => s.id === supplierId);
    const jobNumber = `GF-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const job: GeneralFreightJob = {
      id: `gf-${Date.now()}`,
      jobNumber,
      externalSystem: form.get("externalSystem") as ExternalSystem,
      externalJobId: form.get("externalJobId") as string,
      customerId,
      customerName: customer?.companyName || "",
      supplierId,
      supplierName: supplier?.name || "",
      senderName: form.get("senderName") as string,
      senderAddress: form.get("senderAddress") as string,
      receiverName: form.get("receiverName") as string,
      receiverAddress: form.get("receiverAddress") as string,
      receiverSuburb: form.get("receiverSuburb") as string,
      pickupDetails: form.get("pickupDetails") as string,
      deliveryDetails: form.get("deliveryDetails") as string,
      quantity: form.get("quantity") as string,
      weight: form.get("weight") as string,
      cubic: form.get("cubic") as string,
      notes: form.get("notes") as string,
      status: "Draft",
      lastSynced: new Date().toISOString(),
      syncState: "Pending" as SyncState,
    };
    addGeneralFreight(job);
    router.push("/general-freight");
  }

  return (
    <div>
      <PageHeader title="Create General Freight Request" />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Customer</label>
            <select name="customerId" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {customers.map((c) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Supplier / TMS Platform</label>
            <select name="supplierId" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">External System</label>
            <select name="externalSystem" required className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="Transvirtual">Transvirtual</option>
              <option value="Transmate">Transmate</option>
              <option value="Internet Courier">Internet Courier</option>
              <option value="Other Supplier System">Other Supplier System</option>
            </select>
          </div>
          <Field label="External Job / Consignment ID" name="externalJobId" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg bg-slate-50 p-4">
          <div className="sm:col-span-2 text-sm font-semibold text-slate-700">Sender</div>
          <Field label="Sender Name" name="senderName" />
          <Field label="Sender Address" name="senderAddress" />
          <div className="sm:col-span-2 text-sm font-semibold text-slate-700 mt-2">Receiver</div>
          <Field label="Receiver Name" name="receiverName" />
          <Field label="Receiver Address" name="receiverAddress" />
          <Field label="Receiver Suburb" name="receiverSuburb" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Pickup Details" name="pickupDetails" />
          <Field label="Delivery Details" name="deliveryDetails" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Quantity" name="quantity" />
          <Field label="Weight" name="weight" />
          <Field label="Cubic" name="cubic" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={2} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>

        <p className="text-xs text-slate-500">Request will be created in the third-party system via integration placeholder (demo).</p>
        <div className="flex gap-3">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">Create Request</button>
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
      <input name={name} type={type} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500" />
    </div>
  );
}

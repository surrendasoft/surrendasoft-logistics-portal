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
      externalJobId: "",
      customerId,
      customerName: customer?.companyName || "",
      supplierId,
      supplierName: supplier?.name || "",
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

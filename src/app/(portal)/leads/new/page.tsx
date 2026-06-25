"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { Lead, LeadStatus, FreightType } from "@/lib/types";

export default function NewLeadPage() {
  const router = useRouter();
  const { addLead } = useApp();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lead: Lead = {
      id: `lead-${Date.now()}`,
      companyName: form.get("companyName") as string,
      contactPerson: form.get("contactPerson") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      leadSource: form.get("leadSource") as string,
      status: form.get("status") as LeadStatus,
      notes: form.get("notes") as string,
      followUpDate: form.get("followUpDate") as string,
      freightType: form.get("freightType") as FreightType,
    };
    addLead(lead);
    router.push("/leads");
  }

  return (
    <div>
      <PageHeader title="Add Lead" description="Create a new sales lead" />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Name" name="companyName" required />
          <Field label="Contact Person" name="contactPerson" required />
          <Field label="Phone" name="phone" />
          <Field label="Email" name="email" type="email" />
          <Field label="Lead Source" name="leadSource" />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Proposal">Proposal</option>
              <option value="Follow Up">Follow Up</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Freight Type</label>
            <select name="freightType" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="Project Freight">Project Freight</option>
              <option value="General Freight">General Freight</option>
            </select>
          </div>
          <Field label="Follow-up Date" name="followUpDate" type="date" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={3} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700">
            Save Lead
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
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

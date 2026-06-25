"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import type { LeadStatus, FreightType } from "@/lib/types";

export default function EditLeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { leads, updateLead } = useApp();
  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return <div className="text-center py-12 text-slate-500">Lead not found</div>;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    updateLead({
      ...lead!,
      companyName: form.get("companyName") as string,
      contactPerson: form.get("contactPerson") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      leadSource: form.get("leadSource") as string,
      status: form.get("status") as LeadStatus,
      notes: form.get("notes") as string,
      followUpDate: form.get("followUpDate") as string,
      freightType: form.get("freightType") as FreightType,
    });
    router.push(`/leads/${id}`);
  }

  return (
    <div>
      <PageHeader title="Edit Lead" description={lead.companyName} />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company Name" name="companyName" defaultValue={lead.companyName} required />
          <Field label="Contact Person" name="contactPerson" defaultValue={lead.contactPerson} required />
          <Field label="Phone" name="phone" defaultValue={lead.phone} />
          <Field label="Email" name="email" type="email" defaultValue={lead.email} />
          <Field label="Lead Source" name="leadSource" defaultValue={lead.leadSource} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select name="status" defaultValue={lead.status} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              {["New", "Contacted", "Proposal", "Follow Up", "Won", "Lost"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Freight Type</label>
            <select name="freightType" defaultValue={lead.freightType} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="Project Freight">Project Freight</option>
              <option value="General Freight">General Freight</option>
            </select>
          </div>
          <Field label="Follow-up Date" name="followUpDate" type="date" defaultValue={lead.followUpDate} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea name="notes" rows={3} defaultValue={lead.notes} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div className="flex gap-3 pt-2">
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

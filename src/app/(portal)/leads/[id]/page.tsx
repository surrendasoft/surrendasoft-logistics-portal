"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Pencil, UserPlus, Briefcase } from "lucide-react";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { leads, convertLeadToCustomer, showToast } = useApp();
  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return <div className="text-center py-12 text-slate-500">Lead not found</div>;
  }

  const currentLead = lead;

  function handleConvert() {
    const customer = convertLeadToCustomer(id);
    if (customer) router.push(`/customers/${customer.id}`);
  }

  function handleConvertToJob() {
    showToast("Demo: Would create job from lead");
    if (currentLead.freightType === "Project Freight") {
      router.push("/project-freight/new");
    } else {
      router.push("/general-freight/new");
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{currentLead.companyName}</h1>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={currentLead.status} />
            <span className="text-sm text-slate-500">{currentLead.freightType}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/leads/${id}/edit`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" /> Edit
          </Link>
          <button
            onClick={handleConvert}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <UserPlus className="h-4 w-4" /> Convert to Customer
          </button>
          <button
            onClick={handleConvertToJob}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            <Briefcase className="h-4 w-4" /> Create Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-900">Contact Details</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Detail label="Contact Person" value={lead.contactPerson} />
            <Detail label="Phone" value={lead.phone} />
            <Detail label="Email" value={lead.email} />
            <Detail label="Lead Source" value={lead.leadSource} />
            <Detail label="Follow-up Date" value={formatDate(lead.followUpDate)} />
            <Detail label="Freight Type" value={lead.freightType} />
          </dl>
        </div>
        <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-3">Notes</h2>
          <p className="text-sm text-slate-600">{lead.notes || "No notes"}</p>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900 mt-0.5">{value}</dd>
    </div>
  );
}

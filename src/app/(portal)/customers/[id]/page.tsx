"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tabs } from "@/components/ui/Tabs";
import { formatDate } from "@/lib/utils";
import { Pencil } from "lucide-react";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { customers, projectFreightJobs, generalFreightJobs } = useApp();
  const [activeTab, setActiveTab] = useState("details");
  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return <div className="text-center py-12 text-slate-500">Customer not found</div>;
  }

  const relatedPF = projectFreightJobs.filter((j) => j.customerId === id);
  const relatedGF = generalFreightJobs.filter((j) => j.customerId === id);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{customer.companyName}</h1>
          <p className="text-sm text-slate-500 mt-1">{customer.contactPerson}</p>
        </div>
        <Link
          href={`/customers/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Pencil className="h-4 w-4" /> Edit
        </Link>
      </div>

      <Tabs
        tabs={[
          { id: "details", label: "Details" },
          { id: "jobs", label: "Related Jobs" },
          { id: "notes", label: "Notes" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === "details" && (
          <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Contact Person" value={customer.contactPerson} />
              <Detail label="Phone" value={customer.phone} />
              <Detail label="Email" value={customer.email} />
              <Detail label="Xero Contact Ref" value={customer.xeroContactRef || "—"} />
              <Detail label="Address" value={customer.address} className="col-span-2" />
            </dl>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 font-medium text-sm">Project Freight Jobs</div>
              {relatedPF.length === 0 ? (
                <p className="px-5 py-6 text-sm text-slate-500">No project freight jobs</p>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {relatedPF.map((j) => (
                      <tr key={j.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <Link href={`/project-freight/${j.id}`} className="text-sky-600 hover:underline font-medium">{j.jobNumber}</Link>
                        </td>
                        <td className="px-5 py-3"><StatusBadge status={j.status} /></td>
                        <td className="px-5 py-3 text-slate-500">{formatDate(j.dueDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 font-medium text-sm">General Freight Jobs</div>
              {relatedGF.length === 0 ? (
                <p className="px-5 py-6 text-sm text-slate-500">No general freight jobs</p>
              ) : (
                <table className="w-full text-sm">
                  <tbody>
                    {relatedGF.map((j) => (
                      <tr key={j.id} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <Link href={`/general-freight/${j.id}`} className="text-sky-600 hover:underline font-medium">{j.jobNumber}</Link>
                        </td>
                        <td className="px-5 py-3"><StatusBadge status={j.status} /></td>
                        <td className="px-5 py-3"><StatusBadge status={j.syncState} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
            <p className="text-sm text-slate-600">{customer.notes || "No notes recorded"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900 mt-0.5">{value}</dd>
    </div>
  );
}

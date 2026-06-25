"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tabs } from "@/components/ui/Tabs";
import { formatDate } from "@/lib/utils";
import { Pencil } from "lucide-react";

export default function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { suppliers, complianceRecords, projectFreightJobs, generalFreightJobs } = useApp();
  const [activeTab, setActiveTab] = useState("details");
  const supplier = suppliers.find((s) => s.id === id);

  if (!supplier) {
    return <div className="text-center py-12 text-slate-500">Supplier not found</div>;
  }

  const compliance = complianceRecords.filter((c) => c.supplierId === id);
  const relatedPF = projectFreightJobs.filter((j) => j.assignedSupplierId === id);
  const relatedGF = generalFreightJobs.filter((j) => j.supplierId === id);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{supplier.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={supplier.complianceStatus} />
            <span className="text-sm text-slate-500">{supplier.serviceType}</span>
          </div>
        </div>
        <Link
          href={`/suppliers/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Pencil className="h-4 w-4" /> Edit
        </Link>
      </div>

      <Tabs
        tabs={[
          { id: "details", label: "Details" },
          { id: "compliance", label: "Compliance" },
          { id: "jobs", label: "Related Jobs" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === "details" && (
          <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Contact Person" value={supplier.contactPerson} />
              <Detail label="Phone" value={supplier.phone} />
              <Detail label="Email" value={supplier.email} />
              <Detail label="Service Type" value={supplier.serviceType} />
              <Detail label="System/Platform" value={supplier.relatedSystem} />
              <Detail label="Compliance Status" value={supplier.complianceStatus} />
              <Detail label="Notes" value={supplier.notes || "—"} className="col-span-2" />
            </dl>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
            {compliance.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-500 text-center">No compliance records</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
                    <th className="px-5 py-3">Document Type</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Expiry</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {compliance.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="px-5 py-3 text-slate-600">{c.documentType}</td>
                      <td className="px-5 py-3">
                        <Link href={`/compliance/${c.id}`} className="text-sky-600 hover:underline">
                          {c.documentName || "—"}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-slate-500">{formatDate(c.expiryDate)}</td>
                      <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="space-y-4">
            <JobTable title="Project Freight" jobs={relatedPF.map((j) => ({ id: j.id, number: j.jobNumber, status: j.status, href: `/project-freight/${j.id}` }))} />
            <JobTable title="General Freight" jobs={relatedGF.map((j) => ({ id: j.id, number: j.jobNumber, status: j.status, href: `/general-freight/${j.id}` }))} />
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

function JobTable({ title, jobs }: { title: string; jobs: { id: string; number: string; status: string; href: string }[] }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 font-medium text-sm">{title}</div>
      {jobs.length === 0 ? (
        <p className="px-5 py-6 text-sm text-slate-500">No jobs</p>
      ) : (
        <table className="w-full text-sm">
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3">
                  <Link href={j.href} className="text-sky-600 hover:underline font-medium">{j.number}</Link>
                </td>
                <td className="px-5 py-3"><StatusBadge status={j.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

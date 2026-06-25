"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tabs } from "@/components/ui/Tabs";
import { formatDate } from "@/lib/utils";
import { Pencil, Upload, FileText, RefreshCw } from "lucide-react";

export default function ProjectFreightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { projectFreightJobs, documents, updateProjectFreight, showToast } = useApp();
  const [activeTab, setActiveTab] = useState("overview");
  const job = projectFreightJobs.find((j) => j.id === id);

  if (!job) {
    return <div className="text-center py-12 text-slate-500">Job not found</div>;
  }

  const currentJob = job;
  const jobDocs = documents.filter((d) => d.relatedRecord === currentJob.jobNumber);

  function toggleTask(taskId: string) {
    const updated = {
      ...currentJob,
      tasks: currentJob.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed, status: !t.completed ? "Completed" : "In Progress" } : t
      ),
    };
    updateProjectFreight(updated);
  }

  function handleUpload() {
    showToast("Demo: Document upload placeholder — file would be stored here");
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{job.jobNumber}</h1>
          <div className="mt-2 flex items-center gap-3">
            <StatusBadge status={job.status} />
            <span className="text-sm text-slate-500">{job.customerName}</span>
          </div>
        </div>
        <Link
          href={`/project-freight/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Pencil className="h-4 w-4" /> Edit Job
        </Link>
      </div>

      <Tabs
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "tasks", label: "Tasks / Steps" },
          { id: "documents", label: "Documents" },
          { id: "xero", label: "Xero References" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm space-y-4">
              <h2 className="font-semibold text-slate-900">Job Details</h2>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <Detail label="Customer" value={job.customerName} />
                <Detail label="Contact" value={job.contactPerson} />
                <Detail label="Supplier" value={job.assignedSupplierName || "—"} />
                <Detail label="Due Date" value={formatDate(job.dueDate)} />
                <Detail label="Pickup" value={job.pickupDetails} className="col-span-2" />
                <Detail label="Delivery" value={job.deliveryDetails} className="col-span-2" />
                <Detail label="Description" value={job.jobDescription} className="col-span-2" />
              </dl>
            </div>
            <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-3">Internal Notes</h2>
              <p className="text-sm text-slate-600">{job.internalNotes || "No notes"}</p>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-semibold text-slate-900">Tasks & Steps</h2>
              <span className="text-xs text-slate-500">Attached to this Project Freight job only</span>
            </div>
            {job.tasks.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-500 text-center">No tasks yet</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                    <th className="px-5 py-3 w-8"></th>
                    <th className="px-5 py-3">Task</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Due</th>
                    <th className="px-5 py-3">Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {job.tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-50">
                      <td className="px-5 py-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="rounded border-slate-300 text-sky-600"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <span className="font-medium">{task.taskName}</span>
                        {task.notes && <p className="text-xs text-slate-500 mt-0.5">{task.notes}</p>}
                      </td>
                      <td className="px-5 py-3"><StatusBadge status={task.status} /></td>
                      <td className="px-5 py-3 text-slate-500">{formatDate(task.dueDate)}</td>
                      <td className="px-5 py-3 text-slate-500">{task.assignedPerson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-semibold text-slate-900">Job Documents</h2>
              <button
                onClick={handleUpload}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-700"
              >
                <Upload className="h-4 w-4" /> Upload
              </button>
            </div>
            {jobDocs.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-500 text-center">No documents uploaded</p>
            ) : (
              <ul className="divide-y divide-slate-50">
                {jobDocs.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{doc.fileName}</p>
                        <p className="text-xs text-slate-500">Uploaded {formatDate(doc.uploadedDate)} by {doc.uploadedBy}</p>
                      </div>
                    </div>
                    <button onClick={() => showToast("Demo: View/download placeholder")} className="text-sm text-sky-600 hover:underline">
                      View
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === "xero" && (
          <div className="rounded-xl bg-white border border-slate-200/60 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Xero & Payment References</h2>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">Demo placeholder</span>
            </div>
            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <Detail label="Xero Contact Reference" value={job.xeroContactRef || "—"} />
              <Detail label="Xero Invoice Reference" value={job.xeroInvoiceRef || "—"} />
              <Detail label="Payment Status" value={job.paymentStatusRef} className="col-span-2" />
            </dl>
            <button
              onClick={() => showToast("Demo: Would open Xero invoice in connected system")}
              className="inline-flex items-center gap-2 text-sm text-sky-600 hover:underline"
            >
              <RefreshCw className="h-4 w-4" /> Sync payment status from Xero (demo)
            </button>
            <p className="text-xs text-slate-400">Invoices and financial reports are managed in Xero, not in this portal.</p>
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

"use client";

import Link from "next/link";
import {
  Briefcase,
  Truck,
  Package,
  Users,
  ShieldAlert,
  CreditCard,
  ArrowRight,
  Activity,
  CheckSquare,
} from "lucide-react";
import { useApp } from "@/lib/store";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DemoBanner } from "@/components/ui/DemoBanner";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function DashboardPage() {
  const {
    projectFreightJobs,
    generalFreightJobs,
    leads,
    complianceRecords,
    activities,
  } = useApp();

  const activeJobs =
    projectFreightJobs.filter(
      (j) => !["Completed", "Cancelled", "Draft"].includes(j.status)
    ).length +
    generalFreightJobs.filter(
      (j) => !["Delivered", "Cancelled", "Draft"].includes(j.status)
    ).length;

  const openLeads = leads.filter(
    (l) => !["Won", "Lost"].includes(l.status)
  ).length;

  const expiringCompliance = complianceRecords.filter(
    (c) => c.status === "Expiring Soon" || c.status === "Expired"
  ).length;

  const pendingPayments = projectFreightJobs.filter(
    (j) =>
      j.paymentStatusRef.toLowerCase().includes("pending") ||
      j.paymentStatusRef.toLowerCase().includes("awaiting")
  ).length;

  const allTasks = projectFreightJobs.flatMap((j) =>
    j.tasks
      .filter((t) => !t.completed)
      .map((t) => ({ ...t, jobNumber: j.jobNumber, jobId: j.id }))
  );

  const recentPF = projectFreightJobs.slice(0, 5);
  const recentGF = generalFreightJobs.slice(0, 5);
  const expiringList = complianceRecords
    .filter((c) => c.status === "Expiring Soon" || c.status === "Expired")
    .slice(0, 5);
  const openLeadsList = leads
    .filter((l) => !["Won", "Lost"].includes(l.status))
    .slice(0, 5);

  return (
    <div>
      <DemoBanner />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Welcome back, Ryan. Here&apos;s your operational overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        <SummaryCard
          title="Active Jobs"
          value={activeJobs}
          icon={Briefcase}
          href="/project-freight"
          accent="blue"
        />
        <SummaryCard
          title="Project Freight"
          value={projectFreightJobs.length}
          icon={Truck}
          href="/project-freight"
          accent="teal"
        />
        <SummaryCard
          title="General Freight"
          value={generalFreightJobs.length}
          icon={Package}
          href="/general-freight"
          accent="indigo"
        />
        <SummaryCard
          title="Open Leads"
          value={openLeads}
          icon={Users}
          href="/leads"
          accent="amber"
        />
        <SummaryCard
          title="Compliance Expiring"
          value={expiringCompliance}
          icon={ShieldAlert}
          href="/compliance"
          accent="red"
        />
        <SummaryCard
          title="Pending Xero Payments"
          value={pendingPayments}
          icon={CreditCard}
          href="/project-freight"
          accent="slate"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Project Freight */}
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Recent Project Freight</h2>
            <Link
              href="/project-freight"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                  <th className="px-5 py-3">Job #</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Due</th>
                </tr>
              </thead>
              <tbody>
                {recentPF.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/project-freight/${job.id}`}
                        className="font-medium text-sky-600 hover:underline"
                      >
                        {job.jobNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{job.customerName}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="px-5 py-3 text-slate-500">{formatDate(job.dueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Freight Sync Status */}
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">General Freight Sync Status</h2>
            <Link
              href="/general-freight"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                  <th className="px-5 py-3">Job #</th>
                  <th className="px-5 py-3">System</th>
                  <th className="px-5 py-3">Sync</th>
                  <th className="px-5 py-3">Last Synced</th>
                </tr>
              </thead>
              <tbody>
                {recentGF.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/general-freight/${job.id}`}
                        className="font-medium text-sky-600 hover:underline"
                      >
                        {job.jobNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{job.externalSystem}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={job.syncState} />
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {formatDateTime(job.lastSynced)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Expiring */}
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Compliance Expiring Soon</h2>
            <Link
              href="/compliance"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-50">
            {expiringList.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/compliance/${item.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.supplierName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.documentType} — expires {formatDate(item.expiryDate)}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </Link>
              </li>
            ))}
            {expiringList.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-slate-500">
                No expiring compliance records
              </li>
            )}
          </ul>
        </div>

        {/* Open Leads */}
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Open Leads</h2>
            <Link
              href="/leads"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-50">
            {openLeadsList.map((lead) => (
              <li key={lead.id}>
                <Link
                  href={`/leads/${lead.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {lead.companyName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {lead.contactPerson} — {lead.freightType}
                    </p>
                  </div>
                  <StatusBadge status={lead.status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Tasks */}
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-sky-600" />
              My Tasks / Project Freight Steps
            </h2>
            <Link
              href="/project-freight"
              className="text-sm text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-50">
            {allTasks.slice(0, 5).map((task) => (
              <li key={task.id}>
                <Link
                  href={`/project-freight/${task.jobId}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {task.taskName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {task.jobNumber} — due {formatDate(task.dueDate)}
                    </p>
                  </div>
                  <StatusBadge status={task.status} />
                </Link>
              </li>
            ))}
            {allTasks.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-slate-500">
                No pending tasks
              </li>
            )}
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="h-4 w-4 text-sky-600" />
              Recent Activity
            </h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {activities.slice(0, 6).map((act) => (
              <li key={act.id} className="px-5 py-3">
                <p className="text-sm text-slate-700">{act.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {formatDateTime(act.timestamp)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

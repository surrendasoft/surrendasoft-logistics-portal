"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  LayoutDashboard,
  Users,
  Building2,
  Truck,
  Package,
  ClipboardList,
  UserCog,
  ShieldCheck,
  FileText,
  Settings,
  Check,
  X,
  ArrowRight,
  ExternalLink,
  ClipboardCheck,
} from "lucide-react";

const DEMO_REVIEW_CHECKLIST_URL =
  "https://docs.google.com/document/d/1BvlI1g_E04V3RQxvez2P9nmEkdoe69_vsdAxDncQ57E/edit?usp=sharing";

const modules = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, desc: "Operational overview — active jobs, sync status, compliance alerts, leads, tasks and activity." },
  { href: "/leads", label: "Leads / CRM", icon: Users, desc: "Capture enquiries, track pipeline status and convert leads into customers or jobs." },
  { href: "/customers", label: "Customers", icon: Building2, desc: "Customer records, related jobs, notes and Xero contact references." },
  { href: "/project-freight", label: "Project Freight", icon: Truck, desc: "Freight managed inside the portal — sender/receiver, tasks, documents, POD and Xero references." },
  { href: "/general-freight", label: "General Freight", icon: Package, desc: "References for third-party TMS jobs (Transvirtual, Transmate, Internet Courier) with sync status." },
  { href: "/consignments", label: "Consignments", icon: ClipboardList, desc: "TransVirtual-style consignment table with sender/receiver, qty/weight/cubic and filters." },
  { href: "/suppliers", label: "Suppliers / Agents", icon: UserCog, desc: "Supplier and agent records with compliance status and related jobs." },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck, desc: "Insurance, licence and police-check documents with expiry tracking." },
  { href: "/documents", label: "Documents", icon: FileText, desc: "Central file registry — job docs, POD, signatures, photos, customer and supplier files." },
  { href: "/settings", label: "Settings", icon: Settings, desc: "Business profile, users, branding and integration placeholders (Xero, TMS platforms)." },
];

const included = [
  "Dashboard overview",
  "Leads / CRM with convert-to-customer",
  "Customers with related jobs & Xero references",
  "Project Freight jobs (sender/receiver, tasks, documents, POD)",
  "General Freight references with sync status",
  "Consignments table with sender/receiver, qty/weight/cubic & filters",
  "Suppliers / Agents with compliance",
  "Compliance documents with expiry tracking",
  "Document uploads (POD, signatures, photos, PDFs)",
  "Xero reference fields (contact, invoice, payment status)",
  "Integration-ready structure with one platform proof-of-concept",
];

const excluded = [
  "Full replacement of TransVirtual / Transmate / Internet Courier",
  "Full replacement of Xero",
  "Full two-way production integrations with multiple platforms",
  "Full invoice or financial reporting module in the portal",
  "Live GPS tracking & route optimisation",
  "Full driver mobile app / native apps",
  "Advanced AI automation & insurance expiry scanning",
  "Email-to-job automation",
  "Complex quoting / freight rate engine",
  "Payroll & accounting features",
];

export default function DemoGuidePage() {
  return (
    <div>
      <PageHeader
        title="Demo Guide"
        description="A quick tour of the Phase 1 MVP — what this portal does, and what is in and out of scope."
      />

      <div className="mb-6 rounded-xl border border-sky-200 bg-sky-50 p-5">
        <p className="text-sm text-sky-900">
          This is a clickable prototype of the Romann Logistics MVP portal built by SurrendaSoft. Everything you see runs on
          realistic sample data so you can experience the workflow and the exact forms and fields before development begins.
          Buttons, forms, uploads and sync actions show confirmations rather than saving to a live system.
        </p>
      </div>

      <div className="mb-8 rounded-xl bg-white border border-slate-200/60 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Demo Review Checklist</h2>
              <p className="mt-1 text-sm text-slate-500">
                After clicking through the modules below, use the checklist to note what looks right, what to change, and
                anything missing before Phase 1 build starts.
              </p>
            </div>
          </div>
          <a
            href={DEMO_REVIEW_CHECKLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
          >
            Open checklist
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-slate-900 mb-3">Explore the modules</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className="group rounded-xl bg-white border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-sky-50 p-2 text-sky-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{m.label}</h3>
                <ArrowRight className="ml-auto h-4 w-4 text-slate-300 group-hover:text-sky-600 transition-colors" />
              </div>
              <p className="text-sm text-slate-500">{m.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-emerald-700">Included in Phase 1 MVP</h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 px-5 py-3">
                <Check className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-500">Not included in Phase 1 (future phases)</h2>
          </div>
          <ul className="divide-y divide-slate-50">
            {excluded.map((item) => (
              <li key={item} className="flex items-start gap-3 px-5 py-3">
                <X className="h-4 w-4 shrink-0 text-slate-300 mt-0.5" />
                <span className="text-sm text-slate-500">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white border border-slate-200/60 p-5 shadow-sm">
        <h2 className="font-semibold text-slate-900 mb-2">How it fits together</h2>
        <p className="text-sm text-slate-600">
          Project Freight is managed directly inside this portal. General Freight and Consignments stay linked to third-party
          platforms (Transvirtual, Transmate, Internet Courier), with the portal storing references and sync status. Xero
          remains the source of truth for invoices and payments — the portal shows reference fields only. This keeps Phase 1
          focused while creating a foundation for deeper integrations later.
        </p>
      </div>
    </div>
  );
}

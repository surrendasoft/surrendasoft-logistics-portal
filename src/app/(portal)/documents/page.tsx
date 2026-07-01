"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Upload } from "lucide-react";

export default function DocumentsPage() {
  const { documents, showToast } = useApp();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const types = Array.from(new Set(documents.map((d) => d.type)));

  const filtered = documents.filter((d) => {
    const matchSearch =
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.relatedRecord.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div>
      <PageHeader
        title="Documents"
        description="All uploaded files — job documents, proof of delivery, signatures, photos, customer, supplier and compliance documents"
      />
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
          <option value="all">All types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="mb-6 rounded-xl border border-dashed border-slate-300 bg-white p-6">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-medium text-slate-900">Upload a new document</p>
            <p className="text-xs text-slate-500">Delivery docs, proof-of-delivery, signatures, photos, customer, supplier or compliance PDFs</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select id="upload-type" className="rounded-lg border border-slate-200 px-3 py-2 text-sm" defaultValue="Job Document">
              {["Job Document", "Proof of Delivery", "Signature", "Delivery Photo", "Customer Document", "Supplier Document", "Insurance", "Public Liability", "Police Check", "Licence", "Contractor Agreement", "Other"].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button
              onClick={() => showToast("Demo: Document upload placeholder — file would be stored in Firebase Storage")}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              <Upload className="h-4 w-4" /> Upload
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-medium text-slate-500">
              <th className="px-5 py-3">File Name</th>
              <th className="px-5 py-3">Related Record</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Uploaded By</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((doc) => (
              <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-900">{doc.fileName}</td>
                <td className="px-5 py-3 text-slate-600">{doc.relatedRecord}</td>
                <td className="px-5 py-3 text-slate-500">{doc.type}</td>
                <td className="px-5 py-3 text-slate-500">{doc.uploadedBy}</td>
                <td className="px-5 py-3 text-slate-500">{formatDate(doc.uploadedDate)}</td>
                <td className="px-5 py-3"><StatusBadge status={doc.status} /></td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => showToast("Demo: View/download placeholder")}
                    className="text-sm text-sky-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-sm text-slate-500">
                  No documents match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

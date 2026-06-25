"use client";

import { useState } from "react";
import { useApp } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  const { documents, showToast } = useApp();
  const [search, setSearch] = useState("");

  const filtered = documents.filter(
    (d) =>
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.relatedRecord.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Documents"
        description="All uploaded documents from jobs, customers, suppliers, and compliance"
      />
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>
      <div className="rounded-xl bg-white border border-slate-200/60 shadow-sm overflow-hidden">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

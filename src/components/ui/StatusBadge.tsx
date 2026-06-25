import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700",
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-blue-100 text-blue-800",
  "Waiting on Supplier": "bg-orange-100 text-orange-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-700",
  Booked: "bg-sky-100 text-sky-800",
  "In Transit": "bg-indigo-100 text-indigo-800",
  Delivered: "bg-emerald-100 text-emerald-800",
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-cyan-100 text-cyan-800",
  Proposal: "bg-violet-100 text-violet-800",
  "Follow Up": "bg-amber-100 text-amber-800",
  Won: "bg-emerald-100 text-emerald-800",
  Lost: "bg-red-100 text-red-700",
  Valid: "bg-emerald-100 text-emerald-800",
  "Expiring Soon": "bg-amber-100 text-amber-800",
  Expired: "bg-red-100 text-red-700",
  Missing: "bg-slate-100 text-slate-600",
  Synced: "bg-emerald-100 text-emerald-800",
  Syncing: "bg-blue-100 text-blue-800",
  Error: "bg-red-100 text-red-700",
  "Needs Review": "bg-amber-100 text-amber-800",
  Connected: "bg-emerald-100 text-emerald-800",
  "Not connected": "bg-slate-100 text-slate-600",
  "Needs API credentials": "bg-amber-100 text-amber-800",
  "Sync error": "bg-red-100 text-red-700",
  Active: "bg-emerald-100 text-emerald-800",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusColors[status] || "bg-slate-100 text-slate-700"
      )}
    >
      {status}
    </span>
  );
}

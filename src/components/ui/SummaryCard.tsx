import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  accent?: "blue" | "teal" | "amber" | "red" | "indigo" | "slate";
}

const accentMap = {
  blue: "bg-sky-50 text-sky-600",
  teal: "bg-teal-50 text-teal-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
  indigo: "bg-indigo-50 text-indigo-600",
  slate: "bg-slate-100 text-slate-600",
};

export function SummaryCard({
  title,
  value,
  icon: Icon,
  href,
  accent = "blue",
}: SummaryCardProps) {
  const content = (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={cn("rounded-lg p-2.5", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

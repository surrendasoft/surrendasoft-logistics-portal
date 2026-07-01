"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronRight,
  Compass,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/demo-guide", label: "Demo Guide", icon: Compass },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/customers", label: "Customers", icon: Building2 },
  { href: "/project-freight", label: "Project Freight", icon: Truck },
  { href: "/general-freight", label: "General Freight", icon: Package },
  { href: "/consignments", label: "Consignments", icon: ClipboardList },
  { href: "/suppliers", label: "Suppliers / Agents", icon: UserCog },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-sidebar text-white">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 font-bold text-sm">
          RL
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">Romann Logistics</p>
          <p className="text-xs text-slate-400">MVP Portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-sky-600 text-white"
                      : "text-slate-300 hover:bg-sidebar-hover hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {isActive && <ChevronRight className="h-4 w-4 opacity-60" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="text-xs text-slate-400 text-center">
          Powered by SurrendaSoft
        </p>
      </div>
    </aside>
  );
}

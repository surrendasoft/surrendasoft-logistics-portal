"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, User } from "lucide-react";

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search jobs, customers, leads..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          onClick={() => {}}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900">Ryan</p>
              <p className="text-xs text-slate-500">Ryan@romannlogistics.com</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <Link href="/settings" className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                Profile
              </Link>
              <Link href="/settings" className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                Settings
              </Link>
              <hr className="my-1 border-slate-200" />
              <Link href="/login" className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">
                Sign out (demo)
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

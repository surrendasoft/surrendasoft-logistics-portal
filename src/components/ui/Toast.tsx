"use client";

import { useApp } from "@/lib/store";
import { X, CheckCircle, Info, AlertCircle } from "lucide-react";

const icons = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
};

const colors = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  info: "bg-sky-50 border-sky-200 text-sky-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${colors[toast.type]} animate-in slide-in-from-right`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 opacity-60 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

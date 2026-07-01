"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

interface DemoBannerProps {
  message?: string;
}

export function DemoBanner({
  message = "Phase 1 MVP — this is a clickable demo with sample data. Actions show confirmations instead of saving to a live system.",
}: DemoBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5">
      <Info className="h-4 w-4 shrink-0 text-sky-600 mt-0.5" />
      <p className="flex-1 text-xs text-sky-800">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="text-sky-500 hover:text-sky-700"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

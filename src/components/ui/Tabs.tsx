"use client";

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-slate-200">
      <nav className="flex gap-6 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-sky-600 text-sky-600"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

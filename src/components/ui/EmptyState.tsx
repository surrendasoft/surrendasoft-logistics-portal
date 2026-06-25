import { FileX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FileX className="h-12 w-12 text-slate-300 mb-4" />
      <h3 className="text-sm font-medium text-slate-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}

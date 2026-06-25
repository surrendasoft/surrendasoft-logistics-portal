import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function PageHeader({
  title,
  description,
  action,
  secondaryAction,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      <div className="flex gap-3">
        {secondaryAction && (
          <Link
            href={secondaryAction.href}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {secondaryAction.label}
          </Link>
        )}
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 transition-colors shadow-sm"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}

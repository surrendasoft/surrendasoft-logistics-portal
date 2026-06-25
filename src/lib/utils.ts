const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const DATE_TIMEZONE = "Australia/Sydney";

function parseDateInput(dateStr: string): Date | null {
  const normalized =
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(dateStr)
      ? `${dateStr}Z`
      : dateStr;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Deterministic formatting — avoids SSR/client locale/timezone hydration mismatches. */
export function formatDate(dateStr: string): string {
  if (!dateStr) return "—";

  const dateOnly = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnly) {
    const year = dateOnly[1];
    const month = parseInt(dateOnly[2], 10);
    const day = dateOnly[3];
    return `${day} ${MONTHS[month - 1]} ${year}`;
  }

  const date = parseDateInput(dateStr);
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-AU", {
    timeZone: DATE_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Deterministic formatting — uses fixed timezone for consistent SSR and client output. */
export function formatDateTime(dateStr: string): string {
  if (!dateStr) return "—";

  const date = parseDateInput(dateStr);
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-AU", {
    timeZone: DATE_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

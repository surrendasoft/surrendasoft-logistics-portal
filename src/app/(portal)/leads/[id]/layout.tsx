import { leads } from "@/lib/mock-data";

export function generateStaticParams() {
  return leads.map((lead) => ({ id: lead.id }));
}

export default function LeadIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

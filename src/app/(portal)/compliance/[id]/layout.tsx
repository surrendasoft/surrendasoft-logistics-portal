import { complianceRecords } from "@/lib/mock-data";

export function generateStaticParams() {
  return complianceRecords.map((record) => ({ id: record.id }));
}

export default function ComplianceIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

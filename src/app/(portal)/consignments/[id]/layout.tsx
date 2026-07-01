import { consignments } from "@/lib/mock-data";

export function generateStaticParams() {
  return consignments.map((consignment) => ({ id: consignment.id }));
}

export default function ConsignmentIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

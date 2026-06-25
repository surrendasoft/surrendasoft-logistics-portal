import { suppliers } from "@/lib/mock-data";

export function generateStaticParams() {
  return suppliers.map((supplier) => ({ id: supplier.id }));
}

export default function SupplierIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

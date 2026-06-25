import { customers } from "@/lib/mock-data";

export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id }));
}

export default function CustomerIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

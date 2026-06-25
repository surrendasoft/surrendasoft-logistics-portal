import { generalFreightJobs } from "@/lib/mock-data";

export function generateStaticParams() {
  return generalFreightJobs.map((job) => ({ id: job.id }));
}

export default function GeneralFreightIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

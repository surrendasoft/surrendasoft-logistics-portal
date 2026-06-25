import { projectFreightJobs } from "@/lib/mock-data";

export function generateStaticParams() {
  return projectFreightJobs.map((job) => ({ id: job.id }));
}

export default function ProjectFreightIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

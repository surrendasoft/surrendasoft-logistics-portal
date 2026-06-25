import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6 min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

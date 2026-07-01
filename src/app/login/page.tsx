"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-600 text-lg font-bold text-white shadow-sm">
              RL
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">Romann Logistics</h1>
            <p className="mt-1 text-sm text-slate-500">MVP Portal — sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200/60 p-8 shadow-sm space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="ryanr@romannlogistics.com.au"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                defaultValue="demo1234"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-sky-600" />
                Remember me
              </label>
              <span className="text-sky-600">Forgot password?</span>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-700 transition-colors"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </button>
            <p className="text-center text-xs text-slate-400">
              Demo login — any details will take you into the portal
            </p>
          </form>
        </div>
      </div>
      <footer className="py-4 text-center text-xs text-slate-400">
        Powered by SurrendaSoft
      </footer>
    </div>
  );
}

import { auth, signOut } from "@/auth";
import Link from "next/link";
import { LogOut, LayoutDashboard, Compass, FileText, MessageSquare, Settings, HelpCircle, Sparkles, User, BrainCircuit } from "lucide-react";
import Image from "next/image";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-[#090a0f] text-slate-100 select-none antialiased">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-[#0d0e12]/80 border-r border-white/5 p-6 flex flex-col backdrop-blur-md sticky top-0 h-screen select-none z-40">
        <div className="space-y-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 select-none group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white leading-tight group-hover:text-violet-400 transition-colors">
                PathAI
              </h2>
              <p className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase select-none">
                Elite Career Intelligence
              </p>
            </div>
          </Link>
 
          {/* Nav links */}
          <nav className="space-y-3 select-none">
            <Link
              href="/dashboard"
              className="flex items-center gap-3.5 px-4 py-3 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-xl"
            >
              <LayoutDashboard className="w-[18px] h-[18px]" />
              Overview
            </Link>
            <Link
              href="/resume-builder"
              className="flex items-center gap-3.5 px-4 py-3 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-xl"
            >
              <FileText className="w-[18px] h-[18px]" />
              Roadmap Architect
            </Link>
            <Link
              href="/interview-coach"
              className="flex items-center gap-3.5 px-4 py-3 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-xl"
            >
              <MessageSquare className="w-[18px] h-[18px]" />
              Interview Coach
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3.5 px-4 py-3 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-xl"
            >
              <Settings className="w-[18px] h-[18px]" />
              Settings
            </Link>
          </nav>
 
          {/* New Analysis vibrant button */}
          <Link
            href="/resume-builder"
            style={{ background: "linear-gradient(135deg, #6d28d9, #1d4ed8)" }}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-[13.5px] text-white font-semibold rounded-xl hover:brightness-110 active:brightness-95 transition-all shadow-xl shadow-violet-600/10 cursor-pointer select-none"
          >
            <Sparkles className="w-4 h-4" />
            Create New Path
          </Link>
        </div>
 
        {/* Support & Logout */}
        <div className="mt-auto pb-4 space-y-2 select-none">
          <Link
            href="/support"
            className="flex items-center gap-3.5 px-4 py-3 text-[14px] font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-all rounded-xl"
          >
            <HelpCircle className="w-[18px] h-[18px]" />
            Support
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3.5 px-4 py-3 text-[13px] font-medium text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02] transition-all rounded-xl cursor-pointer select-none"
            >
              <LogOut className="w-[16px] h-[16px]" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* PAGE MAIN CONTENT */}
      <div className="flex-1 min-h-screen overflow-y-auto bg-[#090a0f] p-10 select-none">
        {children}
      </div>
    </div>
  );
}

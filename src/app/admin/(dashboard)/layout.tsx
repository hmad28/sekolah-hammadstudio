import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/auth";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-900 bg-slate-950/80 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-900">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Hammad Studio</div>
              <div className="text-[10px] text-slate-400">Admin Dashboard</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1 text-xs font-semibold">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              Overview
            </Link>
            <Link
              href="/admin/spmb"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <Users className="w-4 h-4 text-emerald-400" />
              Penerimaan Murid (SPMB)
            </Link>
            <Link
              href="/admin/cms/berita"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              CMS Berita & Pengumuman
            </Link>
            <Link
              href="/admin/cms/layanan"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              CMS Program & Layanan
            </Link>
          </nav>
        </div>

        {/* Footer / Profile */}
        <div className="p-4 border-t border-slate-900 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs">
              {session.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{session.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{session.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Web Publik
            </Link>
            <form action={logoutAdminAction}>
              <button
                type="submit"
                title="Keluar"
                className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-slate-900 px-4 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-sm text-white">Admin Hammad Studio</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Link href="/admin/spmb" className="px-2 py-1 bg-slate-900 rounded">
              SPMB
            </Link>
            <form action={logoutAdminAction}>
              <button type="submit" className="p-1 text-slate-400 hover:text-red-400">
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

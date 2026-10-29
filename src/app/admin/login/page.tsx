"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/app/actions/auth";
import { ShieldCheck, Lock, Mail, Loader2, Sparkles, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
        {/* Brand Icon */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-indigo-600/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Portal Admin & Petugas</h1>
          <p className="text-xs text-slate-400 mt-1">Sekolah Hammad Studio</p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Email Administrator</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                required
                defaultValue="admin@hammadstudio.sch.id"
                placeholder="admin@hammadstudio.sch.id"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                defaultValue="admin12345"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memverifikasi...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Masuk ke Dashboard
              </>
            )}
          </button>
        </form>

        {/* Hint Box */}
        <div className="mt-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
          <div className="text-slate-300 font-bold">Akun Default Admin:</div>
          <div>Email: <code className="text-indigo-400">admin@hammadstudio.sch.id</code></div>
          <div>Password: <code className="text-amber-400">admin12345</code></div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-300">
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}

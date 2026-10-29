import Link from "next/link";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-7 h-7" />
        </div>
        <div className="text-4xl font-black text-amber-400 mb-2">404</div>
        <h1 className="text-xl font-bold text-white mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-xs text-slate-400 mb-8 leading-relaxed">
          Mohon maaf, halaman yang Anda cari tidak tersedia atau tautan telah dipindahkan.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/30"
        >
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

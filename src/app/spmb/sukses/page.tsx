"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  CheckCircle2,
  Printer,
  MessageSquare,
  Home,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Suspense } from "react";

function SuksesContent() {
  const searchParams = useSearchParams();
  const regNumber = searchParams.get("reg") || "HS-2026-XXXX";
  const name = searchParams.get("name") || "Calon Murid";
  const phone = searchParams.get("phone") || "-";

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pendaftaran Berhasil Disimpan</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Selamat, Pendaftaran Anda Telah Diterima!
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mb-8">
          Data calon murid atas nama <span className="text-white font-bold">{name}</span> telah masuk ke sistem SPMB Sekolah Hammad Studio.
        </p>

        {/* Nomor Registrasi Card */}
        <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-center mb-8">
          <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider block mb-1">
            Nomor Registrasi Resmi
          </span>
          <span className="text-3xl sm:text-4xl font-mono font-black text-amber-400 tracking-wider">
            {regNumber}
          </span>
          <p className="text-[11px] text-slate-400 mt-2">
            Simpan nomor registrasi ini untuk pengecekan status seleksi berkala.
          </p>
        </div>

        {/* WhatsApp Notification Box */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-left mb-8 space-y-3 text-xs">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Tindak Lanjut Panitia via WhatsApp</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Panitia SPMB Sekolah Hammad Studio akan segera menghubungi nomor WhatsApp Anda di{" "}
            <span className="text-white font-bold font-mono">{phone}</span> dalam kurun waktu 1x24 jam untuk verifikasi berkas dan konfirmasi jadwal tes/wawancara.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
          >
            <Printer className="w-4 h-4" />
            Cetak Bukti Pendaftaran
          </button>
          <Link
            href="/spmb/cek-status"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all"
          >
            Cek Status Pendaftaran
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-slate-400 hover:text-white"
          >
            <Home className="w-4 h-4" />
            Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SpmbSuksesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <Suspense fallback={<div className="p-10 text-center text-slate-400 text-sm">Memuat data pendaftaran...</div>}>
          <SuksesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

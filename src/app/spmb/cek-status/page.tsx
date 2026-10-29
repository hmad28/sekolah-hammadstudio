"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { checkRegistrationStatusAction } from "@/app/actions/spmb";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Phone,
  School,
  AlertCircle,
  Loader2,
  Calendar,
} from "lucide-react";
import { formatDateIndo } from "@/lib/utils";
import { toast } from "sonner";

interface StatusResult {
  id: number;
  registrationNumber: string;
  status: string;
  fullName: string;
  nisn: string;
  parentName: string;
  parentPhone: string;
  adminNotes: string | null;
  createdAt: Date | string;
  programName: string | null;
  periodName: string | null;
}

export default function CekStatusPage() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Masukkan nomor registrasi atau nomor WhatsApp.");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await checkRegistrationStatusAction(query.trim());
      setResult(res as unknown as StatusResult);
      if (!res) {
        toast.info("Data pendaftaran tidak ditemukan.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat memeriksa data.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Diterima / Lulus Seleksi
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
            <XCircle className="w-3.5 h-3.5" />
            Belum Lulus
          </span>
        );
      case "verified":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Berkas Terverifikasi
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            Menunggu Verifikasi Berkas
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pengecekan Status SPMB
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Masukkan Nomor Registrasi pendaftaran (contoh: HS-2026-0001) atau nomor WhatsApp wali untuk melihat status verifikasi.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nomor Registrasi (HS-2026-XXXX) atau No. WhatsApp"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 shadow-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mencari...
                </>
              ) : (
                "Cek Status"
              )}
            </button>
          </div>
        </form>

        {/* Search Result */}
        {result && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Nomor Registrasi
                </span>
                <span className="text-2xl font-mono font-black text-amber-400">
                  {result.registrationNumber}
                </span>
              </div>
              <div>{getStatusBadge(result.status)}</div>
            </div>

            <div className="py-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-400">Nama Calon Murid:</span>
                <span className="font-bold text-white">{result.fullName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-400">Jurusan Pilihan:</span>
                <span className="font-semibold text-indigo-400">{result.programName || "-"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-400">Gelombang:</span>
                <span className="text-slate-300">{result.periodName || "-"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-400">Nama Orang Tua / Wali:</span>
                <span className="text-slate-300">{result.parentName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-slate-400">Tanggal Pengajuan:</span>
                <span className="text-slate-300">{formatDateIndo(result.createdAt)}</span>
              </div>

              {result.adminNotes && (
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-[11px] font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
                    Catatan dari Panitia:
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
                    {result.adminNotes}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {hasSearched && !isLoading && !result && (
          <div className="text-center py-12 bg-slate-900/20 border border-slate-800/80 rounded-2xl p-8">
            <XCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">Data Tidak Ditemukan</h3>
            <p className="text-xs text-slate-400">
              Pastikan nomor registrasi atau nomor WhatsApp yang Anda masukkan sesuai dengan data saat pengisian formulir.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

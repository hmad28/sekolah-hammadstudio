import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { admissionPeriods, programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  FileText,
  CreditCard,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { formatRupiah, formatDateIndo } from "@/lib/utils";

export const revalidate = 0;

export default async function SpmbInfoPage() {
  const periods = await db.select().from(admissionPeriods);
  const programList = await db.select().from(programs).where(eq(programs.isActive, true));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pusat Informasi SPMB 2026/2027</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Penerimaan Murid Baru Online
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Bergabunglah bersama keluarga besar Sekolah Hammad Studio. Daftarkan diri Anda secara online dengan mudah, cepat, dan terhubung langsung via WhatsApp panitia.
            </p>
          </div>

          {/* Jadwal Gelombang */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-400" />
              Jadwal Gelombang Pendaftaran
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {periods.map((p) => (
                <div
                  key={p.id}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                    p.isActive
                      ? "bg-indigo-950/20 border-indigo-500/40 shadow-lg shadow-indigo-500/10"
                      : "bg-slate-900/30 border-slate-800 opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        p.isActive
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {p.isActive ? "Sedang Dibuka" : "Segera Hadir"}
                    </span>
                    <span className="text-xs text-slate-400">Kuota: {p.quota} Siswa</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
                  <div className="space-y-1 text-xs text-slate-400 mb-6">
                    <div>
                      Periode: <span className="text-slate-200">{formatDateIndo(p.startDate)}</span> s/d{" "}
                      <span className="text-slate-200">{formatDateIndo(p.endDate)}</span>
                    </div>
                    <div>
                      Biaya Formulir:{" "}
                      <span className="text-amber-400 font-bold text-sm">
                        {formatRupiah(p.registrationFee)}
                      </span>
                    </div>
                  </div>

                  {p.isActive ? (
                    <Link
                      href="/spmb/daftar"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md"
                    >
                      Daftar Gelombang Ini
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 text-xs font-semibold text-slate-500 bg-slate-900 border border-slate-800 rounded-xl cursor-not-allowed"
                    >
                      Pendaftaran Belum Dibuka
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Syarat Pendaftaran */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Persyaratan Berkas Dokumen
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Berkas dapat diunggah dalam format gambar (JPG/PNG) atau PDF maksimal 8MB saat mengisi formulir pendaftaran:
              </p>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Pas Foto terbaru calon siswa (latar belakang bebas rapi).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Scan / Foto Kartu Keluarga (KK) & Akta Kelahiran.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Ijazah / Surat Keterangan Lulus (SKL) / Rapor semester terakhir.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Bukti transfer biaya formulir pendaftaran SPMB.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                Rekening Pembayaran Formulir
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Pembayaran biaya formulir pendaftaran dapat ditransfer ke rekening resmi yayasan sekolah:
              </p>
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div>
                  <span className="text-slate-500">Bank Tujuan:</span>
                  <div className="text-base font-bold text-white">Bank Syariah Indonesia (BSI) / BCA</div>
                </div>
                <div>
                  <span className="text-slate-500">Nomor Rekening:</span>
                  <div className="text-base font-mono font-bold text-amber-400">7728-0028-2026</div>
                </div>
                <div>
                  <span className="text-slate-500">Atas Nama:</span>
                  <div className="text-sm font-semibold text-slate-200">Yayasan Sekolah Hammad Studio</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-4 italic">
                *Simpan bukti transfer untuk diunggah pada langkah ke-4 formulir pendaftaran online.
              </p>
            </div>
          </div>

          {/* FAQ Singkat */}
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-400" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl">
                <h4 className="font-bold text-sm text-white mb-2">
                  Apakah calon murid harus membuat akun atau password untuk mendaftar?
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Tidak perlu! Pendaftaran dibuat sangat praktis. Anda cukup mengisi formulir dan nomor WhatsApp aktif wali. Setelah pendaftaran terkirim, Anda langsung mendapatkan nomor registrasi dan admin kami akan menghubungi nomor WA Anda.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl">
                <h4 className="font-bold text-sm text-white mb-2">
                  Bagaimana jika berkas persyaratan belum lengkap saat mendaftar?
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Anda tetap bisa mendaftar terlebih dahulu. Berkas yang belum siap dapat disusulkan nanti saat tim verifikator kami menghubungi via WhatsApp.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl">
                <h4 className="font-bold text-sm text-white mb-2">
                  Kapan hasil seleksi dan verifikasi diumumkan?
                </h4>
                <p className="text-slate-400 leading-relaxed">
                  Hasil verifikasi berkas dan jadwal tes minat/bakat akan dikabari maksimal 2x24 jam kerja melalui pesan WhatsApp ke wali calon murid.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/spmb/daftar"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg transition-all"
              >
                Mulai Formulir Pendaftaran
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

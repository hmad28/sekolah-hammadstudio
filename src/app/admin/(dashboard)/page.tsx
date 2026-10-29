import { db } from "@/db";
import { registrations, programs, admissionPeriods } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
} from "lucide-react";
import { formatDateIndo } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardOverview() {
  const allRegs = await db
    .select({
      id: registrations.id,
      registrationNumber: registrations.registrationNumber,
      fullName: registrations.fullName,
      status: registrations.status,
      parentName: registrations.parentName,
      parentPhone: registrations.parentPhone,
      createdAt: registrations.createdAt,
      programName: programs.name,
    })
    .from(registrations)
    .leftJoin(programs, eq(registrations.programId, programs.id))
    .orderBy(desc(registrations.createdAt));

  const total = allRegs.length;
  const pending = allRegs.filter((r) => r.status === "pending").length;
  const verified = allRegs.filter((r) => r.status === "verified").length;
  const accepted = allRegs.filter((r) => r.status === "accepted").length;
  const rejected = allRegs.filter((r) => r.status === "rejected").length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Dashboard Overview</h1>
        <p className="text-xs text-slate-400 mt-1">
          Pantau statistik pendaftar murid baru dan status verifikasi berkas secara terpusat.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Pendaftar</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{total}</div>
          <div className="text-[11px] text-slate-500 mt-1">Calon murid terdaftar</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Menunggu Verifikasi</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">{pending}</div>
          <div className="text-[11px] text-slate-500 mt-1">Perlu dicek admin</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Diterima / Lulus</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">{accepted}</div>
          <div className="text-[11px] text-slate-500 mt-1">Siap daftar ulang</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center justify-between text-red-400 mb-2">
            <span className="text-xs font-semibold text-slate-400">Belum Lulus</span>
            <XCircle className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-red-400">{rejected}</div>
          <div className="text-[11px] text-slate-500 mt-1">Pendaftaran ditolak</div>
        </div>
      </div>

      {/* Pendaftar Terbaru */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Pendaftar Terbaru</h2>
            <p className="text-xs text-slate-400">5 calon murid yang baru saja mendaftar secara online</p>
          </div>
          <Link
            href="/admin/spmb"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
          >
            Buka Kelola SPMB
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {allRegs.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            Belum ada data pendaftar baru. Formulir pendaftaran dapat diakses di{" "}
            <Link href="/spmb/daftar" className="text-indigo-400 underline">
              /spmb/daftar
            </Link>
            .
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-950/40">
                <tr>
                  <th className="py-3 px-4">No. Registrasi</th>
                  <th className="py-3 px-4">Nama Murid</th>
                  <th className="py-3 px-4">Jurusan</th>
                  <th className="py-3 px-4">Kontak Wali</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {allRegs.slice(0, 5).map((r) => {
                  // Format WhatsApp Phone
                  const cleanPhone = r.parentPhone.replace(/^0/, "62").replace(/[^0-9]/g, "");
                  const waMessage = encodeURIComponent(
                    `Halo Bapak/Ibu ${r.parentName}, kami dari Panitia SPMB Sekolah Hammad Studio mengonfirmasi pendaftaran calon murid ${r.fullName} dengan Nomor Registrasi ${r.registrationNumber}. Berkas Anda saat ini berstatus: ${r.status}.`
                  );

                  return (
                    <tr key={r.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        {r.registrationNumber}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-white">{r.fullName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{r.programName}</td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {r.parentName} ({r.parentPhone})
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            r.status === "accepted"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : r.status === "rejected"
                              ? "bg-red-500/20 text-red-400"
                              : r.status === "verified"
                              ? "bg-indigo-500/20 text-indigo-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white font-semibold transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Chat WA Wali
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

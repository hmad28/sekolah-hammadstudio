"use client";

import { useState } from "react";
import { updateRegistrationStatusAction } from "@/app/actions/spmb";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  FileText,
  Eye,
  X,
  Send,
  Loader2,
  ExternalLink,
  ShieldCheck,
  User,
  Phone,
} from "lucide-react";
import { formatDateIndo } from "@/lib/utils";
import { toast } from "sonner";

interface RegistrationItem {
  id: number;
  registrationNumber: string;
  status: string;
  fullName: string;
  gender: string;
  nisn: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  city: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  parentJob: string | null;
  photoUrl: string | null;
  documentUrls: string | null;
  paymentProofUrl: string | null;
  adminNotes: string | null;
  createdAt: Date | string;
  programName: string | null;
  periodName: string | null;
}

export function SpmbManagerClient({
  initialData,
}: {
  initialData: RegistrationItem[];
}) {
  const [data, setData] = useState<RegistrationItem[]>(initialData);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<RegistrationItem | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [notesInput, setNotesInput] = useState("");

  // Filtering
  const filteredData = data.filter((item) => {
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesSearch =
      item.fullName.toLowerCase().includes(search.toLowerCase()) ||
      item.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
      item.parentPhone.includes(search) ||
      item.parentName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleOpenDetail = (item: RegistrationItem) => {
    setSelectedItem(item);
    setNotesInput(item.adminNotes || "");
  };

  const handleUpdateStatus = async (
    newStatus: "pending" | "verified" | "accepted" | "rejected"
  ) => {
    if (!selectedItem) return;
    setIsUpdating(true);
    try {
      const res = await updateRegistrationStatusAction(
        selectedItem.id,
        newStatus,
        notesInput
      );
      if (res.success) {
        toast.success(`Status berhasil diperbarui menjadi ${newStatus}`);
        setData((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? { ...item, status: newStatus, adminNotes: notesInput }
              : item
          )
        );
        setSelectedItem((prev) =>
          prev ? { ...prev, status: newStatus, adminNotes: notesInput } : null
        );
      } else {
        toast.error("Gagal memperbarui status.");
      }
    } catch {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getWaUrl = (item: RegistrationItem, templateType: "confirm" | "interview" | "accepted") => {
    const cleanPhone = item.parentPhone.replace(/^0/, "62").replace(/[^0-9]/g, "");
    let text = "";

    if (templateType === "confirm") {
      text = `Halo Bapak/Ibu ${item.parentName}, salam dari Panitia SPMB Sekolah Hammad Studio.\n\nKami mengonfirmasi bahwa formulir pendaftaran calon murid an. *${item.fullName}* dengan No. Registrasi *${item.registrationNumber}* (Jurusan: ${item.programName}) telah kami terima.\n\nBerkas Anda saat ini sedang dalam proses verifikasi tim panitia. Terima kasih!`;
    } else if (templateType === "interview") {
      text = `Halo Bapak/Ibu ${item.parentName},\n\nBerkas pendaftaran an. *${item.fullName}* (${item.registrationNumber}) telah TERVERIFIKASI.\n\nKami mengundang ananda untuk mengikuti sesi wawancara & pemetaan minat bakat secara online/offline. Mohon konfirmasi kesediaan jadwal Bapak/Ibu. Terima kasih.`;
    } else {
      text = `Selamat Bapak/Ibu ${item.parentName}!\n\nKami mengucapkan selamat bahwa calon murid an. *${item.fullName}* (${item.registrationNumber}) dinyatakan *DITERIMA / LULUS SELEKSI* di Sekolah Hammad Studio untuk Jurusan *${item.programName}*!\n\nInformasi alur registrasi ulang dapat kami pandu melalui chat ini.`;
    }

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 text-xs">
          {[
            { label: "Semua", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Terverifikasi", value: "verified" },
            { label: "Diterima", value: "accepted" },
            { label: "Ditolak", value: "rejected" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`px-3.5 py-2 rounded-xl font-semibold transition-colors shrink-0 ${
                filterStatus === tab.value
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, no. registrasi, WA..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 bg-slate-950/60">
              <tr>
                <th className="py-3 px-4">No. Registrasi</th>
                <th className="py-3 px-4">Nama Murid</th>
                <th className="py-3 px-4">Jurusan</th>
                <th className="py-3 px-4">Orang Tua / No. WA</th>
                <th className="py-3 px-4">Tanggal Daftar</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Aksi & Kontak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    Tidak ada data pendaftar yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                      {item.registrationNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{item.fullName}</div>
                      <div className="text-[11px] text-slate-400">NISN: {item.nisn}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{item.programName}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium">{item.parentName}</div>
                      <div className="text-emerald-400 font-mono text-[11px]">
                        {item.parentPhone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {formatDateIndo(item.createdAt)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status === "accepted"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : item.status === "rejected"
                            ? "bg-red-500/20 text-red-400"
                            : item.status === "verified"
                            ? "bg-indigo-500/20 text-indigo-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Direct WhatsApp Quick Chat */}
                        <a
                          href={getWaUrl(item, "confirm")}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat WA Wali"
                          className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>

                        {/* Open Detail Modal */}
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold transition-colors flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Review
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL / DRAWER */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Detail Calon Murid
                </span>
                <h3 className="text-xl font-bold text-white">{selectedItem.fullName}</h3>
                <p className="text-xs font-mono text-amber-400">
                  {selectedItem.registrationNumber} • {selectedItem.programName}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6 text-xs">
              {/* WhatsApp Action Box */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <MessageSquare className="w-4 h-4" />
                  <span>Kirim Pesan WhatsApp ke Wali: {selectedItem.parentName} ({selectedItem.parentPhone})</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={getWaUrl(selectedItem, "confirm")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3 h-3" />
                    Kirim Konfirmasi Berkas
                  </a>
                  <a
                    href={getWaUrl(selectedItem, "interview")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3 h-3" />
                    Kirim Jadwal Wawancara
                  </a>
                  <a
                    href={getWaUrl(selectedItem, "accepted")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3 h-3" />
                    Kirim Surat Kelulusan
                  </a>
                </div>
              </div>

              {/* Data Biodata */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500 block">NISN</span>
                  <span className="text-white font-semibold">{selectedItem.nisn}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jenis Kelamin</span>
                  <span className="text-white font-semibold">
                    {selectedItem.gender === "L" ? "Laki-laki" : "Perempuan"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tempat / Tgl Lahir</span>
                  <span className="text-white font-semibold">
                    {selectedItem.birthPlace}, {selectedItem.birthDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Asal Sekolah</span>
                  <span className="text-white font-semibold">{selectedItem.previousSchool}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Alamat Tinggal</span>
                  <span className="text-slate-300">
                    {selectedItem.address}, {selectedItem.city}
                  </span>
                </div>
              </div>

              {/* Uploaded Documents Preview */}
              <div>
                <h4 className="font-bold text-white mb-3">Dokumen Berkas Persyaratan</h4>
                <div className="grid grid-cols-2 gap-4">
                  {/* Pas Foto */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-2 font-medium">Pas Foto Siswa</span>
                    {selectedItem.photoUrl ? (
                      <div className="relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedItem.photoUrl}
                          alt="Pas Foto"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <a
                          href={selectedItem.photoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold rounded-lg transition-opacity"
                        >
                          Lihat Penuh <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </a>
                      </div>
                    ) : (
                      <div className="h-40 flex items-center justify-center text-slate-500 text-xs bg-slate-900 rounded-lg">
                        Belum diunggah
                      </div>
                    )}
                  </div>

                  {/* Bukti Pembayaran */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                    <span className="text-slate-400 block mb-2 font-medium">Bukti Transfer</span>
                    {selectedItem.paymentProofUrl ? (
                      <div className="relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedItem.paymentProofUrl}
                          alt="Bukti Transfer"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <a
                          href={selectedItem.paymentProofUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold rounded-lg transition-opacity"
                        >
                          Lihat Penuh <ExternalLink className="w-3.5 h-3.5 ml-1" />
                        </a>
                      </div>
                    ) : (
                      <div className="h-40 flex items-center justify-center text-slate-500 text-xs bg-slate-900 rounded-lg">
                        Belum diunggah
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Catatan Admin */}
              <div>
                <label className="block font-bold text-white mb-1.5">
                  Catatan Verifikator / Revisi Berkas
                </label>
                <textarea
                  rows={2}
                  placeholder="Tuliskan catatan untuk internal atau revisi berkas siswa..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Status Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-slate-400">
                  Status Saat Ini:{" "}
                  <strong className="text-white uppercase font-mono">{selectedItem.status}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus("verified")}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                  >
                    Verifikasi Berkas
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus("accepted")}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Terima / Lulus
                  </button>
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus("rejected")}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
                  >
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UploadDropzone } from "@/lib/uploadthing";
import { submitRegistrationAction } from "@/app/actions/spmb";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Phone,
  FileUp,
  School,
  Check,
  Loader2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ProgramItem {
  id: number;
  name: string;
}

interface PeriodItem {
  id: number;
  name: string;
  registrationFee: number;
}

export default function RegistrationWizardPage() {
  const router = useRouter();

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    periodId: 1,
    programId: 1,
    fullName: "",
    gender: "L",
    nisn: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    city: "",
    previousSchool: "",
    parentName: "",
    parentPhone: "",
    parentJob: "",
    photoUrl: "",
    documentUrls: [] as string[],
    paymentProofUrl: "",
  });

  const steps = [
    { number: 1, title: "Pilihan Jurusan", icon: School },
    { number: 2, title: "Biodata Calon Siswa", icon: User },
    { number: 3, title: "Data Orang Tua/Wali", icon: Phone },
    { number: 4, title: "Unggah Dokumen", icon: FileUp },
    { number: 5, title: "Konfirmasi & Kirim", icon: CheckCircle2 },
  ];

  const handleNext = () => {
    // Basic validation
    if (currentStep === 2) {
      if (!formData.fullName || !formData.nisn || !formData.birthPlace || !formData.birthDate || !formData.address || !formData.previousSchool) {
        toast.error("Harap lengkapi semua data biodata calon siswa.");
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.parentName || !formData.parentPhone) {
        toast.error("Nama wali dan Nomor WhatsApp aktif wajib diisi.");
        return;
      }
      if (!formData.parentPhone.startsWith("08") && !formData.parentPhone.startsWith("62")) {
        toast.error("Nomor WhatsApp harus diawali dengan 08 atau 62 (contoh: 08123456789).");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitRegistrationAction(formData);
      if (res.success && res.registrationNumber) {
        toast.success("Pendaftaran berhasil dikirim!");
        router.push(`/spmb/sukses?reg=${res.registrationNumber}&name=${encodeURIComponent(formData.fullName)}&phone=${encodeURIComponent(formData.parentPhone)}`);
      } else {
        toast.error(res.error || "Gagal mengirim pendaftaran.");
      }
    } catch {
      toast.error("Terjadi kesalahan saat memproses pendaftaran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Formulir SPMB Online TA 2026/2027</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pendaftaran Calon Murid Baru
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Isi data dengan benar. Notifikasi hasil seleksi akan dikirimkan ke nomor WhatsApp wali.
          </p>
        </div>

        {/* Stepper Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isPassed = currentStep > s.number;
              const isCurrent = currentStep === s.number;
              return (
                <div key={s.number} className="flex-1 flex flex-col items-center relative">
                  {/* Connecting Line */}
                  {idx > 0 && (
                    <div
                      className={`absolute top-4 -left-1/2 w-full h-[2px] -z-10 ${
                        isPassed ? "bg-indigo-600" : "bg-slate-800"
                      }`}
                    />
                  )}
                  {/* Step Bubble */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isPassed
                        ? "bg-indigo-600 text-white"
                        : isCurrent
                        ? "bg-indigo-600 text-white ring-4 ring-indigo-500/20"
                        : "bg-slate-900 border border-slate-800 text-slate-500"
                    }`}
                  >
                    {isPassed ? <Check className="w-4 h-4" /> : s.number}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs mt-2 hidden sm:block font-medium ${
                      isCurrent ? "text-indigo-400" : isPassed ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card Form Body */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          {/* STEP 1: PILIHAN JURUSAN & GELOMBANG */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                1. Pilih Program Keahlian & Gelombang
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Gelombang Pendaftaran
                </label>
                <div className="p-4 rounded-xl border border-indigo-500/40 bg-indigo-950/20 text-xs">
                  <div className="font-bold text-white text-sm">Gelombang 1 - Early Bird TA 2026/2027</div>
                  <div className="text-slate-400 mt-1">
                    Biaya Formulir: <span className="text-amber-400 font-bold">Rp 250.000</span> (Diskon Early Bird)
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Pilih Jurusan / Program Keahlian <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      name: "Desain Komunikasi Visual & Multimedia",
                      desc: "Graphic Design, UI/UX, Motion Graphic",
                    },
                    {
                      id: 2,
                      name: "Pengembangan Web & Aplikasi",
                      desc: "Fullstack Next.js, Mobile App, Cloud",
                    },
                    {
                      id: 3,
                      name: "Animasi 3D & Video Production",
                      desc: "Blender 3D, Video Cinematics, VFX",
                    },
                  ].map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setFormData({ ...formData, programId: p.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.programId === p.id
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                          : "bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="font-bold text-xs text-white mb-1">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BIODATA CALON SISWA */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                2. Biodata Calon Murid
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Nama Lengkap Calon Murid <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rizky Ramadhan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Jenis Kelamin <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    NISN (Nomor Induk Siswa Nasional) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 0071234567"
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Tempat Lahir <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Jakarta"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Tanggal Lahir <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Asal Sekolah (SMP / MTs / Sederajat) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SMP Negeri 1 Kreatif"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Alamat Lengkap Tempat Tinggal <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Alamat jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Kota / Kabupaten
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jakarta Selatan"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DATA ORANG TUA / WALI */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                3. Data Orang Tua / Wali
              </h2>

              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-indigo-400 mt-0.5" />
                <p>
                  <strong>Penting:</strong> Pastikan Nomor WhatsApp yang dimasukkan aktif dan benar. Seluruh informasi status verifikasi, hasil seleksi, dan jadwal wawancara akan dikirimkan langsung oleh panitia ke nomor ini.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Nama Orang Tua / Wali <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bapak Ahmad Dahlan / Ibu Siti Aminah"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Nomor WhatsApp Aktif Wali <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Gunakan format 08... atau 628...
                  </span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1.5">
                    Pekerjaan Orang Tua / Wali
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Karyawan Swasta / Wiraswasta"
                    value={formData.parentJob}
                    onChange={(e) => setFormData({ ...formData, parentJob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: UNGGAH DOKUMEN & BUKTI BAYAR */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                4. Unggah Dokumen Persyaratan & Bukti Transfer
              </h2>

              <p className="text-xs text-slate-400 leading-relaxed">
                Unggah dokumen persyaratan menggunakan sistem penyimpanan UploadThing. Jika berkas belum lengkap saat ini, Anda tetap dapat mengirimkan pendaftaran dan menyusulkan berkas melalui WhatsApp panitia.
              </p>

              <div className="space-y-6 text-xs">
                {/* Pas Foto Calon Murid */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                  <label className="block font-bold text-slate-200 mb-2">
                    1. Pas Foto Calon Siswa (JPG/PNG maks. 4MB)
                  </label>
                  {formData.photoUrl ? (
                    <div className="flex items-center gap-3 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="truncate">Foto berhasil diunggah</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, photoUrl: "" })}
                        className="text-xs text-slate-400 underline ml-auto"
                      >
                        Ganti Foto
                      </button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="studentPhoto"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setFormData({ ...formData, photoUrl: res[0].url });
                          toast.success("Pas foto berhasil diunggah!");
                        }
                      }}
                      onUploadError={(err) => {
                        toast.error(`Gagal unggah foto: ${err.message}`);
                      }}
                    />
                  )}
                </div>

                {/* Bukti Transfer */}
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                  <label className="block font-bold text-slate-200 mb-2">
                    2. Bukti Transfer Biaya Pendaftaran Rp 250.000 (JPG/PNG/PDF)
                  </label>
                  {formData.paymentProofUrl ? (
                    <div className="flex items-center gap-3 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="truncate">Bukti transfer berhasil diunggah</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentProofUrl: "" })}
                        className="text-xs text-slate-400 underline ml-auto"
                      >
                        Ganti Berkas
                      </button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="paymentProof"
                      onClientUploadComplete={(res) => {
                        if (res && res[0]) {
                          setFormData({ ...formData, paymentProofUrl: res[0].url });
                          toast.success("Bukti transfer berhasil diunggah!");
                        }
                      }}
                      onUploadError={(err) => {
                        toast.error(`Gagal unggah bukti: ${err.message}`);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: KONFIRMASI & SUBMIT */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
                5. Konfirmasi Data Pendaftaran
              </h2>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
                  <span className="text-slate-400">Jurusan Pilihan:</span>
                  <span className="font-bold text-white">
                    {formData.programId === 1
                      ? "Desain Komunikasi Visual & Multimedia"
                      : formData.programId === 2
                      ? "Pengembangan Web & Aplikasi"
                      : "Animasi 3D & Video Production"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
                  <span className="text-slate-400">Nama Lengkap Murid:</span>
                  <span className="font-bold text-white">{formData.fullName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
                  <span className="text-slate-400">NISN / Asal Sekolah:</span>
                  <span className="text-slate-200">
                    {formData.nisn} • {formData.previousSchool}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
                  <span className="text-slate-400">Nama Orang Tua/Wali:</span>
                  <span className="font-bold text-white">{formData.parentName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
                  <span className="text-slate-400">Nomor WhatsApp Wali:</span>
                  <span className="font-bold text-emerald-400 font-mono">{formData.parentPhone}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-400">Kelengkapan Berkas:</span>
                  <span className="text-slate-200">
                    {formData.photoUrl ? "Foto (Tersedia)" : "Foto (Belum)"} •{" "}
                    {formData.paymentProofUrl ? "Bukti Bayar (Tersedia)" : "Bukti Bayar (Belum)"}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
                Dengan menekan tombol <strong>Kirim Pendaftaran Sekarang</strong>, saya menyatakan data yang diisikan adalah benar dan bersedia dihubungi oleh panitia SPMB Sekolah Hammad Studio melalui WhatsApp.
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all"
              >
                Lanjutkan
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sedang Memproses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Kirim Pendaftaran Sekarang
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

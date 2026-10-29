import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { admissionPeriods, programs, articles, testimonials } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  BookOpen,
  Palette,
  Code2,
  Film,
  MessageSquare,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { formatRupiah, formatDateIndo } from "@/lib/utils";

export const revalidate = 0; // Fresh data

export default async function HomePage() {
  // Fetch active period, programs, articles, testimonials from Neon PostgreSQL
  const [activePeriod] = await db
    .select()
    .from(admissionPeriods)
    .where(eq(admissionPeriods.isActive, true))
    .limit(1);

  const programList = await db
    .select()
    .from(programs)
    .where(eq(programs.isActive, true));

  const latestArticles = await db
    .select()
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.createdAt))
    .limit(3);

  const testimonialList = await db
    .select()
    .from(testimonials)
    .limit(3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 border-b border-slate-900">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Penerimaan Murid Baru (SPMB) TA 2026/2027 Telah Dibuka</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none mb-6">
                Wujudkan Karier Nyata di{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
                  Industri Kreatif & Teknologi
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8">
                Sekolah Hammad Studio memadukan kurikulum berbasis produksi studio riil, bimbingan langsung mentor praktisi ahli, dan jaminan portofolio komersial berkualitas tinggi sebelum lulus.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/spmb/daftar"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                >
                  <Sparkles className="w-4 h-4" />
                  Daftar SPMB Online Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/layanan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Lihat Program & Jurusan
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-900 text-left">
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                  <div className="text-2xl font-black text-indigo-400">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">Project-Based Learning</div>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                  <div className="text-2xl font-black text-amber-400">3 Jurusan</div>
                  <div className="text-xs text-slate-400 mt-0.5">DKV, Web Dev & 3D</div>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                  <div className="text-2xl font-black text-emerald-400">Studio Riil</div>
                  <div className="text-xs text-slate-400 mt-0.5">Fasilitas Lab Lengkap</div>
                </div>
                <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900">
                  <div className="text-2xl font-black text-indigo-300">Fast Track</div>
                  <div className="text-xs text-slate-400 mt-0.5">Dukungan Karier & Magang</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVE ADMISSION PERIOD BANNER */}
        {activePeriod && (
          <section className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border-b border-indigo-900/30 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <div className="space-y-1.5 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Pendaftaran Dibuka
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{activePeriod.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Batas Pendaftaran: <span className="text-slate-200 font-medium">{formatDateIndo(activePeriod.endDate)}</span> • Kuota Terbatas:{" "}
                    <span className="text-amber-400 font-semibold">{activePeriod.quota} Murid</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="text-center sm:text-right">
                    <div className="text-xs text-slate-400">Biaya Formulir</div>
                    <div className="text-xl font-extrabold text-white">
                      {formatRupiah(activePeriod.registrationFee)}
                    </div>
                  </div>
                  <Link
                    href="/spmb/daftar"
                    className="px-6 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all hover:scale-105"
                  >
                    Daftar di Gelombang Ini
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* PROGRAM & LAYANAN PENDIDIKAN */}
        <section className="py-20 lg:py-28 border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                Program Unggulan
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pilihan Kejuruan & Layanan Belajar
              </h3>
              <p className="text-sm text-slate-400 mt-3">
                Disusun khusus sesuai standar keterampilan yang dicari oleh industri kreatif, studio produksi, dan perusahaan teknologi saat ini.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programList.map((prog) => {
                let parsedFeatures: string[] = [];
                try {
                  parsedFeatures = JSON.parse(prog.features || "[]");
                } catch {
                  parsedFeatures = [];
                }

                return (
                  <div
                    key={prog.id}
                    className="group flex flex-col bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    {/* Image Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      {prog.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={prog.imageUrl}
                          alt={prog.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-indigo-950/20 text-indigo-400">
                          <BookOpen className="w-10 h-10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="px-2.5 py-1 text-[11px] font-bold text-white bg-indigo-600/90 rounded-md backdrop-blur-sm">
                          Reguler & Intensif
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {prog.name}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                          {prog.description}
                        </p>

                        <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                            Kompetensi Inti:
                          </div>
                          {parsedFeatures.slice(0, 3).map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-slate-500">Investasi Pendidikan</div>
                          <div className="text-sm font-bold text-amber-400">
                            {formatRupiah(prog.tuitionFee)}
                            <span className="text-[10px] text-slate-400 font-normal"> / bln</span>
                          </div>
                        </div>
                        <Link
                          href={`/layanan/${prog.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                        >
                          Detail Program
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ALUR SPMB 4 LANGKAH PRAKTIS */}
        <section className="py-20 lg:py-28 bg-slate-950/70 border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
                Panduan Pendaftaran
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Alur Pendaftaran SPMB Online
              </h3>
              <p className="text-sm text-slate-400 mt-3">
                Proses pendaftaran cepat, transparan, dan terhubung langsung via WhatsApp ke tim panitia SPMB Sekolah Hammad Studio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-lg mb-4">
                  1
                </div>
                <h4 className="text-base font-bold text-white mb-2">Isi Formulir Online</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Pilih jurusan impian dan isi biodata calon murid serta data orang tua/wali pada halaman pendaftaran.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-lg mb-4">
                  2
                </div>
                <h4 className="text-base font-bold text-white mb-2">Unggah Berkas & Bukti</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload pas foto, akta kelahiran/KK, serta bukti transfer formulir pendaftaran secara aman via UploadThing.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-black text-lg mb-4">
                  3
                </div>
                <h4 className="text-base font-bold text-white mb-2">Konfirmasi WhatsApp</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Admin SPMB akan langsung menghubungi nomor WhatsApp wali untuk konfirmasi berkas dan jadwal tes/wawancara.
                </p>
              </div>

              <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-lg mb-4">
                  4
                </div>
                <h4 className="text-base font-bold text-white mb-2">Pengumuman & Mulai</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cek hasil seleksi secara online atau tunggu kabar dari admin, lakukan registrasi ulang dan sambut masa depanmu!
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/spmb/daftar"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg transition-all hover:scale-105"
              >
                Mulai Pendaftaran Sekarang
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* TESTIMONI & ULASAN WALI/ALUMNI */}
        <section className="py-20 lg:py-28 border-b border-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                Kisah Sukses
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Apa Kata Alumni & Wali Murid
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonialList.map((testi) => (
                <div
                  key={testi.id}
                  className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl relative flex flex-col justify-between"
                >
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    &ldquo;{testi.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testi.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                      alt={testi.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-sm font-bold text-white">{testi.name}</div>
                      <div className="text-xs text-indigo-400">{testi.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BERITA & PENGUMUMAN TERBARU */}
        {latestArticles.length > 0 && (
          <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
                    Kanal Informasi
                  </h2>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    Berita & Pengumuman Sekolah
                  </h3>
                </div>
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                >
                  Lihat Semua Berita
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/berita/${art.slug}`}
                    className="group bg-slate-900/30 hover:bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all flex flex-col sm:flex-row"
                  >
                    <div className="sm:w-48 h-44 sm:h-auto relative overflow-hidden bg-slate-950 shrink-0">
                      {art.coverImageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={art.coverImageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 rounded">
                            {art.category}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {formatDateIndo(art.createdAt)}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-2">
                          {art.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 text-xs font-bold text-indigo-400 flex items-center gap-1">
                        Baca Selengkapnya
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

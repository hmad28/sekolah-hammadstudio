import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Calendar,
  Layers,
  ChevronLeft,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [prog] = await db
    .select()
    .from(programs)
    .where(eq(programs.slug, slug))
    .limit(1);

  if (!prog) {
    notFound();
  }

  let parsedFeatures: string[] = [];
  try {
    parsedFeatures = JSON.parse(prog.features || "[]");
  } catch {
    parsedFeatures = [];
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Semua Program
          </Link>

          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {prog.imageUrl && (
              <div className="h-72 w-full relative overflow-hidden bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prog.imageUrl} alt={prog.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              </div>
            )}

            <div className="p-8 sm:p-12">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Program Keahlian Reguler & Intensif
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-4">{prog.name}</h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">{prog.description}</p>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 mb-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
                  Capaian Pembelajaran & Portofolio Lulusan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  {parsedFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Investasi Pendidikan</div>
                  <div className="text-2xl font-black text-amber-400">
                    {formatRupiah(prog.tuitionFee)}
                    <span className="text-xs text-slate-400 font-normal"> / bulan</span>
                  </div>
                </div>

                <Link
                  href="/spmb/daftar"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Daftar di Jurusan Ini Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

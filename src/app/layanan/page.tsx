import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { programs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Sparkles, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

export const revalidate = 0;

export default async function LayananCatalogPage() {
  const programList = await db.select().from(programs).where(eq(programs.isActive, true));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Program & Layanan Pendidikan</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Keahlian Digital Berstandar Industri
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pilihan program keahlian di Sekolah Hammad Studio yang dirancang langsung bersama praktisi agensi kreatif dan software house ternama.
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
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 transition-all hover:shadow-xl"
                >
                  <div className="h-52 w-full overflow-hidden bg-slate-950 relative">
                    {prog.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={prog.imageUrl}
                        alt={prog.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{prog.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-6">{prog.description}</p>

                      <div className="space-y-2 border-t border-slate-800/80 pt-4 mb-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                          Materi & Keunggulan:
                        </div>
                        {parsedFeatures.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500">Biaya Studi</div>
                        <div className="text-sm font-bold text-amber-400">
                          {formatRupiah(prog.tuitionFee)}
                          <span className="text-[10px] text-slate-400 font-normal"> / bln</span>
                        </div>
                      </div>
                      <Link
                        href={`/layanan/${prog.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-all"
                      >
                        Detail Kurikulum
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

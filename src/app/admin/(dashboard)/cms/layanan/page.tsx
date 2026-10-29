import { db } from "@/db";
import { programs } from "@/db/schema";
import { CheckCircle2, BookOpen } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminCmsLayananPage() {
  const programList = await db.select().from(programs);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Kelola Program & Layanan Pendidikan
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Daftar jurusan dan layanan pendidikan yang ditampilkan pada website publik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programList.map((p) => {
          let parsedFeatures: string[] = [];
          try {
            parsedFeatures = JSON.parse(p.features || "[]");
          } catch {
            parsedFeatures = [];
          }

          return (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {p.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    {formatRupiah(p.tuitionFee)} / bln
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{p.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{p.description}</p>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="text-[11px] font-bold text-slate-300">Kompetensi Kurikulum:</div>
                  {parsedFeatures.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
                Slug: /layanan/{p.slug}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

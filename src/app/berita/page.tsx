import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Calendar, ChevronRight, Sparkles } from "lucide-react";
import { formatDateIndo } from "@/lib/utils";

export const revalidate = 0;

export default async function BeritaPage() {
  const articleList = await db
    .select()
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.createdAt));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kanal Informasi & Pengumuman</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Berita & Agenda Sekolah
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ikuti kabar terbaru seputar kegiatan siswa, pengumuman kelulusan SPMB, pameran karya, dan informasi penting lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articleList.map((art) => (
              <Link
                key={art.id}
                href={`/berita/${art.slug}`}
                className="group bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
              >
                <div className="h-48 w-full bg-slate-950 relative overflow-hidden">
                  {art.coverImageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={art.coverImageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-indigo-600 rounded-md">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-slate-500 mb-2">
                      {formatDateIndo(art.createdAt)}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span>Baca Artikel</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

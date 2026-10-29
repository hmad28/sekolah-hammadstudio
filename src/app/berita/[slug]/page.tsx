import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ChevronLeft, Calendar, User, Tag } from "lucide-react";
import { formatDateIndo } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [art] = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);

  if (!art) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 lg:py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Berita & Pengumuman
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
              <span className="px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {art.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDateIndo(art.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {art.title}
            </h1>
          </header>

          {art.coverImageUrl && (
            <div className="h-80 w-full rounded-2xl overflow-hidden mb-10 bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={art.coverImageUrl} alt={art.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {art.content}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

import { db } from "@/db";
import { articles } from "@/db/schema";
import { desc } from "drizzle-orm";
import { CmsBeritaClient } from "./cms-berita-client";

export const revalidate = 0;

export default async function AdminCmsBeritaPage() {
  const articleList = await db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Kelola Berita & Pengumuman (CMS)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Publikasikan artikel, agenda sekolah, dan pengumuman hasil seleksi SPMB secara langsung.
        </p>
      </div>

      <CmsBeritaClient initialArticles={articleList} />
    </div>
  );
}

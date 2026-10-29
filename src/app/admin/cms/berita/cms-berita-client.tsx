"use client";

import { useState } from "react";
import { createArticleAction, deleteArticleAction } from "@/app/actions/cms";
import { UploadDropzone } from "@/lib/uploadthing";
import { Plus, Trash2, Calendar, FileText, Check, X, Loader2, Image as ImageIcon } from "lucide-react";
import { formatDateIndo } from "@/lib/utils";
import { toast } from "sonner";

interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  createdAt: Date | string;
}

export function CmsBeritaClient({ initialArticles }: { initialArticles: ArticleItem[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return;
    try {
      const res = await deleteArticleAction(id);
      if (res.success) {
        toast.success("Artikel berhasil dihapus.");
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        toast.error("Gagal menghapus artikel.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.set("coverImageUrl", coverImageUrl);

    try {
      const res = await createArticleAction(formData);
      if (res.success) {
        toast.success("Artikel baru berhasil diterbitkan!");
        setIsModalOpen(false);
        window.location.reload();
      } else {
        toast.error(res.error || "Gagal membuat artikel.");
      }
    } catch {
      toast.error("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Tulis Artikel Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {art.category}
                </span>
                <span className="text-[11px] text-slate-500">
                  {formatDateIndo(art.createdAt)}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{art.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{art.excerpt}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px]">/berita/{art.slug}</span>
              <button
                onClick={() => handleDelete(art.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-colors"
                title="Hapus Artikel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-white">Tulis Artikel / Pengumuman Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul Artikel</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Contoh: Pengumuman Hasil Seleksi SPMB Gelombang 1"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Kategori</label>
                <select
                  name="category"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Pengumuman">Pengumuman</option>
                  <option value="Kegiatan">Kegiatan</option>
                  <option value="Prestasi">Prestasi</option>
                  <option value="Artikel">Artikel & Tutorial</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  name="excerpt"
                  rows={2}
                  required
                  placeholder="Ringkasan 1-2 kalimat untuk preview..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Konten Lengkap</label>
                <textarea
                  name="content"
                  rows={5}
                  required
                  placeholder="Isi berita lengkap..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Gambar Cover (UploadThing)</label>
                {coverImageUrl ? (
                  <div className="flex items-center gap-3 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                    <Check className="w-4 h-4" />
                    <span className="truncate">Gambar cover berhasil diunggah</span>
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl("")}
                      className="text-xs text-slate-400 underline ml-auto"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="cmsMedia"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setCoverImageUrl(res[0].url);
                        toast.success("Gambar cover berhasil diunggah!");
                      }
                    }}
                    onUploadError={(err) => {
                      toast.error(`Upload error: ${err.message}`);
                    }}
                  />
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menerbitkan...
                    </>
                  ) : (
                    "Terbitkan Artikel"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

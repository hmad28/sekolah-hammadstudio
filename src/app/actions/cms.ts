"use server";

import { db } from "@/db";
import { articles, schoolServices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createArticleAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const category = (formData.get("category") as string) || "Pengumuman";
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImageUrl = (formData.get("coverImageUrl") as string) || "";

  try {
    await db.insert(articles).values({
      title,
      slug,
      category,
      excerpt,
      content,
      coverImageUrl,
      isPublished: true,
    });

    revalidatePath("/berita");
    revalidatePath("/admin/cms/berita");
    return { success: true };
  } catch (err: unknown) {
    console.error("Create article error:", err);
    return { success: false, error: "Gagal membuat artikel." };
  }
}

export async function deleteArticleAction(id: number) {
  try {
    await db.delete(articles).where(eq(articles.id, id));
    revalidatePath("/berita");
    revalidatePath("/admin/cms/berita");
    return { success: true };
  } catch (err: unknown) {
    console.error("Delete article error:", err);
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

export async function createServiceAction(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const description = formData.get("description") as string;
  const imageUrl = (formData.get("imageUrl") as string) || "";

  try {
    await db.insert(schoolServices).values({
      title,
      slug,
      description,
      imageUrl,
      features: "[]",
      orderIndex: 0,
      isPublished: true,
    });

    revalidatePath("/layanan");
    revalidatePath("/admin/cms/layanan");
    return { success: true };
  } catch (err: unknown) {
    console.error("Create service error:", err);
    return { success: false, error: "Gagal membuat layanan." };
  }
}

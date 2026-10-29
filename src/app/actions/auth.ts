"use server";

import { db } from "@/db";
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, signAdminToken, setAdminCookie, clearAdminCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface ActionState {
  error?: string;
  success?: boolean;
}

export async function loginAdminAction(
  prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  try {
    const [admin] = await db
      .select()
      .from(admins)
      .where(eq(admins.email, email.toLowerCase().trim()))
      .limit(1);

    if (!admin) {
      return { error: "Email atau password yang Anda masukkan salah." };
    }

    const isMatch = await verifyPassword(password, admin.passwordHash);
    if (!isMatch) {
      return { error: "Email atau password yang Anda masukkan salah." };
    }

    const token = await signAdminToken({
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });

    await setAdminCookie(token);
  } catch (err: unknown) {
    console.error("Login error:", err);
    return { error: "Terjadi kesalahan saat memproses login. Silakan coba lagi." };
  }

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

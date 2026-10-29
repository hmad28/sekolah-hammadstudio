"use server";

import { db } from "@/db";
import { registrations, admissionPeriods, programs } from "@/db/schema";
import { eq, or, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface RegistrationInput {
  periodId: number;
  programId: number;
  fullName: string;
  gender: string;
  nisn: string;
  birthPlace: string;
  birthDate: string;
  address: string;
  city: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  parentJob?: string;
  photoUrl?: string;
  documentUrls?: string[];
  paymentProofUrl?: string;
}

export async function submitRegistrationAction(data: RegistrationInput) {
  try {
    // Generate nomor registrasi otomatis: HS-2026-XXXX
    const currentYear = new Date().getFullYear();
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(registrations);

    const nextIndex = Number(countResult?.count || 0) + 1;
    const padded = String(nextIndex).padStart(4, "0");
    const registrationNumber = `HS-${currentYear}-${padded}`;

    const [newReg] = await db
      .insert(registrations)
      .values({
        registrationNumber,
        periodId: data.periodId,
        programId: data.programId,
        status: "pending",
        fullName: data.fullName,
        gender: data.gender,
        nisn: data.nisn,
        birthPlace: data.birthPlace,
        birthDate: data.birthDate,
        address: data.address,
        city: data.city,
        previousSchool: data.previousSchool,
        parentName: data.parentName,
        parentPhone: data.parentPhone,
        parentJob: data.parentJob || "",
        photoUrl: data.photoUrl || "",
        documentUrls: JSON.stringify(data.documentUrls || []),
        paymentProofUrl: data.paymentProofUrl || "",
      })
      .returning();

    revalidatePath("/admin/spmb");
    return { success: true, registrationNumber: newReg.registrationNumber };
  } catch (err: unknown) {
    console.error("Submit registration error:", err);
    return { success: false, error: "Gagal menyimpan data pendaftaran. Silakan periksa kembali formulir Anda." };
  }
}

export async function updateRegistrationStatusAction(
  id: number,
  status: "pending" | "verified" | "accepted" | "rejected",
  adminNotes?: string
) {
  try {
    await db
      .update(registrations)
      .set({
        status,
        adminNotes: adminNotes || "",
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, id));

    revalidatePath("/admin/spmb");
    revalidatePath(`/admin/spmb/${id}`);
    return { success: true };
  } catch (err: unknown) {
    console.error("Update registration status error:", err);
    return { success: false, error: "Gagal memperbarui status pendaftar." };
  }
}

export async function checkRegistrationStatusAction(query: string) {
  if (!query) return null;
  const cleanQuery = query.trim();

  try {
    const result = await db
      .select({
        id: registrations.id,
        registrationNumber: registrations.registrationNumber,
        status: registrations.status,
        fullName: registrations.fullName,
        nisn: registrations.nisn,
        parentName: registrations.parentName,
        parentPhone: registrations.parentPhone,
        adminNotes: registrations.adminNotes,
        createdAt: registrations.createdAt,
        programName: programs.name,
        periodName: admissionPeriods.name,
      })
      .from(registrations)
      .leftJoin(programs, eq(registrations.programId, programs.id))
      .leftJoin(admissionPeriods, eq(registrations.periodId, admissionPeriods.id))
      .where(
        or(
          eq(registrations.registrationNumber, cleanQuery),
          eq(registrations.parentPhone, cleanQuery)
        )
      )
      .orderBy(desc(registrations.createdAt))
      .limit(1);

    return result[0] || null;
  } catch (err: unknown) {
    console.error("Check status error:", err);
    return null;
  }
}

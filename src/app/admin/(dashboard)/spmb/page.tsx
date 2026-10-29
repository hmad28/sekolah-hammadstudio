import { db } from "@/db";
import { registrations, programs, admissionPeriods } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { SpmbManagerClient } from "./spmb-manager-client";

export const revalidate = 0;

export default async function AdminSpmbPage() {
  const allRegistrations = await db
    .select({
      id: registrations.id,
      registrationNumber: registrations.registrationNumber,
      status: registrations.status,
      fullName: registrations.fullName,
      gender: registrations.gender,
      nisn: registrations.nisn,
      birthPlace: registrations.birthPlace,
      birthDate: registrations.birthDate,
      address: registrations.address,
      city: registrations.city,
      previousSchool: registrations.previousSchool,
      parentName: registrations.parentName,
      parentPhone: registrations.parentPhone,
      parentJob: registrations.parentJob,
      photoUrl: registrations.photoUrl,
      documentUrls: registrations.documentUrls,
      paymentProofUrl: registrations.paymentProofUrl,
      adminNotes: registrations.adminNotes,
      createdAt: registrations.createdAt,
      programName: programs.name,
      periodName: admissionPeriods.name,
    })
    .from(registrations)
    .leftJoin(programs, eq(registrations.programId, programs.id))
    .leftJoin(admissionPeriods, eq(registrations.periodId, admissionPeriods.id))
    .orderBy(desc(registrations.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Manajemen Penerimaan Murid Baru (SPMB)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Verifikasi berkas, tindak lanjut wali murid via WhatsApp, dan penetapan status kelulusan.
        </p>
      </div>

      <SpmbManagerClient initialData={allRegistrations} />
    </div>
  );
}

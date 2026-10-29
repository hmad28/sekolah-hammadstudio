import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { hashPassword } from "../lib/auth";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  console.log("🌱 Seeding database...");
  const sql = neon(dbUrl);
  const db = drizzle(sql, { schema });

  // 1. Seed Admin
  const adminPassword = await hashPassword("admin12345");
  await db
    .insert(schema.admins)
    .values({
      name: "Super Admin Hammad Studio",
      email: "admin@hammadstudio.sch.id",
      passwordHash: adminPassword,
    })
    .onConflictDoNothing();
  console.log("✅ Admin seeded: admin@hammadstudio.sch.id / admin12345");

  // 2. Seed Gelombang SPMB
  await db
    .insert(schema.admissionPeriods)
    .values([
      {
        name: "Gelombang 1 - Early Bird TA 2026/2027",
        startDate: "2026-10-01",
        endDate: "2026-12-31",
        registrationFee: 250000,
        quota: 100,
        isActive: true,
      },
      {
        name: "Gelombang 2 - Reguler TA 2026/2027",
        startDate: "2027-01-01",
        endDate: "2027-04-30",
        registrationFee: 350000,
        quota: 80,
        isActive: false,
      },
    ])
    .onConflictDoNothing();
  console.log("✅ Admission periods seeded");

  // 3. Seed Program Keahlian / Jurusan
  await db
    .insert(schema.programs)
    .values([
      {
        name: "Desain Komunikasi Visual & Multimedia",
        slug: "dkv-multimedia",
        description:
          "Program keahlian unggulan berfokus pada graphic design, UI/UX, branding visual, motion graphics, dan industri kreatif digital modern.",
        features: JSON.stringify([
          "Adobe Creative Cloud Mastery (Illustrator, Photoshop, After Effects)",
          "Figma UI/UX & Design System Specialist",
          "Brand Identity & Commercial Illustration",
          "Magang di Agensi Desain & Studio Kreatif Mitra",
        ]),
        tuitionFee: 1750000,
        icon: "Palette",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
        isActive: true,
      },
      {
        name: "Pengembangan Web & Aplikasi Digital",
        slug: "web-software-development",
        description:
          "Membentuk software developer handal berstandar industri dengan penguasaan Next.js, TypeScript, Mobile Dev, dan arsitektur database modern.",
        features: JSON.stringify([
          "Fullstack Web (Next.js, React, Node.js, Tailwind CSS)",
          "Database Architecture & Cloud Deployment (PostgreSQL, Docker)",
          "Mobile App Engineering (Flutter / React Native)",
          "Portfolio Production & Real-world Client Projects",
        ]),
        tuitionFee: 1950000,
        icon: "Code2",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
        isActive: true,
      },
      {
        name: "Animasi 3D & Creative Video Production",
        slug: "animasi-3d-video",
        description:
          "Keahlian pembuatan aset 3D, sinematografi, rigging, rendering studio, video editing sinematik, serta visual effects (VFX).",
        features: JSON.stringify([
          "Blender 3D Modeling, Texturing & Character Rigging",
          "Cinematography & Lighting Production Studio",
          "Color Grading & DaVinci Resolve Editing",
          "Showreel Portofolio 3D & Short Movie Project",
        ]),
        tuitionFee: 1850000,
        icon: "Film",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
        isActive: true,
      },
    ])
    .onConflictDoNothing();
  console.log("✅ Programs seeded");

  // 4. Seed Berita / Pengumuman CMS
  await db
    .insert(schema.articles)
    .values([
      {
        title: "Penerimaan Murid Baru (SPMB) Gelombang 1 Resmi Dibuka!",
        slug: "spmb-gelombang-1-resmi-dibuka",
        excerpt:
          "Sekolah Hammad Studio membuka kesempatan bagi talenta muda kreatif untuk bergabung pada Tahun Ajaran 2026/2027.",
        content: `Sekolah Hammad Studio dengan bangga mengumumkan dibukanya Sistem Penerimaan Murid Baru (SPMB) Gelombang 1 untuk Tahun Ajaran 2026/2027.\n\nDengan kurikulum berbasis project-based learning dan pengajar praktisi profesional, siswa dididik untuk siap berkarir dan memiliki portofolio kelas dunia sejak masa studi.\n\nDaftar sekarang dan nikmati potongan biaya pendaftaran serta fasilitas studio kreatif lengkap!`,
        coverImageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        category: "Pengumuman",
        isPublished: true,
      },
      {
        title: "Kunjungan Industri & Showcase Karya Siswa di Studio Hammad",
        slug: "kunjungan-industri-showcase-karya-siswa",
        excerpt:
          "Siswa memamerkan puluhan karya branding, aplikasi web interaktif, dan animasi 3D di hadapan pimpinan industri kreatif.",
        content: `Suasana antusias mewarnai gelaran Showcase Karya Siswa Sekolah Hammad Studio. Kegiatan ini merupakan ujian akhir semester di mana setiap murid mempresentasikan karya di hadapan para praktisi industri studio animasi dan software house mitra.\n\nBanyak karya yang langsung mendapatkan apresiasi dan tawaran project komersial!`,
        coverImageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
        category: "Kegiatan",
        isPublished: true,
      },
    ])
    .onConflictDoNothing();
  console.log("✅ Articles seeded");

  // 5. Seed Testimoni
  await db
    .insert(schema.testimonials)
    .values([
      {
        name: "Farhan Ardiansyah",
        role: "Alumni DKV & UI/UX Designer di Studio Kreatif",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        content:
          "Belajar di Sekolah Hammad Studio mengubah cara pandang saya tentang desain. Kurikulumnya sangat praktis, langsung praktek bikin portofolio nyata, bukan sekadar teori membosankan.",
        rating: 5,
      },
      {
        name: "Ibu Nurhayati (Wali Murid)",
        role: "Wali dari Rizky Ramadhan (Jurusan Web Dev)",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        content:
          "Komunikasi dari panitia sekolah sangat transparan dan ramah lewat WhatsApp. Anak saya sekarang sangat bersemangat belajar coding dan sudah bisa bikin website sendiri!",
        rating: 5,
      },
    ])
    .onConflictDoNothing();
  console.log("✅ Testimonials seeded");

  console.log("🎉 Seeding completed successfully!");
}

main().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});

import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

// Admin Accounts
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Gelombang Pendaftaran SPMB
export const admissionPeriods = pgTable("admission_periods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  registrationFee: integer("registration_fee").default(250000).notNull(),
  quota: integer("quota").default(100).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Program Belajar / Jurusan Layanan Sekolah
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  features: text("features").notNull().default("[]"), // JSON string
  tuitionFee: integer("tuition_fee").default(1500000).notNull(),
  icon: text("icon").default("Sparkles"),
  imageUrl: text("image_url").default(""),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Pendaftaran Murid Baru
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  registrationNumber: text("registration_number").notNull().unique(),
  periodId: integer("period_id").references(() => admissionPeriods.id),
  programId: integer("program_id").references(() => programs.id),
  status: text("status").notNull().default("pending"), // pending | verified | accepted | rejected
  
  // Data Calon Murid
  fullName: text("full_name").notNull(),
  gender: text("gender").notNull(), // L | P
  nisn: text("nisn").notNull(),
  birthPlace: text("birth_place").notNull(),
  birthDate: text("birth_date").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  previousSchool: text("previous_school").notNull(),

  // Data Wali
  parentName: text("parent_name").notNull(),
  parentPhone: text("parent_phone").notNull(), // WhatsApp
  parentJob: text("parent_job").default(""),

  // Berkas Persyaratan (UploadThing)
  photoUrl: text("photo_url").default(""),
  documentUrls: text("document_urls").default("[]"), // JSON array of file URLs
  paymentProofUrl: text("payment_proof_url").default(""),

  // Catatan Admin
  adminNotes: text("admin_notes").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// CMS: Berita & Pengumuman
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url").default(""),
  category: text("category").default("Pengumuman").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CMS: Layanan Sekolah
export const schoolServices = pgTable("school_services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  features: text("features").default("[]").notNull(), // JSON array
  imageUrl: text("image_url").default(""),
  orderIndex: integer("order_index").default(0).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
});

// CMS: Testimoni
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // e.g. "Alumni Angkatan 2024"
  avatarUrl: text("avatar_url").default(""),
  content: text("content").notNull(),
  rating: integer("rating").default(5).notNull(),
});

// CMS: Pengaturan Sekolah
export const schoolSettings = pgTable("school_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});

# 🎓 Sekolah Hammad Studio - Platform Web SPMB & CMS

Platform website resmi dan portal **Sistem Penerimaan Murid Baru (SPMB / PPDB Online)** untuk **Sekolah Hammad Studio** (Pusat Pendidikan Kreatif & Vokasi Digital).

---

## 🚀 Fitur Unggulan

### 1. Website Publik & Profil Sekolah
- **Landing Page Modern**: Hero banner dinamis, USP, jadwal gelombang pendaftaran, testimoni alumni/wali murid, dan berita terkini.
- **Katalog Layanan & Program Belajar**: Rincian kurikulum DKV, Web & Mobile Dev, serta Animasi 3D.
- **Informasi SPMB**: Panduan pendaftaran, rincian biaya, jadwal seleksi, dan FAQ.
- **Kanal Berita & Pengumuman**: Publikasi agenda sekolah dan update kelulusan.

### 2. Sistem Penerimaan Murid Baru (SPMB Online)
- **Formulir Pendaftaran Multi-Step**:
  - Langkah 1: Pilihan Program Keahlian & Gelombang
  - Langkah 2: Biodata Calon Murid (NISN, Nama, Tgl Lahir, Asal Sekolah, Alamat)
  - Langkah 3: Data Orang Tua / Wali (**Nomor WhatsApp**)
  - Langkah 4: Unggah Berkas Persyaratan (Pas Foto, Bukti Bayar via UploadThing)
  - Langkah 5: Konfirmasi & Penerbitan Nomor Registrasi Otomatis (`HS-2026-XXXX`)
- **Fitur Cek Status Realtime**: Calon murid/wali cukup memasukkan Nomor Registrasi atau Nomor WhatsApp.
- **Cetak Bukti Pendaftaran**: Struk digital siap cetak / PDF.

### 3. Dashboard Admin & Follow-Up WhatsApp
- **Simple Admin Auth**: Autentikasi berbasis tabel Drizzle + `bcryptjs` + HTTP-Only JWT Session Cookie (`jose`) tanpa dependensi rumit pihak ketiga. Dilindungi otomatis oleh `middleware.ts`.
- **Tindak Lanjut WhatsApp Cepat (Direct Action)**:
  - Tombol **"Chat WA Wali"** dengan template pesan dinamis (Konfirmasi Berkas, Jadwal Wawancara, Pengumuman Kelulusan).
- **Verifikasi Berkas**: Preview pas foto dan bukti pembayaran langsung di browser.
- **CMS Terpadu**: Manajemen artikel berita, layanan sekolah, dan gelombang SPMB.

---

## 🛠️ Tech Stack & Best Practices

- **Framework**: [Next.js 15](https://nextjs.org) (App Router, Server Actions, TypeScript)
- **Database**: [Neon PostgreSQL Serverless](https://neon.tech) (`@neondatabase/serverless`)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team) (`drizzle-orm`, `drizzle-kit`)
- **Storage**: [UploadThing](https://uploadthing.com)
- **Authentication**: Custom Lightweight Admin Auth (HTTP-Only Cookie + `jose` JWT + `bcryptjs`)
- **Styling**: Tailwind CSS v4, Lucide Icons, Sonner Toasts

---

## 🔐 Kredensial Default Admin

- **URL Login Admin**: `/admin/login`
- **Email**: `admin@hammadstudio.sch.id`
- **Password**: `admin12345`

---

## ⚙️ Menjalankan Proyek Secara Lokal

1. **Clone repository**:
   ```bash
   git clone https://github.com/hmad28/sekolah-hammadstudio.git
   cd sekolah-hammadstudio
   ```

2. **Instal dependensi**:
   ```bash
   pnpm install
   ```

3. **Konfigurasi Environment Variables**:
   Salin `.env.example` ke `.env.local` dan isi kredensial Neon dan UploadThing Anda.

4. **Migrasi & Seeding Database**:
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Jalankan Development Server**:
   ```bash
   pnpm dev
   ```
   Buka `http://localhost:3000` di browser Anda.

6. **Build untuk Produksi**:
   ```bash
   pnpm run build
   pnpm start
   ```

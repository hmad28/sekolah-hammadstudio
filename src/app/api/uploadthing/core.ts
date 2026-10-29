import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Pas foto calon siswa
  studentPhoto: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl || file.url, name: file.name };
    }),

  // Dokumen Akta, KK, Ijazah, Rapor
  studentDocument: f({
    image: { maxFileSize: "8MB", maxFileCount: 5 },
    pdf: { maxFileSize: "8MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl || file.url, name: file.name };
  }),

  // Bukti Transfer Biaya Pendaftaran
  paymentProof: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl || file.url, name: file.name };
  }),

  // Media CMS (Artikel Berita, Layanan, Banner)
  cmsMedia: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl || file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

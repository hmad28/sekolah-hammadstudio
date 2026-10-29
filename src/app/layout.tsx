import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sekolah Hammad Studio - Pusat Pendidikan Kreatif & Vokasi Digital",
  description:
    "Pusat pendidikan kreatif, vokasi teknologi, dan multimedia di bawah naungan Hammad Studio. Penerimaan Murid Baru (SPMB) Online TA 2026/2027.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

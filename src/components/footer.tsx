import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-amber-400 flex items-center justify-center text-white font-bold shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">Sekolah Hammad Studio</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Pusat pendidikan kreatif dan teknologi modern yang mencetak talenta unggul berstandar industri dalam bidang desain, rekayasa perangkat lunak, dan produksi multimedia.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-400 bg-indigo-950/40 border border-indigo-900/40 p-2.5 rounded-lg">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Project-Based Learning & Portfolio Guarantee</span>
            </div>
          </div>

          {/* Program Keahlian */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Program & Layanan</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/layanan/dkv-multimedia" className="hover:text-indigo-400 transition-colors">
                  Desain Komunikasi Visual & UI/UX
                </Link>
              </li>
              <li>
                <Link href="/layanan/web-software-development" className="hover:text-indigo-400 transition-colors">
                  Pengembangan Web & Aplikasi
                </Link>
              </li>
              <li>
                <Link href="/layanan/animasi-3d-video" className="hover:text-indigo-400 transition-colors">
                  Animasi 3D & Video Production
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-indigo-400 transition-colors">
                  Fasilitas Studio & Lab Komputer
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigasi Cepat SPMB */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Informasi SPMB</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/spmb" className="hover:text-indigo-400 transition-colors">
                  Alur & Syarat Pendaftaran
                </Link>
              </li>
              <li>
                <Link href="/spmb/daftar" className="hover:text-indigo-400 transition-colors">
                  Formulir Pendaftaran Online
                </Link>
              </li>
              <li>
                <Link href="/spmb/cek-status" className="hover:text-indigo-400 transition-colors">
                  Cek Status Kelulusan / Seleksi
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-indigo-400 transition-colors">
                  Pengumuman & Agenda
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Kampus */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kontak & Kampus</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Hammad Studio Campus, Creative Hub Jl. Pendidikan Kreatif No. 28, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline SPMB: +62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>info@hammadstudio.sch.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>hammadstudio.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Sekolah Hammad Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/spmb" className="hover:text-slate-300">
              Ketentuan Pendaftaran
            </Link>
            <Link href="/admin/login" className="hover:text-indigo-400">
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

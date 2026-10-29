"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                  Sekolah Hammad Studio
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
                  Creative & Tech
                </span>
              </div>
              <p className="text-xs text-slate-400">Pusat Pendidikan Kreatif & Vokasi Digital</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Beranda
            </Link>
            <Link href="/layanan" className="text-slate-300 hover:text-white transition-colors">
              Layanan & Program
            </Link>
            <Link href="/spmb" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
              Info SPMB
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
            <Link href="/berita" className="text-slate-300 hover:text-white transition-colors">
              Berita & Artikel
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/spmb/cek-status"
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 rounded-lg transition-all"
            >
              Cek Status SPMB
            </Link>
            <Link
              href="/spmb/daftar"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-lg shadow-md shadow-indigo-600/30 transition-all hover:shadow-indigo-500/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Daftar SPMB Online
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/admin/login"
              title="Portal Admin"
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            Beranda
          </Link>
          <Link
            href="/layanan"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            Layanan & Program Belajar
          </Link>
          <Link
            href="/spmb"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            Informasi SPMB
          </Link>
          <Link
            href="/berita"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-200 hover:bg-slate-900 rounded-lg"
          >
            Berita & Artikel
          </Link>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/spmb/cek-status"
              onClick={() => setIsOpen(false)}
              className="text-center px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg"
            >
              Cek Status SPMB
            </Link>
            <Link
              href="/spmb/daftar"
              onClick={() => setIsOpen(false)}
              className="text-center px-4 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg"
            >
              Daftar SPMB Online
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/linh-vuc-hoat-dong', label: 'Lĩnh vực hoạt động' },
  { href: '/pvoil-easy', label: 'PVOIL Easy' },
  { href: '/pvoil-4u', label: 'PVOIL 4U' },
  { href: '/quan-he-co-dong', label: 'Quan hệ cổ đông' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/phat-trien-ben-vung', label: 'Phát triển bền vững' },
  { href: '/tuoi-tre-pvoil', label: 'Tuổi trẻ PVOIL' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <img
            src="/images/pvoil/logo-fallback.svg"
            alt="PVOIL"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Tìm kiếm"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>

          <Link
            href="/en"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300"
            aria-label="English"
          >
            <img src="/images/pvoil/flag-en.svg" alt="EN" className="h-5 w-5 rounded-sm object-cover" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ef3d32] text-white shadow-sm transition hover:bg-[#dc2f24]"
            aria-label="Mở menu"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#ef3d32] text-white shadow-sm md:hidden"
          aria-label="Mở menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </span>
        </button>
      </div>

      <div className="border-t border-slate-100">
        <nav className="mx-auto hidden max-w-7xl items-center gap-8 overflow-x-auto px-4 py-3 text-[15px] md:flex sm:px-6 lg:px-8">
          {navItems.map((item, index) => (
            <Link
              key={`${item.href}-${item.label}-${index}`}
              href={item.href}
              className="whitespace-nowrap text-slate-800 transition hover:text-[#ef3d32]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {isOpen ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden sm:px-6">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500"
              aria-label="Tìm kiếm"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <Link href="/en" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200">
              <img src="/images/pvoil/flag-en.svg" alt="EN" className="h-5 w-5 rounded-sm object-cover" />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {navItems.map((item, index) => (
              <Link
                key={`${item.href}-${item.label}-${index}-mobile`}
                href={item.href}
                className="text-base text-slate-800"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

export type SelectOption = { value: string; label: string };

export function SelectField({
  value,
  onChange,
  options,
  placeholder = "Vui lòng chọn",
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Đóng dropdown khi bấm ra ngoài.
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Tự focus ô tìm kiếm khi mở dropdown.
  useEffect(() => {
    if (open) {
      setSearch("");
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const filtered = search.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(search.trim().toLowerCase()))
    : options;

  return (
    <div ref={rootRef} className="relative mt-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
      >
        <span className={selected ? "text-slate-900" : "text-slate-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.24 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-100 p-2">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm outline-none focus:border-cyan-600"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-slate-400">Không có kết quả</li>
            )}
            {filtered.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`block w-full px-3 py-2 text-left text-sm ${
                    o.value === value
                      ? "bg-cyan-700 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

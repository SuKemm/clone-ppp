"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { PtscShell } from "@/components/ptsc-shell";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function ContactPageEn() {
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    captchaInput: "",
  });
  const [status, setStatus] = useState<"idle" | "error" | "sent" | "sending">("idle");

  const captchaLetters = useMemo(() => captcha.split(""), [captcha]);

  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setForm((f) => ({ ...f, captchaInput: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.captchaInput.trim().toUpperCase() !== captcha) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", phone: "", email: "", subject: "", message: "", captchaInput: "" });
      refreshCaptcha();
    } catch {
      setStatus("error");
    }
  }

  return (
    <PtscShell>
      {/* Hero banner */}
      <section className="relative h-64 w-full overflow-hidden sm:h-80">
        <img
          src="/images/ptsc/banner-panorama.jpg"
          alt="Dakdrinh Hydropower Plant"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/10" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/en-US" className="transition hover:text-cyan-700">
            Home
          </Link>
          <span>›</span>
          <span className="text-[#FF6B00]">Contact</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: form */}
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Contact</h1>
            <p className="mt-4 text-lg text-slate-600">
              If you have any requests or questions, please get in touch with us.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#089F50] focus:ring-2 focus:ring-[#089F50]/20"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#089F50] focus:ring-2 focus:ring-[#089F50]/20"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#089F50] focus:ring-2 focus:ring-[#089F50]/20"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#089F50] focus:ring-2 focus:ring-[#089F50]/20"
                />
              </div>

              <textarea
                placeholder="Message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[#089F50] focus:ring-2 focus:ring-[#089F50]/20"
              />

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex select-none items-center gap-1 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-2 font-mono text-lg tracking-[0.3em] text-slate-700">
                  {captchaLetters.map((ch, i) => (
                    <span
                      key={i}
                      style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (6 + i * 2)}deg)` }}
                      className="inline-block italic"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  aria-label="Refresh captcha code"
                  className="rounded-full border border-slate-300 p-2 text-slate-500 transition hover:border-[#089F50] hover:text-[#089F50]"
                >
                  ↻
                </button>
                <input
                  type="text"
                  required
                  placeholder="Enter the code shown"
                  value={form.captchaInput}
                  onChange={(e) => setForm((f) => ({ ...f, captchaInput: e.target.value }))}
                  className="min-w-[160px] flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-[#089F50] focus:ring-2 focus:ring-[#089F50]/20"
                />
              </div>

              {status === "error" ? (
                <p className="text-sm text-red-600">
                  The code entered is incorrect or sending failed, please try again.
                </p>
              ) : null}
              {status === "sent" ? (
                <p className="text-sm text-[#089F50]">
                  Thank you for contacting us. We will respond as soon as possible.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-[#FF6B00] px-10 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#e65f00] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
            </form>
          </div>

          {/* Right: company info */}
          <div className="h-fit rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-lg font-extrabold uppercase leading-snug text-[#089F50]">
              Dakdrinh Hydropower Joint Stock Company
            </p>

            <div className="mt-6 space-y-5 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B00]" />
                <p>
                  <span className="font-bold text-slate-900">Head office: </span>
                  Ra Nhua Village, Son Tay Commune, Quang Ngai Province.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B00]" />
                <p>
                  <span className="font-bold text-slate-900">Phone: </span>
                  (+84) 255 629 3777
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#FF6B00]" />
                <p>
                  <span className="font-bold text-slate-900">Email: </span>
                  info@dakdrinhhydropower.vn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}

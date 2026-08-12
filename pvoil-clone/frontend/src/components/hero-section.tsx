import Link from 'next/link';

const quickLinks = [
  {
    title: 'Quỹ bình ổn giá xăng dầu',
    href: '#',
  },
  {
    title: 'Thông cáo báo chí',
    href: '#',
  },
  {
    title: 'Biểu giá dịch vụ cảng biển',
    href: '#',
  },
  {
    title: 'Thông tin môi trường',
    href: '#',
  },
];

export function HeroSection() {
  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex min-h-24 items-center justify-between rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] px-6 py-5 text-slate-900 transition hover:border-[#f6a31a]/50 hover:bg-white"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Thông tin</p>
                <h2 className="mt-2 text-lg font-semibold leading-7 text-slate-950">{item.title}</h2>
              </div>
              <span className="text-2xl text-[#f6a31a]">›</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';

const featuredNews = [
  {
    title: 'PVOIL tiếp tục vào danh sách 25 thương hiệu dẫn đầu',
    category: 'TIN PVOIL',
    date: '20.08.2025',
    href: '/pvoil-tiep-tuc-vao-danh-sach-25-thuong-hieu-dan-dau',
    image: '/images/pvoil/image-fallback.svg',
  },
  {
    title: 'Ông Dương Mạnh Sơn được bầu làm Chủ tịch HĐQT PVOIL',
    category: 'TIN PVOIL',
    date: '24.04.2026',
    href: '/ong-duong-manh-son-duoc-bau-lam-chu-tich-hdqt-pvoil',
    image: '/images/pvoil/image-fallback.svg',
  },
  {
    title: 'Đại hội đồng cổ đông thường niên 2026: PVOIL thay đổi nhân sự cấp cao, tiếp đà tăng trưởng',
    category: 'TIN PVOIL',
    date: '24.04.2026',
    href: '/dai-hoi-dong-co-dong-thuong-nien-nam-2026-pvoil-thay-doi-nhan-su-cap-cao-tiep-da-tang-truong',
    image: '/images/pvoil/image-fallback.svg',
  },
];

export function NewsSection() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Thông tin nổi bật</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Thông tin nổi bật
            </h2>
          </div>
          <Link href="/tin-tuc" className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-500">
            Xem tất cả
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredNews.map((item) => (
            <article key={item.href} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <Link href={item.href}>
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate-500">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950 leading-8">
                  <Link href={item.href} className="hover:text-orange-600">
                    {item.title}
                  </Link>
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

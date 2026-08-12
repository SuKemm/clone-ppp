import Link from 'next/link';

const sampleVideos = [
  { title: 'Bản tin PVOIL số 148', href: '#', thumb: '/images/pvoil/image-fallback.svg' },
  { title: 'PVOIL CHUNG TAY CHUYỂN ĐỔI NĂNG LƯỢNG VÌ TƯƠNG LAI XANH', href: '#', thumb: '/images/pvoil/image-fallback.svg' },
  { title: 'PVOIL 4U AI', href: '#', thumb: '/images/pvoil/image-fallback.svg' },
];

export function NewsCarousel() {
  return (
    <section className="home-7-section section-large bg-[#f7f9fb] py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Quảng cáo</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Video</h2>
          </div>
          <Link href="/tin-tuc" className="text-sm font-semibold text-orange-600">Tất cả</Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {sampleVideos.map((v) => (
            <article key={v.title} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <div className="h-48 overflow-hidden bg-slate-900">
                <img src={v.thumb} alt={v.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">{v.title}</h3>
                <Link href={v.href} className="mt-3 inline-block text-sm text-orange-600">Xem chi tiết</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

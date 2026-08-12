import Link from 'next/link';

export function Sustainability() {
  return (
    <section className="home-9-section bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Phát triển bền vững</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">PVOIL đề cao tính nhân văn cũng như hiệu quả trong tất cả các hoạt động cộng đồng</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">PVOIL triển khai các chương trình cộng đồng, trách nhiệm xã hội và định hướng vận hành bền vững song hành với hiệu quả kinh doanh.</p>
            <div className="mt-6">
              <Link href="/phat-trien-ben-vung" className="text-sm font-semibold text-orange-600">Xem chi tiết</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-sm">
            <img src="/images/pvoil/image-fallback.svg" alt="Phát triển bền vững" className="h-72 w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

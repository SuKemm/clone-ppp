import Link from 'next/link';

const businessAreas = [
  {
    title: 'Xuất nhập khẩu dầu thô và kinh doanh dầu quốc tế',
    href: '/xuat-nhap-khau-dau-tho-va-kinh-doanh-dau-quoc-te',
  },
  {
    title: 'Kinh doanh phân phối các sản phẩm dầu',
    href: '/kinh-doanh-phan-phoi-cac-san-pham-dau',
  },
  {
    title: 'Sản xuất, chế biến xăng dầu, dầu mỡ nhờn',
    href: '/san-xuat-che-bien-xang-dau-dau-mo-nhon',
  },
];

export function BusinessAreas() {
  return (
    <section className="home-6-section section-large bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Lĩnh vực hoạt động</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">Xuất nhập khẩu dầu thô, phân phối các sản phẩm dầu và sản xuất, chế biến xăng dầu là các mảng hoạt động trọng tâm của PVOIL.</p>
          </div>
          <Link href="/linh-vuc-hoat-dong" className="text-sm font-semibold text-orange-600 hover:text-orange-500">
            Xem chi tiết
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {businessAreas.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-6 transition hover:border-orange-400/50 hover:bg-white"
            >
              <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">Xem chi tiết</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

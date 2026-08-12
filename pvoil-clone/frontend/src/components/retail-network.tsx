import Link from 'next/link';

const networkStats = [
  { value: '1.000', label: 'Cửa hàng xăng dầu trực thuộc' },
  { value: '1.500', label: 'Cửa hàng xăng dầu đại lý' },
  { value: '34', label: 'Tỉnh, thành có mạng lưới phân phối' },
];

export function RetailNetwork() {
  return (
    <section className="home-8-section section-large bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Mạng lưới kinh doanh</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Hệ thống cửa hàng xăng dầu</h2>
          </div>
          <Link href="/gioi-thieu" className="text-sm font-semibold text-orange-600">Tìm cửa hàng xăng dầu PVOIL</Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-6">
            <h3 className="text-xl font-semibold text-slate-950">Cửa hàng xăng dầu PVOIL</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Từ 82 CHXD ban đầu, đến nay PVOIL đã có 1000 CHXD trực thuộc khang trang, đồng bộ. Bên cạnh đó, PVOIL có hơn 1.500 CHXD đại lý; tạo thành mạng lưới phân phối rộng khắp 34 tỉnh, thành trên cả nước.
            </p>
          </div>

          <div className="grid gap-4">
            {networkStats.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
              </div>
            ))}
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Hệ thống kho xăng dầu</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Cùng mạng lưới kinh doanh đồng bộ, PVOIL duy trì hệ thống kho xăng dầu rộng khắp để phục vụ phân phối và bán lẻ.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

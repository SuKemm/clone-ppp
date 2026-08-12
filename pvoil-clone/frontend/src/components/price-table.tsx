const prices = [
  { label: 'Xăng E10 RON 95-III', value: '20.000 đ' },
  { label: 'Xăng E5 RON 92-II', value: '19.190 đ' },
  { label: 'Dầu DO 0,05S-II', value: '21.740 đ' },
  { label: 'Dầu DO 0,001S-V', value: '23.840 đ' },
];

export function PriceTable() {
  return (
    <section className="home-gas-price bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Bảng giá bán lẻ xăng dầu (Đồng/lít)</span>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Giá điều chỉnh từ 15:00 ngày 09/07/2026</h2>
          </div>
          <div className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-6">
            <div className="space-y-4">
              {prices.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <span className="font-semibold text-slate-950">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

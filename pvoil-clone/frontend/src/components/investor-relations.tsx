const investorStats = [
  { label: 'Vốn hóa thị trường (VNĐ)', value: '11.583,4 tỷ' },
  { label: 'Số lượng cổ phiếu', value: '1.034.229.500' },
];

const companyOverview = [
  {
    value: '154.880',
    label: 'tỷ VNĐ\nDoanh thu năm 2025',
  },
  {
    value: '10.342',
    label: 'tỷ VNĐ\nVốn điều lệ',
  },
  {
    value: '7 triệu',
    label: 'tấn/năm\nCung cấp dầu thô cho nhà máy lọc dầu Dung Quất',
  },
  {
    value: '7,9 triệu',
    label: 'tấn/năm\nXuất bán dầu thô',
  },
  {
    value: '5,8 Triệu',
    label: 'm3/năm\nPhân phối xăng dầu, chiếm 23% thị phần',
  },
];

export function InvestorRelations() {
  return (
    <section className="home-4-section section-large bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">Cổ phiếu PVOIL</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Tổng Công ty Dầu Việt Nam - CTCP (UPCOM:OIL)</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {investorStats.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-6">
                  <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-6">
            <h3 className="text-xl font-semibold text-slate-950">Tổng quan PVOIL</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {companyOverview.map((item) => (
                <div key={`${item.value}-${item.label}`} className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-3xl font-semibold text-slate-950">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 whitespace-pre-line">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

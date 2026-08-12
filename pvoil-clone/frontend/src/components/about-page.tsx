const timeline = [
  { date: '4/1994', title: 'Tổng công ty Thương mại Dầu khí (PETECHIM)' },
  { date: '04/1996', title: 'Công ty Chế biến và Kinh doanh Sản phẩm Dầu mỏ (PDC)' },
  { date: '06/06/2008', title: 'Tổng công ty Dầu Việt Nam (PVOIL)' },
  { date: '01/08/2018', title: 'Tổng công ty Dầu Việt Nam - CTCP (PVOIL)' },
];

const sections = [
  {
    id: 'section-1',
    nav: 'Tổng quan',
    title: 'Tổng quan về Tổng công ty Dầu Việt Nam - CTCP',
    paragraphs: [
      'Tổng công ty Dầu Việt Nam (PVOIL) là đơn vị thành viên của Tập đoàn Công nghiệp – Năng lượng Quốc gia Việt Nam (Petrovietnam), được thành lập năm 2008 trên cơ sở hợp nhất Tổng công ty Thương mại dầu khí (Petechim), và Công ty Chế biến và Kinh doanh sản phẩm dầu mỏ (PDC); và trở thành công ty cổ phần từ ngày 01/8/2018.',
      'PVOIL có trụ sở chính tại TP.HCM, vốn điều lệ 10.342 tỷ đồng, và lực lượng lao động hơn 7.400 người.',
    ],
  },
  {
    id: 'section-2',
    nav: 'Sứ mệnh & Tầm nhìn',
    title: 'Sứ mệnh & Tầm nhìn',
    paragraphs: [
      'PVOIL phát triển theo định hướng đồng bộ hóa hệ thống kinh doanh xăng dầu, nâng cao hiệu quả vận hành, mở rộng dịch vụ năng lượng và tăng cường chất lượng trải nghiệm khách hàng trên toàn quốc.',
      'Doanh nghiệp hướng tới vai trò đầu mối mạnh trong lĩnh vực dầu khí hạ nguồn, phát triển bền vững, minh bạch và hiện đại hóa quản trị gắn với hệ sinh thái bán lẻ.',
    ],
  },
  {
    id: 'section-3',
    nav: 'Điều lệ & Quy chế quản trị công ty',
    title: 'Điều lệ & Quy chế quản trị công ty',
    paragraphs: [
      'Sau khi chuyển sang mô hình công ty cổ phần, PVOIL triển khai hệ thống điều lệ, quy chế quản trị và cơ chế kiểm soát nội bộ để phục vụ hoạt động doanh nghiệp đại chúng, bảo đảm minh bạch và hiệu quả điều hành.',
    ],
  },
  {
    id: 'section-4',
    nav: 'Bộ máy tổ chức',
    title: 'Bộ máy tổ chức',
    paragraphs: [
      'Bộ máy tổ chức của PVOIL được xây dựng theo quy mô tổng công ty với mạng lưới đơn vị thành viên, đơn vị trực thuộc và hệ thống kinh doanh phân bổ rộng khắp, tạo nền tảng cho hoạt động điều hành tập trung và linh hoạt.',
    ],
  },
  {
    id: 'section-5',
    nav: 'Sơ đồ tổ chức',
    title: 'Sơ đồ tổ chức',
    paragraphs: [
      'Cơ cấu tổ chức của PVOIL phản ánh mô hình quản trị dành cho doanh nghiệp quy mô lớn trong lĩnh vực dầu khí hạ nguồn, kết nối chặt chẽ các khối kinh doanh, đầu tư, vận hành, tài chính và hỗ trợ quản trị.',
    ],
  },
  {
    id: 'section-6',
    nav: 'Đoàn thể',
    title: 'Đoàn thể',
    paragraphs: [
      'Các tổ chức đoàn thể tại PVOIL đồng hành cùng doanh nghiệp trong phát triển văn hóa nội bộ, phong trào thi đua, hoạt động xã hội và chăm lo đời sống người lao động.',
    ],
  },
];

export function AboutPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Trang chủ</span>
            <span>›</span>
            <span className="text-slate-900">Giới thiệu</span>
          </nav>
          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <img src="/images/pvoil/image-fallback.svg" alt="Giới thiệu" className="h-[260px] w-full object-cover sm:h-[360px]" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold text-slate-950">Giới thiệu</h1>
        </div>
      </section>

      <section className="sticky top-[113px] z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-max gap-6 text-sm text-slate-700">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap hover:text-[#ef3d32]">
                {section.nav}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fb] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {timeline.map((item) => (
              <div key={item.date} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ef3d32]">{item.date}</p>
                <h2 className="mt-3 text-lg font-semibold leading-7 text-slate-950">{item.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="grid gap-6">
            {sections.map((section) => (
              <article id={section.id} key={section.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm scroll-mt-44">
                <h2 className="text-2xl font-semibold text-slate-950">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-8 text-slate-700">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-[1.5rem] border border-slate-200 bg-[#0d3b66] p-7 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">PVOIL</p>
            <h2 className="mt-3 text-2xl font-semibold">Tổng công ty Dầu Việt Nam - CTCP</h2>
            <p className="mt-4 text-sm leading-7 text-white/85">PVOIL có trụ sở chính tại TP.HCM, vốn điều lệ 10.342 tỷ đồng và lực lượng lao động hơn 7.400 người.</p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-white/85">
              <li>Đơn vị thành viên của Petrovietnam.</li>
              <li>Hoạt động trong lĩnh vực dầu khí hạ nguồn và phân phối xăng dầu.</li>
              <li>Chuyển sang mô hình công ty cổ phần từ ngày 01/08/2018.</li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}

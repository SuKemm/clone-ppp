import type { SectionPageContent } from '@/components/section-page';

export const gioiThieuContent: SectionPageContent = {
  eyebrow: 'Giới thiệu',
  title: 'Tổng công ty Dầu Việt Nam - CTCP',
  intro:
    'PVOIL là đơn vị đầu mối của Petrovietnam trong lĩnh vực kinh doanh, phân phối xăng dầu và các sản phẩm năng lượng, đồng thời đẩy mạnh đổi mới quản trị và mở rộng hệ sinh thái dịch vụ trên phạm vi toàn quốc.',
  actions: [
    { label: 'Liên hệ PVOIL', href: '/lien-he' },
    { label: 'Lĩnh vực hoạt động', href: '/linh-vuc-hoat-dong' },
    { label: 'Quan hệ cổ đông', href: '/quan-he-co-dong' },
  ],
  facts: [
    { value: '154.880', label: 'tỷ VNĐ doanh thu năm 2025' },
    { value: '10.342', label: 'tỷ VNĐ vốn điều lệ' },
    { value: '1.000', label: 'cửa hàng xăng dầu trực thuộc' },
    { value: '1.500', label: 'cửa hàng xăng dầu đại lý' },
  ],
  sections: [
    {
      title: 'Vai trò và định hướng',
      body:
        'PVOIL giữ vai trò nòng cốt trong chuỗi cung ứng và phân phối xăng dầu của Petrovietnam, phát triển theo định hướng hiện đại hóa hạ tầng, chuẩn hóa hệ thống bán lẻ và tăng cường năng lực quản trị doanh nghiệp.',
      bullets: [
        'Tập trung phát triển hệ thống phân phối rộng khắp trên cả nước.',
        'Đồng bộ thương hiệu, cửa hàng, kho cảng và chất lượng dịch vụ.',
        'Đẩy mạnh chuyển đổi số trong bán lẻ và chăm sóc khách hàng.',
      ],
    },
    {
      title: 'Nền tảng vận hành',
      body:
        'Hoạt động của PVOIL được triển khai trên nền tảng kết hợp giữa xuất nhập khẩu dầu thô, bán buôn, bán lẻ xăng dầu, logistics, tồn trữ và phát triển các giải pháp năng lượng gắn với nhu cầu thị trường.',
      bullets: [
        'Hệ thống kho và hạ tầng tiếp nhận, pha chế, phân phối.',
        'Mạng lưới bán lẻ phủ rộng với tiêu chuẩn nhận diện thống nhất.',
        'Đội ngũ nhân sự đông đảo tham gia vận hành trên toàn hệ thống.',
      ],
    },
  ],
};

export const linhVucHoatDongContent: SectionPageContent = {
  eyebrow: 'Lĩnh vực hoạt động',
  title: 'Lĩnh vực hoạt động',
  intro:
    'Đảm bảo lợi ích hợp lý cho khách hàng và đối tác, trên cơ sở tuân thủ nguyên tắc “đôi bên cùng có lợi”.',
  actions: [
    { label: 'Xuất nhập khẩu dầu thô', href: '/linh-vuc-hoat-dong' },
    { label: 'PVOIL Easy', href: '/pvoil-easy' },
    { label: 'PVOIL 4U', href: '/pvoil-4u' },
  ],
  facts: [
    { value: '7 triệu', label: 'tấn/năm cung cấp dầu thô cho nhà máy lọc dầu Dung Quất' },
    { value: '7,9 triệu', label: 'tấn/năm xuất bán dầu thô' },
    { value: '5,8 triệu', label: 'm3/năm sản lượng kinh doanh xăng dầu' },
    { value: '700.000', label: 'm3/năm chế biến sản phẩm dầu' },
  ],
  sections: [
    {
      title: 'Xuất nhập khẩu dầu thô và kinh doanh dầu quốc tế',
      body:
        'Đây là trụ cột quan trọng trong chuỗi hoạt động của PVOIL, gắn với năng lực giao dịch thương mại, điều phối nguồn cung và đáp ứng yêu cầu của thị trường trong nước cũng như quốc tế.',
      bullets: [
        'Điều phối nguồn dầu thô phục vụ các nhà máy lọc dầu.',
        'Thực hiện giao dịch thương mại quốc tế theo chuẩn ngành năng lượng.',
      ],
    },
    {
      title: 'Kinh doanh phân phối các sản phẩm dầu',
      body:
        'PVOIL duy trì hoạt động bán buôn, bán lẻ và phân phối với hệ thống cửa hàng trực thuộc và đại lý rộng khắp, đồng thời phát triển dịch vụ gia tăng cho khách hàng cá nhân và doanh nghiệp.',
      bullets: [
        'Hệ thống cửa hàng trực thuộc và đại lý phủ rộng.',
        'Chuẩn hóa quy trình phục vụ và nhận diện thương hiệu cửa hàng.',
      ],
    },
    {
      title: 'Sản xuất, chế biến xăng dầu, dầu mỡ nhờn',
      body:
        'Hoạt động chế biến và gia công giúp PVOIL hoàn thiện chuỗi giá trị, tạo năng lực đáp ứng linh hoạt cho nhiều phân khúc khách hàng và nhu cầu kỹ thuật khác nhau.',
    },
    {
      title: 'Mô hình hoạt động',
      body:
        'Cùng với các lĩnh vực kinh doanh cốt lõi, PVOIL xây dựng mô hình hoạt động gắn kết giữa dầu thô, phân phối sản phẩm dầu, bán lẻ, logistics và các giải pháp số để phục vụ khách hàng trên toàn hệ thống.',
    },
  ],
};

export const pvoilEasyContent: SectionPageContent = {
  eyebrow: 'PVOIL Easy',
  title: 'PVOIL Easy',
  intro:
    'PVOIL đã ứng dụng giải pháp Thẻ điện tử (digital card), đọc QR code trên thiết bị di động của tài xế và nhân viên bán hàng để thực hiện giao dịch mua bán xăng dầu tại các CHXD PVOIL.',
  actions: [
    { label: 'Hotline PVOIL Easy', href: '/lien-he' },
    { label: 'PVOIL 4U', href: '/pvoil-4u' },
    { label: 'Hướng dẫn sử dụng', href: '/pvoil-easy' },
  ],
  facts: [
    { value: 'Không tiền mặt', label: 'thanh toán không dùng tiền mặt' },
    { value: 'Không thẻ tín dụng', label: 'thanh toán không dùng thẻ tín dụng' },
    { value: 'Tự động', label: 'cập nhật công nợ' },
    { value: 'Quản lý tập trung', label: 'mọi giao dịch phát sinh' },
  ],
  sections: [
    {
      title: 'Giới thiệu PVOIL Easy',
      body:
        'Để tham gia chương trình PVOIL Easy, khách hàng ký hợp đồng với một đơn vị kinh doanh của PVOIL, sau đó có thể mua xăng dầu tại cửa hàng xăng dầu của đơn vị kinh doanh đó hoặc tại bất kỳ cửa hàng xăng dầu nào trong toàn hệ thống PVOIL trên cả nước nhưng chỉ thanh toán vào cuối kỳ cho đơn vị kinh doanh đã ký hợp đồng.',
      bullets: [
        'Danh sách các ứng dụng ngân hàng và ví điện tử có thể thanh toán mua xăng dầu tại các cây xăng PVOIL và COMECO.',
        'Mạng lưới cửa hàng xăng dầu áp dụng PVOIL Easy trên toàn hệ thống.',
      ],
    },
    {
      title: 'Chương trình PVOIL Easy',
      body:
        'Chương trình PVOIL Easy xây dựng hệ thống quản lý tập trung, giải pháp quản lý và thanh toán hiện đại thông qua phần mềm quản lý của chương trình PVOIL Easy; cung cấp cho khách hàng các dịch vụ chăm sóc, các chương trình khuyến mại nhằm gia tăng lợi ích cho khách hàng là các doanh nghiệp có phương tiện vận tải hoạt động trên các tuyến quốc lộ và các tỉnh, thành phố trên toàn quốc.',
      bullets: [
        'Truy cập phần mềm và tải ứng dụng PVOIL Driver, PVOIL Station.',
        'Video giới thiệu và bộ tài liệu hướng dẫn sử dụng đầy đủ.',
      ],
    },
  ],
};

export const pvoil4uContent: SectionPageContent = {
  eyebrow: 'PVOIL 4U',
  title: 'PVOIL 4U',
  intro:
    'Ứng dụng mua xăng dầu dành cho khách hàng cá nhân, là một sản phẩm mới được phát triển bởi Tổng Công ty Dầu Việt Nam - CTCP (PVOIL) với mục tiêu mang đến cho khách hàng trải nhiệm mua xăng dầu thuận tiện, thông minh, nhanh chóng, an toàn và nhiều ưu đãi thiết thực.',
  actions: [
    { label: 'Hotline PVOIL 4U', href: '/lien-he' },
    { label: 'PVOIL Easy', href: '/pvoil-easy' },
    { label: 'Liên hệ', href: '/lien-he' },
  ],
  facts: [
    { value: '089 665 2266', label: 'hotline PVOIL 4U' },
    { value: '096 198 1860', label: 'hotline PVOIL 4U' },
    { value: 'Tín dụng', label: 'ngân hàng cấp tín dụng mua xăng dầu' },
    { value: 'Voucher', label: 'cho tặng phiếu và voucher xăng dầu' },
  ],
  sections: [
    {
      title: 'Giới thiệu về PVOIL 4U',
      body:
        'Ứng dụng PVOIL 4U cung cấp giải pháp toàn diện, tiên phong và chuyên biệt dành cho khách hàng mua xăng dầu; với các tính năng độc đáo, riêng có như hỗ trợ tài chính, cho tặng phiếu xăng dầu, quản lý nhóm người dùng ... hứa hẹn sẽ trở thành người bạn đồng hành không thể thiếu của mọi tài xế.',
      bullets: [
        'Cho tặng phiếu xăng dầu.',
        'Ngân hàng cấp tín dụng mua xăng dầu.',
        'Cho tặng voucher xăng dầu.',
        'Trọn vẹn tiện ích cho khách hàng mua xăng dầu.',
      ],
    },
    {
      title: 'Hướng dẫn sử dụng',
      body:
        'Trang PVOIL 4U công bố đầy đủ các hướng dẫn như liên kết ngân hàng, thanh toán thẻ tín dụng HDBank, thanh toán đơn hàng, mua bảo hiểm phương tiện và đăng ký thẻ tín dụng trên ứng dụng.',
      bullets: [
        'Dành cho khách hàng PVOIL 4U và mạng lưới cửa hàng áp dụng PVOIL 4U.',
        'Có chính sách quyền riêng tư và thỏa thuận sử dụng dịch vụ.',
      ],
    },
  ],
};

export const quanHeCoDongContent: SectionPageContent = {
  eyebrow: 'Quan hệ cổ đông',
  title: 'Quan hệ cổ đông',
  intro:
    'PVOIL luôn nỗ lực hết sức để đảm bảo hiệu quả cao nhất trong hoạt động, tối đa lợi ích cho doanh nghiệp, cổ đông và người lao động.',
  actions: [
    { label: 'Tin cổ đông', href: '/quan-he-co-dong' },
    { label: 'Báo cáo tài chính', href: '/quan-he-co-dong' },
    { label: 'Đại hội đồng cổ đông', href: '/quan-he-co-dong' },
  ],
  facts: [
    { value: 'OIL', label: 'mã giao dịch UPCOM' },
    { value: '11.583,4 tỷ', label: 'vốn hóa thị trường' },
    { value: '1.034.229.500', label: 'số lượng cổ phiếu' },
    { value: '2026', label: 'năm cập nhật tài liệu ĐHĐCĐ và nghị quyết' },
  ],
  sections: [
    {
      title: 'Tin cổ đông',
      body:
        'Trang quan hệ cổ đông công bố các tài liệu và nghị quyết mới nhất như Nghị quyết ĐHĐCĐ thường niên năm 2026, Biên bản họp Ban kiểm soát, Nghị quyết về việc bầu Chủ tịch Hội đồng quản trị, tài liệu họp và thông báo mời họp.',
      bullets: [
        'Nghị quyết ĐHĐCĐ thường niên năm 2026.',
        'Biên bản họp Ban kiểm soát.',
        'Nghị quyết về việc bầu Chủ tịch Hội đồng quản trị Tổng công ty Dầu Việt Nam – CTCP.',
      ],
    },
    {
      title: 'Danh mục công bố thông tin',
      body:
        'Ngoài tin cổ đông, trang còn chia theo các nhóm: Báo cáo tài chính, Báo cáo thường niên, Tài liệu quản trị công ty, Đại hội đồng cổ đông và Các nội dung khác để nhà đầu tư dễ tra cứu.',
    },
  ],
};

export const tinTucContent: SectionPageContent = {
  eyebrow: 'Tin tức',
  title: 'Tin tức',
  intro:
    'Trang tin tức tổng hợp Tin PVOIL, Tin giá xăng dầu, Quỹ bình ổn giá xăng dầu, Thông cáo báo chí, Tin liên quan và Quảng cáo.',
  actions: [
    { label: 'Tin PVOIL', href: '/tin-tuc' },
    { label: 'Tin giá xăng dầu', href: '/tin-tuc' },
    { label: 'Thông cáo báo chí', href: '/tin-tuc' },
  ],
  facts: [
    { value: '20.08.2025', label: 'PVOIL tiếp tục vào danh sách 25 thương hiệu dẫn đầu' },
    { value: '24.04.2026', label: 'Bầu Chủ tịch HĐQT PVOIL' },
    { value: '22.11.2025', label: 'Nhân viên PVOIL dũng cảm cứu người trong nước lũ' },
    { value: '09.07.2026', label: 'Báo cáo quỹ bình ổn giá xăng dầu' },
  ],
  sections: [
    {
      title: 'Tin doanh nghiệp',
      body:
        'Khối Tin PVOIL trên trang tổng hợp các nội dung nổi bật về thương hiệu, hoạt động điều hành, nhân sự cấp cao, hội thi tay nghề, quản lý hệ thống và các chương trình phát triển mạng lưới.',
      bullets: [
        'PVOIL Hưng Yên kiện toàn Hội đồng quản trị, tạo nền tảng cho tăng trưởng.',
        'PVOIL sơ kết 6 tháng đầu năm 2026: vượt qua khó khăn, nắm bắt cơ hội.',
        'PVOIL tăng cường kết nối, lan tỏa kinh nghiệm quản lý, vận hành trong toàn hệ thống.',
      ],
    },
    {
      title: 'Tin giá xăng dầu và công bố thông tin',
      body:
        'Ngoài tin doanh nghiệp, trang còn công bố bảng giá bán lẻ xăng dầu, báo cáo quỹ bình ổn giá xăng dầu, thông cáo báo chí và chuỗi tin liên quan về thị trường năng lượng quốc tế.',
      bullets: [
        'Bảng giá bán lẻ xăng dầu điều chỉnh từ 15:00 ngày 09/07/2026.',
        'Thông cáo báo chí về xăng E10 RON95 và các sự cố công nghệ thông tin trước đây.',
      ],
    },
  ],
};

export const phatTrienBenVungContent: SectionPageContent = {
  eyebrow: 'Phát triển bền vững',
  title: 'Phát triển bền vững',
  intro:
    'Trang phát triển bền vững tập trung vào các hoạt động cộng đồng, an sinh xã hội và những chương trình sẻ chia của PVOIL trong nhiều giai đoạn khác nhau.',
  actions: [
    { label: 'Hoạt động cộng đồng', href: '/phat-trien-ben-vung' },
    { label: 'Tuổi trẻ PVOIL', href: '/tuoi-tre-pvoil' },
    { label: 'Tin tức', href: '/tin-tuc' },
  ],
  facts: [
    { value: '07.02.2026', label: '25 chuyến xe miễn phí đưa hơn 1.000 sinh viên về quê' },
    { value: '10.09.2024', label: 'quyên góp ủng hộ đồng bào bị ảnh hưởng bởi bão số 3' },
    { value: '27.07.2023', label: 'hoạt động tri ân nhân ngày Thương binh - Liệt sĩ' },
    { value: '2021', label: 'chuỗi hoạt động hỗ trợ phòng chống dịch Covid-19' },
  ],
  sections: [
    {
      title: 'An sinh xã hội và cộng đồng',
      body:
        'Các nội dung nổi bật trên trang tập trung vào hoạt động an sinh xã hội như chương trình đưa sinh viên về quê đón Tết, hỗ trợ đồng bào chịu ảnh hưởng thiên tai, tri ân người có công và các chương trình cộng đồng tại địa phương.',
    },
    {
      title: 'Lan tỏa trách nhiệm xã hội',
      body:
        'PVOIL cũng ghi nhận nhiều hoạt động hỗ trợ phòng chống dịch Covid-19 như tiếp tục hỗ trợ xăng dầu cho đội xe chống dịch, tham gia các bếp hỗ trợ cộng đồng và đồng hành với các đội xe cứu thương không đồng.',
      bullets: [
        'Nhân văn, đồng cảm và sẻ chia trong những giai đoạn khó khăn.',
        'Đồng hành cùng cộng đồng, sinh viên, địa phương và lực lượng tuyến đầu.',
      ],
    },
  ],
};

export const tuoiTrePvoilContent: SectionPageContent = {
  eyebrow: 'Tuổi trẻ PVOIL',
  title: 'Tuổi trẻ PVOIL',
  intro:
    'Trang Tuổi trẻ PVOIL tập trung vào các phong trào đoàn thanh niên, hoạt động tình nguyện, chương trình xanh và các sáng kiến lan tỏa tinh thần xung kích trong toàn hệ thống.',
  actions: [
    { label: 'Tin tức tuổi trẻ', href: '/tuoi-tre-pvoil' },
    { label: 'Tin PVOIL', href: '/tin-tuc' },
    { label: 'Phát triển bền vững', href: '/phat-trien-ben-vung' },
  ],
  facts: [
    { value: '20.03.2026', label: 'Ngày thứ Bảy xanh lần 01 - năm 2026' },
    { value: '31.03.2025', label: 'Ngày thứ Bảy xanh lần 1 – năm 2025' },
    { value: '11.06.2024', label: 'Ngày hè thiếu nhi năm 2024' },
    { value: '27.03.2024', label: 'phát huy nhiệt huyết, kiến thức để tiếp nối hành trình phát triển' },
  ],
  sections: [
    {
      title: 'Hoạt động đoàn thể',
      body:
        'Nội dung nổi bật trên trang phản ánh các chương trình “Ngày thứ Bảy xanh”, hoạt động dành cho thiếu nhi, an sinh xã hội và những phong trào do Đoàn Thanh niên PVOIL tổ chức trong toàn hệ thống.',
    },
    {
      title: 'Tinh thần xung kích và sáng tạo',
      body:
        'Các bài viết nhấn mạnh việc thanh niên PVOIL cần phát huy nhiệt huyết, kiến thức và tinh thần sáng tạo để tiếp nối hành trình phát triển của Tổng công ty Dầu Việt Nam.',
      bullets: [
        'Gắn hoạt động phong trào với môi trường làm việc xanh - sạch - đẹp.',
        'Đồng hành cùng các chương trình xã hội và phát triển văn hóa nội bộ.',
      ],
    },
  ],
};

export const lienHeContent: SectionPageContent = {
  eyebrow: 'Liên hệ',
  title: 'Thông tin liên hệ Tổng công ty Dầu Việt Nam - CTCP',
  intro:
    'PVOIL duy trì các đầu mối liên hệ phục vụ đối tác, khách hàng, nhà đầu tư và các bên quan tâm thông qua trụ sở chính, điện thoại, email và hệ thống đơn vị trong mạng lưới toàn quốc.',
  actions: [
    { label: 'Gọi điện', href: '/lien-he' },
    { label: 'Gửi email', href: '/lien-he' },
    { label: 'Giới thiệu doanh nghiệp', href: '/gioi-thieu' },
  ],
  facts: [
    { value: '(84 - 28) 39106990', label: 'điện thoại liên hệ' },
    { value: '(84 - 28) 39106980', label: 'fax' },
    { value: 'contact@pvoil.com.vn', label: 'email' },
    { value: '0305795054', label: 'mã số thuế' },
  ],
  sections: [
    {
      title: 'Trụ sở chính',
      body:
        'Tổng công ty Dầu Việt Nam - CTCP đặt trụ sở tại Tầng 14-18, Tòa nhà PetroVietnam Tower, Số 1-5 Lê Duẩn, Phường Sài Gòn, TP. Hồ Chí Minh.',
    },
    {
      title: 'Kênh trao đổi',
      body:
        'Các yêu cầu hợp tác, thông tin doanh nghiệp, nhà đầu tư hoặc phản hồi dịch vụ có thể được tiếp nhận thông qua điện thoại, email hoặc các đầu mối phụ trách liên quan.',
      bullets: [
        'Điện thoại: (84 - 28) 39106990.',
        'Fax: (84 - 28) 39106980.',
        'Email: contact@pvoil.com.vn.',
      ],
    },
  ],
};

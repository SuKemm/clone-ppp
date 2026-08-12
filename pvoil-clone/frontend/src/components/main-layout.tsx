import { Header } from './header';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main>{children}</main>
      <footer className="mt-10 border-t border-slate-200 bg-[#0d3b66] py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <img src="/images/pvoil/logo-fallback.svg" alt="PVOIL" className="h-14 w-auto bg-white px-3 py-2" />
              <p className="mt-4 text-sm text-white/80">Tổng công ty Dầu Việt Nam - CTCP</p>
              <p className="mt-3 text-sm leading-7 text-white/80">Mã số thuế: 0305795054</p>
              <p className="mt-1 text-sm leading-7 text-white/80">Tầng 14-18, Tòa nhà PetroVietnam Tower, Số 1-5 Lê Duẩn, Phường Sài Gòn, TP. Hồ Chí Minh</p>
              <p className="mt-1 text-sm text-white/80">Điện thoại: (84 - 28) 39106990</p>
              <p className="mt-1 text-sm text-white/80">Fax: (84 - 28) 39106980</p>
              <p className="mt-1 text-sm text-white/80">Email: contact@pvoil.com.vn</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Liên kết</h4>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li><a href="/gioi-thieu" className="hover:text-[#f6a31a]">Giới thiệu</a></li>
                <li><a href="/linh-vuc-hoat-dong" className="hover:text-[#f6a31a]">Lĩnh vực hoạt động</a></li>
                <li><a href="/quan-he-co-dong" className="hover:text-[#f6a31a]">Quan hệ cổ đông</a></li>
                <li><a href="/tin-tuc" className="hover:text-[#f6a31a]">Tin tức</a></li>
                <li><a href="/phat-trien-ben-vung" className="hover:text-[#f6a31a]">Phát triển bền vững</a></li>
                <li><a href="/lien-he" className="hover:text-[#f6a31a]">Liên hệ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Mạng xã hội</h4>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <a href="https://www.facebook.com/PVOIL/" className="hover:text-[#f6a31a]">Facebook</a>
                <a href="https://www.youtube.com/channel/UC_PIevGBWBGM_chegYJ3r6Q" className="hover:text-[#f6a31a]">Youtube</a>
                <a href="/lien-he" className="hover:text-[#f6a31a]">Liên hệ</a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/15 pt-6 text-center text-sm text-white/65">
            © 2024 PVOIL. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

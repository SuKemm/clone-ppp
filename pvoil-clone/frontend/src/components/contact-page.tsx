export function ContactPageContent() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <span>Trang chủ</span>
            <span>›</span>
            <span className="text-slate-900">Liên hệ</span>
          </nav>
          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-sm">
            <div className="flex h-[260px] items-center justify-center bg-[linear-gradient(135deg,#dbeafe_0%,#f8fafc_55%,#fde68a_140%)] text-slate-500 sm:h-[340px]">
              <p className="text-lg font-medium">Bản đồ hệ thống và trụ sở PVOIL</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <article className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Tổng công ty Dầu Việt Nam - CTCP</h1>
            <div className="mt-5 space-y-3 text-sm leading-8 text-slate-700">
              <p><strong>Mã số thuế:</strong> 0305795054</p>
              <p><strong>Địa chỉ:</strong> Tầng 14-18, Tòa nhà PetroVietnam Tower, Số 1-5 Lê Duẩn, Phường Sài Gòn, TP. Hồ Chí Minh</p>
              <p><strong>Email:</strong> <a href="mailto:contact@pvoil.com.vn" className="text-[#ef3d32]">contact@pvoil.com.vn</a></p>
              <p><strong>Fax:</strong> <a href="tel:(84-28)39106980" className="text-[#ef3d32]">(84 - 28) 39106980</a></p>
              <p><strong>Điện thoại:</strong> <a href="tel:(84-28)39106990" className="text-[#ef3d32]">(84 - 28) 39106990</a></p>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-7 shadow-sm">
            <p className="text-sm leading-7 text-slate-700">Mọi sự hợp tác tốt đẹp đều bắt đầu từ một cuộc trò chuyện. Hãy liên hệ với chúng tôi, mọi mong muốn của bạn sẽ được lắng nghe.</p>
            <form className="mt-6 grid gap-4">
              <input type="text" placeholder="Họ tên" className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[#ef3d32]" />
              <input type="tel" placeholder="Số điện thoại" className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[#ef3d32]" />
              <input type="email" placeholder="Email" className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[#ef3d32]" />
              <textarea placeholder="Nội dung" rows={6} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-[#ef3d32]" />
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-500">reCAPTCHA placeholder</div>
              <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-[#ef3d32] px-6 text-sm font-semibold text-white transition hover:bg-[#dc2f24]">Gửi</button>
            </form>
          </article>
        </div>
      </section>
    </div>
  );
}

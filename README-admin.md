# Trang quản trị nội dung (`/admin`) — không cần sửa code để đăng bài

Từ giờ, các mục sau có thể thêm/sửa/xoá trực tiếp trên web, không cần sửa code,
không cần build lại, không cần deploy lại:

- **Tin tức** (`/tin-tuc`)
- **Dự án** (`/du-an`)
- **Tuyển dụng** (`/tuyen-dung`)
- **Thư viện ảnh** — album (`/dich-vu`)
- **Thư viện video** — album (`/dich-vu`)

Đăng nhập tại: `https://<domain-cua-ban>/admin`

> Các phần khác của web (Giới thiệu, Ban lãnh đạo, Cổ đông...) hiện vẫn là nội
> dung tĩnh trong code — nếu muốn đưa thêm phần nào vào `/admin`, nói mình làm
> tiếp, cách làm giống hệt các mục ở trên nên thêm khá nhanh.

## 1. Thiết lập lần đầu (chỉ làm 1 lần trên server)

Trên VPS, trong thư mục project, tạo file `.env` (copy từ `.env.example`):

```bash
cp .env.example .env
nano .env
```

Điền 2 giá trị:

- `ADMIN_PASSWORD` — mật khẩu bạn sẽ dùng để đăng nhập `/admin`. Đặt mật khẩu
  mạnh và chỉ chia sẻ cho người được phép đăng bài.
- `ADMIN_SESSION_SECRET` — 1 chuỗi ngẫu nhiên, tạo bằng lệnh:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  Dán kết quả vào `.env`.

Sau khi lưu `.env`, chạy lại:

```bash
npm run build
pm2 restart ptsc-site
```

## 2. Dùng hằng ngày

1. Vào `https://<domain-cua-ban>/admin`, nhập mật khẩu.
2. Chọn mục ở menu trái (Tin tức, Dự án, ...).
3. Bấm **"+ Thêm mới"** để đăng bài mới, hoặc **"Sửa"/"Xoá"** trên từng mục
   có sẵn.
4. Với ảnh: bấm chọn file ảnh trong form, ảnh tự upload lên và gắn vào bài.
5. Bấm **Lưu** — trang public (`/tin-tuc`, `/du-an`,...) cập nhật ngay lập
   tức, không cần build hay deploy lại.

## 3. Vì sao dữ liệu không mất khi `git pull` / deploy lại?

Nội dung bạn nhập qua `/admin` được lưu vào các file JSON trong thư mục
`content/data/` **trên chính server** — thư mục này **không nằm trong Git**
(xem `.gitignore`), nên quy trình cập nhật code bình thường:

```bash
git pull
npm run build
pm2 restart ptsc-site
```

sẽ **không đụng tới** nội dung bạn đã đăng. Ảnh upload qua `/admin` cũng vậy,
được lưu ở `public/uploads/` trên server, không nằm trong Git.

⚠️ Vì dữ liệu nằm trên server, cần **sao lưu định kỳ** hai thư mục
`content/data/` và `public/uploads/` (ví dụ bằng `rsync`/`scp` tải về máy cá
nhân, hoặc script backup tự động) — nếu VPS gặp sự cố mà không có bản sao lưu
thì nội dung đã đăng sẽ mất.

## 4. Soạn nội dung bài viết (TinyMCE)

Ô **"Nội dung đầy đủ"** của mục Tin tức (`content` / `content_en`) dùng trình
soạn thảo TinyMCE — có thể in đậm/in nghiêng, gạch đầu dòng, chèn link, chèn
bảng, chèn ảnh trực tiếp trong bài, giống soạn thảo Word.

Để hết cảnh báo "Evaluation mode" nhỏ ở dưới ô soạn thảo (không bắt buộc,
editor vẫn dùng được bình thường nếu bỏ qua):

1. Đăng ký tài khoản miễn phí tại https://www.tiny.cloud/auth/signup/
   (không cần thẻ tín dụng).
2. Vào **My Account → Approved Domains**, thêm domain của bạn (vd:
   `dakdrinh.vn`, thêm cả `www.dakdrinh.vn` nếu dùng).
3. Copy **API Key** hiển thị trong tài khoản.
4. Thêm vào `.env` trên server:
   ```
   NEXT_PUBLIC_TINYMCE_API_KEY=dán-key-vào-đây
   ```
5. Chạy lại `npm run build && pm2 restart ptsc-site` (build lại là bắt buộc
   vì biến này bắt đầu bằng `NEXT_PUBLIC_` — được nhúng vào mã chạy ở trình
   duyệt tại lúc build, không phải đọc lúc chạy như các biến khác).

## 5. Giới hạn hiện tại (nên biết trước)

- Chỉ có **1 tài khoản quản trị dùng chung 1 mật khẩu** — chưa có phân quyền
  nhiều người dùng riêng biệt. Nếu cần nhiều tài khoản có quyền khác nhau,
  đây là bước nâng cấp tiếp theo.
- Tính năng này **chạy tốt trên VPS/server riêng** (đúng mô hình bạn đang
  deploy ở Phần A/C trong `huong-dan-deploy.md`). Nếu sau này chuyển sang
  Vercel (serverless nhiều instance), phần lưu file JSON này cũng cần chuyển
  sang một nơi lưu dùng chung như Vercel KV/Upstash Redis — giống lưu ý về bộ
  đếm truy cập đã ghi trong `huong-dan-deploy.md`.

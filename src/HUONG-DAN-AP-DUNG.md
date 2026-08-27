# Upload video 100MB cho "Thư viện video" — hướng dẫn áp dụng

## 1. Áp dụng patch code

SSH vào VPS, vào thư mục project rồi chạy:

```bash
cd /var/www/ptsc-clone   # đổi thành đúng đường dẫn project của bạn
git status                # đảm bảo không có thay đổi chưa commit bị mất
```

Copy file `upload-video-100mb.patch` lên VPS (vd bằng `scp`), rồi:

```bash
git apply --check upload-video-100mb.patch   # kiểm tra trước, không lỗi mới apply thật
git apply upload-video-100mb.patch
```

Nếu `git apply --check` báo lỗi do version code trên VPS đã khác bản tải về
lúc mình xem, báo lại để mình chỉnh patch — đừng force apply.

## 2. Cấu hình Nginx — bắt buộc, nếu không sẽ chặn video ngay ở tầng proxy

Mặc định Nginx chỉ cho phép request tối đa **1MB**, video 100MB sẽ bị Nginx
trả lỗi `413 Request Entity Too Large` trước khi tới được Next.js. Sửa file
cấu hình site (thường ở `/etc/nginx/sites-available/<tên-site>`):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    client_max_body_size 120m;      # cho phép upload tới ~120MB (dư ra so với 100MB)

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Upload 100MB có thể mất vài phút với mạng chậm — tăng timeout
        # để Nginx không tự ngắt kết nối giữa chừng.
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

Áp dụng:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 3. Build và restart lại app

```bash
npm install
npm run build
pm2 restart ptsc-site
```

## 4. Cách dùng sau khi lên bản mới

Vào `/admin` → Thư viện → Thư viện video → Sửa (hoặc Thêm mới):
- Mục **Video** mới xuất hiện dưới mục Ảnh đại diện.
- Có 2 cách: dán link YouTube có sẵn (khuyên dùng, nhanh và nhẹ server),
  hoặc bấm "Tải video lên server" để tải file MP4/WebM/MOV tối đa 100MB.
- Video sẽ phát thật khi bấm vào ở trang `/dich-vu` (mục "Thư viện video").

## Lưu ý

- Trang chủ (`src/app/page.tsx`) và trang cổ đông (`src/app/co-dong/page.tsx`)
  hiện **chưa** được nối với video thật — chúng chỉ đang hiện ảnh đại diện
  như trước. Chưa xử lý theo yêu cầu hiện tại của bạn, có thể làm sau nếu cần.
- Nếu VPS có RAM thấp (1GB), nhiều người cùng tải video lớn cùng lúc có thể
  gây áp lực RAM/băng thông — nếu dùng nhiều, cân nhắc nâng cấp VPS hoặc ưu
  tiên dùng link YouTube thay vì tải file lên server.

# Hướng dẫn Deploy dự án Next.js lên Hosting

## ⚠️ Lưu ý quan trọng trước khi chọn nền tảng

Project của bạn có **2 điểm đặc biệt** ảnh hưởng trực tiếp tới việc chọn hosting:

1. **`server.js` tự viết** (custom Node server bằng `http.createServer`) thay vì chạy `next start` mặc định — cho thấy ý định ban đầu là chạy trên **1 tiến trình Node sống liên tục** (VPS/server riêng), không phải serverless.
2. **Bộ đếm truy cập (`VisitorStats`)** lưu số liệu **trong bộ nhớ RAM của tiến trình** (`src/lib/visitor-store.ts`). Comment trong code đã ghi rõ: nếu chạy trên nền tảng serverless nhiều instance (như Vercel), **số liệu đếm sẽ bị sai/tách rời** vì mỗi request có thể rơi vào một instance khác nhau.

→ Vì vậy mình chia hướng dẫn thành 2 lựa chọn, bạn chọn theo nhu cầu:

| | **VPS / Server riêng** (khuyến nghị) | **Vercel** (nhanh, dễ) |
|---|---|---|
| Bộ đếm truy cập | ✅ Chạy đúng | ❌ Sai số, không đáng tin |
| Tốc độ setup | Chậm hơn (~30–45 phút) | Nhanh (~5 phút) |
| Chi phí | Thuê VPS (~$5–10/tháng) | Free tier khá rộng |
| Domain riêng + SSL | Tự cấu hình (miễn phí bằng Let's Encrypt) | Tự động, 1-click |
| Phù hợp khi | Muốn giữ tính năng đếm online chính xác, kiểm soát toàn bộ server | Cần demo/staging nhanh, chưa quan tâm bộ đếm |

Nếu vẫn muốn dùng Vercel mà giữ bộ đếm đúng, xem mục **"Nâng cấp bộ đếm lên Redis"** ở cuối bài.

---

## Phần A — Deploy lên VPS (khuyến nghị)

Áp dụng cho VPS chạy Ubuntu (DigitalOcean, Vultr, AWS Lightsail, Contabo, v.v.)

### Bước 1: Thuê và truy cập VPS
- Chọn gói VPS tối thiểu **1 vCPU / 1GB RAM** (Node.js + Next.js build cần RAM, nên ưu tiên 2GB nếu ngân sách cho phép).
- SSH vào server:
  ```bash
  ssh root@<địa_chỉ_IP_VPS>
  ```

### Bước 2: Cài Node.js (bản >= 24, theo `engines` trong package.json)
```bash
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo bash -
sudo apt-get install -y nodejs
node -v   # kiểm tra >= 24
```

### Bước 3: Đưa code lên server
Cách khuyên dùng — qua Git:
```bash
sudo apt-get install -y git
git clone <URL_repo_của_bạn> /var/www/ptsc-clone
cd /var/www/ptsc-clone
```
Nếu chưa có Git repo, dùng `scp`/`rsync` để copy toàn bộ thư mục project (trừ `node_modules`, `.next`) lên `/var/www/ptsc-clone`.

### Bước 4: Cài dependencies và build
```bash
npm install
npm run build
```
> Lưu ý: bước build cần tải font Google (`next/font`) — đảm bảo VPS có kết nối internet ra ngoài, không bị chặn `fonts.googleapis.com`.

### Bước 5: Chạy thử
```bash
node server.js
# hoặc: npm run start   (dùng next start mặc định)
```
Mở `http://<IP_VPS>:3000` để kiểm tra. Vì `visitor-store.ts` cần **1 tiến trình duy nhất**, hãy dùng `node server.js` hoặc `npm run start` — **không chạy nhiều instance song song** cho việc này (PM2 cluster mode nhiều worker cũng sẽ làm bộ đếm sai, như comment trong code đã cảnh báo).

### Bước 6: Giữ server chạy nền bằng PM2
```bash
sudo npm install -g pm2
pm2 start server.js --name ptsc-site -i 1   # -i 1: chỉ 1 instance, bắt buộc để bộ đếm đúng
pm2 save
pm2 startup   # làm theo hướng dẫn để PM2 tự khởi động cùng server
```

### Bước 7: Cài Nginx làm reverse proxy (để dùng cổng 80/443, domain riêng)
```bash
sudo apt-get install -y nginx
sudo nano /etc/nginx/sites-available/ptsc-site
```
Nội dung file:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Kích hoạt:
```bash
sudo ln -s /etc/nginx/sites-available/ptsc-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Bước 8: Trỏ domain và cấp SSL miễn phí
1. Vào nơi quản lý domain, tạo bản ghi **A record** trỏ về IP VPS.
2. Cài SSL bằng Certbot:
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```
   Certbot tự cập nhật file Nginx để bật HTTPS và tự gia hạn chứng chỉ.

### Bước 9: Quy trình cập nhật code sau này
```bash
cd /var/www/ptsc-clone
git pull
npm install
npm run build
pm2 restart ptsc-site
```

---

## Phần B — Deploy nhanh lên Vercel (có đánh đổi)

Phù hợp nếu bạn cần bản demo/staging nhanh và **chấp nhận bộ đếm truy cập không chính xác** trên môi trường này.

1. Đẩy code lên GitHub/GitLab/Bitbucket.
2. Vào [vercel.com](https://vercel.com) → **Add New Project** → chọn repo.
3. Vercel tự nhận diện Next.js, không cần cấu hình build command (mặc định `next build` / `next start` tương đương qua serverless functions — **`server.js` của bạn sẽ không được dùng trên Vercel**, Vercel tự quản lý runtime riêng).
4. Bấm **Deploy**. Sau ~1–2 phút có link dạng `xxx.vercel.app`.
5. Gắn domain riêng: Project → **Settings → Domains** → nhập domain, làm theo hướng dẫn trỏ DNS (CNAME/A record). SSL tự động cấp.
6. Từ lần sau, mỗi lần `git push` lên nhánh chính sẽ tự động deploy lại (CI/CD có sẵn).

---

## Nâng cấp bộ đếm truy cập lên Redis (nếu muốn dùng Vercel mà vẫn đúng số liệu)

Đây là hướng đi lâu dài nếu bạn chọn hosting serverless. Ý tưởng: thay `Map`/`Set` trong bộ nhớ (`src/lib/visitor-store.ts`) bằng một nơi lưu **dùng chung giữa các instance**, ví dụ:
- **Vercel KV** (Redis do Vercel cung cấp, tích hợp sẵn trong dashboard), hoặc
- **Upstash Redis** (free tier, hoạt động tốt với serverless).

Việc này cần sửa lại `visitor-store.ts` để đọc/ghi qua Redis thay vì `Map`/`Set` — nếu bạn muốn, mình có thể code sẵn phần này ở lượt sau.

---

## Phần C — Trỏ domain `dakdrinh.vn` (đăng ký tại Mắt Bão) về Cloud Server Mắt Bão, live công khai

Áp dụng đúng trường hợp của bạn: domain quản lý tại Mắt Bão, site chạy trên **Cloud Server/VPS Mắt Bão** (đã setup theo Phần A — Node ≥24, `npm run build`, PM2 `-i 1`, Nginx).

### Bước 1: Lấy IP public của Cloud Server
Trong trang quản trị Cloud Server tại Mắt Bão (hoặc lệnh `curl ifconfig.me` ngay trên VPS), ghi lại địa chỉ IPv4 — gọi là `<IP_VPS>`.

### Bước 2: Vào quản lý DNS của domain tại Mắt Bão
1. Truy cập **https://id.matbao.net** → đăng nhập (tài khoản dạng `MBxxxxx`).
2. Vào **Tên miền → Quản lý tên miền** → chọn `dakdrinh.vn` → **Quản lý DNS** (hoặc nút "Cấu hình DNS nâng cao").
3. Xác nhận domain đang dùng **Name Server mặc định của Mắt Bão** (`ns1.matbao.com` / `ns2.matbao.com`) — nếu domain và Cloud Server cùng ở Mắt Bão thì mặc định thường đã đúng, không cần đổi Name Server.

### Bước 3: Tạo bản ghi DNS trỏ về VPS
Thêm các bản ghi sau trong **Quản lý bản ghi (Record)**:

| Loại | Host | Trỏ đến (Value) | TTL |
|---|---|---|---|
| A | `@` | `<IP_VPS>` | 3600 (mặc định) |
| A | `www` | `<IP_VPS>` | 3600 |

> Nếu giao diện Mắt Bão có sẵn tính năng "Trỏ tên miền về Website (Hosting)" dùng chung IP Cloud Server cùng tài khoản, bạn có thể dùng luôn tính năng đó thay vì tạo A record tay — bản chất kết quả giống nhau.

Sau khi lưu, đợi **30–45 phút** (đôi khi tới vài giờ) để DNS phân giải. Kiểm tra bằng:
```bash
nslookup dakdrinh.vn
```
Khi trả về đúng `<IP_VPS>` là đã trỏ thành công.

### Bước 4: Cập nhật `server_name` trong Nginx trên VPS
```bash
sudo nano /etc/nginx/sites-available/ptsc-site
```
Sửa dòng `server_name` thành domain thật:
```nginx
server_name dakdrinh.vn www.dakdrinh.vn;
```
Lưu lại rồi áp dụng:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Bước 5: Cấp SSL cho domain thật
```bash
sudo certbot --nginx -d dakdrinh.vn -d www.dakdrinh.vn
```
Certbot sẽ tự sửa file Nginx để bật HTTPS (chuyển hướng http → https) và tự gia hạn chứng chỉ mỗi ~90 ngày.

### Bước 6: Kiểm tra lần cuối trước khi công bố
- Mở `https://dakdrinh.vn` bằng trình duyệt ẩn danh — kiểm tra ổ khóa SSL hợp lệ, không có cảnh báo.
- Kiểm tra cả `https://www.dakdrinh.vn` hoạt động (nếu muốn `www` redirect về domain gốc hoặc ngược lại, cấu hình thêm `return 301` trong Nginx).
- Vì đây là site đại diện công ty, nên xin xác nhận lần cuối từ người có thẩm quyền (ban lãnh đạo/marketing) trước khi chia sẻ rộng rãi, tránh trường hợp domain mới gây nhầm lẫn với `dakdrinh.com.vn` hiện có.

---

## Checklist trước khi đưa lên production
- [ ] Chạy `npm run typecheck` và `npm run build` local không lỗi.
- [ ] Kiểm tra ảnh trong `public/images` đã là ảnh thật (không còn ảnh tạm dùng lại giữa các mục).
- [ ] Cấu hình domain + SSL.
- [ ] Nếu chọn VPS: xác nhận PM2 chỉ chạy **1 instance** cho bộ đếm truy cập.
- [ ] Test lại toàn bộ trang trên môi trường production (không chỉ `npm run dev`).

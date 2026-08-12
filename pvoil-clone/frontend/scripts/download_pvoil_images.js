const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const https = require('https');
const http = require('http');

const urls = [
"https://www.pvoil.com.vn/media/1/logo.png",
"https://www.pvoil.com.vn/themes/Default/img/flag-vi.svg",
"https://www.pvoil.com.vn/themes/Default/img/flag-en.svg",
"https://www.pvoil.com.vn/media/1/banner4.jpeg",
"https://www.pvoil.com.vn/media/1/banner-5.jpeg",
"https://www.pvoil.com.vn/media/1/banner-6.jpeg",
"https://www.pvoil.com.vn/media/1/banner-7.jpeg",
"https://www.pvoil.com.vn/media/1/banner-8.jpeg",
"https://www.pvoil.com.vn/media/1/banner-9.jpeg",
"https://www.pvoil.com.vn/media/1/banner-10.jpeg",
"https://www.pvoil.com.vn/media/5/xang-e1095.png",
"https://www.pvoil.com.vn/media/1/banner.jpg",
"https://www.pvoil.com.vn/media/1/banner-2.jpg",
"https://www.pvoil.com.vn/media/1/banner3.jpeg",
"https://www.pvoil.com.vn/media/6/pvoil-tiep-tuc-vao-danh-sach-25-thuong-hieu-dan-dau.png",
"https://www.pvoil.com.vn/media/7/5394-ong-duong-manh-son-duoc-bau-lam-chu-tich-hdqt-pvoil.png",
"https://www.pvoil.com.vn/media/7/dai-hoi-dong-co-dong-thuong-nien-nam-2026-pvoil-thay-doi-nhan-su-cap-cao-tiep-da-tang-truong.png",
"https://www.pvoil.com.vn/media/6/6575-nhan-vien-pvoil-dung-cam-cuu-nguoi-trong-nuoc-lu.jpg",
"https://www.pvoil.com.vn/media/8/pvoil-so-ket-6-thang-dau-nam-2026-vuot-qua-kho-khan-nam-bat-co-hoi-no-luc-hoan-thanh-ke-hoach-nam-2026.jpg",
"https://www.pvoil.com.vn/media/8/dang-bo-pvoil-so-ket-6-thang-dau-nam-2026-tao-dong-luc-moi-de-but-pha-tang-truong.jpg",
"https://www.pvoil.com.vn/media/8/ban-tin-cong-doan.jpg",
"https://www.pvoil.com.vn/media/7/pvoil-tang-cuong-ket-noi-lan-toa-kinh-nghiem-quan-ly-van-hanh-trong-toan-he-thong.jpg",
"https://www.pvoil.com.vn/media/7/thu-truong-bo-cong-thuong-nguyen-sinh-nhat-tan-lam-viec-voi-pvoil-ve-co-so-ha-tang-cong-tac-pha-che-va-kinh-doanh-xang-e5-e10.jpg",
"https://www.pvoil.com.vn/media/8/ban-tin-nang-luong-quoc-te-97-cong-suat-dien-hat-nhan-toan-cau-tang-manh-trong-thap-ky-toi.jpg",
"https://www.pvoil.com.vn/media/8/ban-tin-nang-luong-quoc-te-87-duc-thiet-lap-kho-du-tru-khi-dot-khan-cap.jpg",
"https://www.pvoil.com.vn/media/8/cang-thang-trung-dong-nong-tro-lai-gia-dau-tang-vot.jpg",
"https://www.pvoil.com.vn/media/8/ban-tin-nang-luong-quoc-te-77-noi-lo-ve-tinh-trang-du-cung-co-dang-bi-thoi-phong.jpg",
"https://www.pvoil.com.vn/media/8/nguon-cung-gia-tang-gia-dau-chiu-suc-ep.jpg",
"https://www.pvoil.com.vn/media/8/gia-xang-dau-hom-nay-67-giam-nhe-phien-dau-tuan.jpg",
"https://www.pvoil.com.vn/media/8/opec-tang-han-ngach-san-luong-dau.jpg",
"https://www.pvoil.com.vn/media/8/gia-dau-tho-giam-2-khi-noi-lo-kinh-te-lan-at-rui-ro-nguon-cung.jpg",
"https://www.pvoil.com.vn/media/8/pho-thu-tuong-thuong-truc-pham-gia-tuc-du-hoi-nghi-so-ket-cong-tac-6-thang-dau-nam-cua-petrovietnam.jpg",
"https://www.pvoil.com.vn/media/8/gia-dau-the-gioi-cao-nhat-trong-hon-hai-tuan-sau-khi-my-tien-hanh-hoat-dong-quan-su-moi-nham-vao-iran.jpg",
"https://www.pvoil.com.vn/media/1/quy-binh-on-gia-xang-dau.png",
"https://www.pvoil.com.vn/media/1/thong-cao-bao-chi.png",
"https://www.pvoil.com.vn/media/4/bien-gia-dich-vu-cang-bien.png",
"https://www.pvoil.com.vn/media/4/thong-tin-moi-truong.png",
"https://www.pvoil.com.vn/media/4/trangchu-tincodong-2.jpg",
"https://www.pvoil.com.vn/media/4/trangchu-tincodong-3.jpg",
"https://www.pvoil.com.vn/media/4/trangchu-tincodong-1.jpg",
"https://www.pvoil.com.vn/media/1/3648-tong-quan-pvoil.png",
"https://www.pvoil.com.vn/media/1/3508-cung-cap-dau-tho-cho-nha-may-loc-dau-dung-quat.png",
"https://www.pvoil.com.vn/media/1/8739-cung-cap-dau-tho-cho-nha-may-loc-dau-dung-quat.png",
"https://www.pvoil.com.vn/media/1/8564-cung-cap-dau-tho-cho-nha-may-loc-dau-dung-quat.png",
"https://www.pvoil.com.vn/media/1/452-xuat-ban-dau-tho.png",
"https://www.pvoil.com.vn/media/1/2790-phan-phoi-xang-dau-chiem-22-thi-phan.png",
"https://www.pvoil.com.vn/media/1/spanspan.png",
"https://www.pvoil.com.vn/media/1/2828-xang-dau-truc-thuoc.png",
"https://www.pvoil.com.vn/media/1/1572-xang-dau-dai-ly.png",
"https://www.pvoil.com.vn/media/1/5111-tong-suc-chua-kho-xang-dau.png",
"https://www.pvoil.com.vn/media/1/9318-che-bien-san-pham-dau.png",
"https://www.pvoil.com.vn/media/1/9609-xuat-nhap-khau-dau-tho-va-kinh-doanh-dau-quoc-te.png",
"https://www.pvoil.com.vn/media/1/kinh-doanh-phan-phoi-cac-san-pham-dau.png",
"https://www.pvoil.com.vn/media/1/san-xuat-che-bien-xang-dau-dau-mo-nhon.png",
"https://www.pvoil.com.vn/media/7/ban-tin-pvoil-so-148.png",
"https://www.pvoil.com.vn/media/7/pvoil-chung-tay-chuyen-doi-nang-luong-vi-tuong-lai-xanh.png",
"https://www.pvoil.com.vn/media/6/pvoil-4u-ai.png",
"https://www.pvoil.com.vn/media/1/he-thong-cua-hang-xang-dau.png",
"https://www.pvoil.com.vn/media/1/he-thong-kho-xang-dau.png",
"https://www.pvoil.com.vn/media/1/mang-luoi-kinh-doanh.jpeg",
"https://www.pvoil.com.vn/media/1/1384-phat-trien-ben-vung.png",
"https://images.dmca.com/Badges/dmca_protected_sml_120n.png",
"https://www.pvoil.com.vn/media/1/footer-bg.png"
];

const outDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    try {
      const u = new URL(url);
      const httpx = u.protocol === 'https:' ? https : http;
      const filename = path.basename(u.pathname);
      const dest = path.join(outDir, filename);
      if (fs.existsSync(dest)) {
        console.log('Exists, skipping', filename);
        return resolve(dest);
      }
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.pvoil.com.vn/'
        }
      };
      const req = httpx.get(u, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // follow redirects
          return download(res.headers.location).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          console.error('Failed', url, res.statusCode);
          return resolve(null);
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Saved', filename);
          resolve(dest);
        });
      });
      req.on('error', (err) => {
        console.error('Request error', url, err.message);
        resolve(null);
      });
    } catch (err) {
      console.error('Download error', url, err.message);
      resolve(null);
    }
  });
}

(async () => {
  for (const u of urls) {
    // small delay to be polite
    await download(u);
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('All done');
})();

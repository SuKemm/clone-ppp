// Sắp xếp album ảnh cho trang chủ + trang Thư viện (VI/EN):
//   1) Album của NĂM HIỆN TẠI (giờ Việt Nam) luôn đứng đầu.
//   2) Các album còn lại xếp theo năm từ MỚI → CŨ.
//   3) Cùng năm thì album có "Ngày đăng" mới hơn đứng trước.
// Năm của album lấy từ tên (vd "Năm 2026", "Year 2026"); nếu tên không có
// năm thì dùng năm của "Ngày đăng".

// Khớp với CmsItem (Record<string, string>) — chỉ cần đọc title / title_en / date.
type AlbumLike = Record<string, string | undefined>;

/** Mốc thời gian từ "dd.mm.yyyy", "dd/mm/yyyy" hoặc "yyyy-mm-dd"; không đọc được → -Infinity. */
export function parseAlbumDate(value: string | undefined): number {
  if (!value) return -Infinity;
  const v = value.trim();
  let y: number, mo: number, d: number;
  let m = v.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (m) {
    d = Number(m[1]); mo = Number(m[2]); y = Number(m[3]);
  } else if ((m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) {
    y = Number(m[1]); mo = Number(m[2]); d = Number(m[3]);
  } else {
    return -Infinity;
  }
  const t = new Date(y, mo - 1, d).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

function albumYear(a: AlbumLike): number {
  const fromTitle = `${a.title ?? ""} ${a.title_en ?? ""}`.match(/\b(19|20)\d{2}\b/);
  if (fromTitle) return Number(fromTitle[0]);
  const t = parseAlbumDate(a.date);
  return Number.isFinite(t) ? new Date(t).getFullYear() : -Infinity;
}

export function currentYearVN(): number {
  return Number(
    new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric" })
  );
}

export function sortPhotoAlbums<T extends AlbumLike>(albums: T[], thisYear = currentYearVN()): T[] {
  return [...albums].sort((a, b) => {
    const ya = albumYear(a);
    const yb = albumYear(b);
    const ca = ya === thisYear ? 1 : 0;
    const cb = yb === thisYear ? 1 : 0;
    if (ca !== cb) return cb - ca; // năm hiện tại lên đầu
    if (ya !== yb) return yb - ya; // năm mới → cũ
    return parseAlbumDate(b.date) - parseAlbumDate(a.date); // cùng năm: ngày đăng mới trước
  });
}

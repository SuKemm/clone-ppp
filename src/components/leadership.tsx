// ============================================================================
// BAN LÃNH ĐẠO — chỉ cần sửa dữ liệu bên dưới, KHÔNG cần đụng vào phần code
// hiển thị (dùng ở src/app/gioi-thieu/ban-lanh-dao/page.tsx).
//
// - "leader": người đứng đầu nhóm (hiển thị ảnh lớn, căn giữa).
// - "members": các thành viên còn lại (hiển thị dạng lưới ảnh nhỏ).
// - "photo": để trống "" nếu chưa có ảnh -> sẽ tự hiện khung avatar placeholder.
//   Khi có ảnh thật, đặt file vào thư mục public/images/leadership/ rồi điền
//   đường dẫn dạng "/images/leadership/ten-file.jpg".
// ============================================================================

export type LeadershipPerson = {
  name: string;
  title: string;
  title_en?: string; // bản tiếng Anh của "title", dùng ở trang /en-US/about-us/leadership
  photo?: string; // "/images/leadership/ten-file.jpg" hoặc "" nếu chưa có ảnh
};

export type LeadershipGroup = {
  id: string;
  groupTitle: string;
  groupTitle_en?: string; // bản tiếng Anh của "groupTitle"
  leader: LeadershipPerson;
  members: LeadershipPerson[];
};

export const leadershipGroups: LeadershipGroup[] = [
  {
    id: "hdqt",
    groupTitle: "Hội đồng Quản trị",
    groupTitle_en: "Board of Directors",
    leader: {
      name: "Nguyễn Ngọc Hải",
      title: "Chủ tịch Hội đồng Quản trị",
      title_en: "Chairman of the Board of Directors",
      photo: "/images/leadership/hdqt-chu-tich-nguyen-ngoc-hai.png",
    },
    members: [
      { name: "Đỗ Xuân Bình", title: "Thành viên HĐQT", title_en: "Board Member", photo: "/images/leadership/hdqt-uv-do-xuan-binh.jpg" },
      { name: "Lê Quang Hào", title: "Thành viên HĐQT", title_en: "Board Member", photo: "/images/leadership/hdqt-uv-le-quang-hao.jpg" },
    ],
  },
  {
    id: "btgd",
    groupTitle: "Ban Giám đốc",
    groupTitle_en: "Board of Management",
    leader: {
      name: "Đỗ Xuân Bình",
      title: "Giám đốc",
      title_en: "Director",
      photo: "/images/leadership/bgd-giam-doc-do-xuan-binh.jpg",
    },
    members: [
      { name: "Lê Năng", title: "Phó Giám đốc", title_en: "Deputy Director", photo: "/images/leadership/bgd-pgd-le-nang.jpg" },
      { name: "Nguyễn Xuân Hải", title: "Phó Giám đốc", title_en: "Deputy Director", photo: "/images/leadership/bgd-pgd-nguyen-xuan-hai.png" },
      { name: "Nguyễn Đình Tới", title: "Kế toán trưởng", title_en: "Chief Accountant", photo: "/images/leadership/bgd-ktt-nguyen-dinh-toi.jpg" },
    ],
  },
  {
    id: "bks",
    groupTitle: "Ban Kiểm soát",
    groupTitle_en: "Supervisory Board",
    leader: {
      name: "Nguyễn Thanh Khiết",
      title: "Trưởng Ban kiểm soát",
      title_en: "Head of the Supervisory Board",
      photo: "/images/leadership/bks-truong-nguyen-thanh-khiet.jpg",
    },
    members: [
      { name: "Nguyễn Trung Tuấn", title: "Thành viên Ban Kiểm soát", title_en: "Supervisor", photo: "/images/leadership/bks-tv-nguyen-trung-tuan.jpg" },
      { name: "Ngô Thị Hồng Hạnh", title: "Thành viên Ban Kiểm soát", title_en: "Supervisor", photo: "/images/leadership/bks-tv-ngo-thi-hong-hanh.png" },
    ],
  },
];

export function PersonAvatar({
  name,
  photo,
  size,
}: {
  name: string;
  photo?: string;
  size: "lg" | "md";
}) {
  const dimension = size === "lg" ? "w-40 sm:w-44" : "w-full";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`${dimension} overflow-hidden rounded-md border border-slate-200 bg-slate-50 shadow-sm`}>
      <div className="aspect-[3/4] w-full">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="h-full w-full object-cover object-top" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-400">
            {initials || "?"}
          </div>
        )}
      </div>
    </div>
  );
}

export function PersonCard({
  person,
  size,
  locale = "vi",
}: {
  person: LeadershipPerson;
  size: "lg" | "md";
  locale?: "vi" | "en";
}) {
  const title = locale === "en" ? person.title_en || person.title : person.title;
  return (
    <div className="flex flex-col items-center text-center">
      <PersonAvatar name={person.name} photo={person.photo} size={size} />
      <div className={`mt-4 font-bold text-[#454A8A] ${size === "lg" ? "text-xl" : "text-base"}`}>
        {person.name}
      </div>
      <div className="mt-1 text-sm font-medium text-slate-600">{title}</div>
    </div>
  );
}

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
  photo?: string; // "/images/leadership/ten-file.jpg" hoặc "" nếu chưa có ảnh
};

export type LeadershipGroup = {
  id: string;
  groupTitle: string;
  leader: LeadershipPerson;
  members: LeadershipPerson[];
};

export const leadershipGroups: LeadershipGroup[] = [
  {
    id: "hdqt",
    groupTitle: "Hội đồng Quản trị",
    leader: {
      name: "Nguyễn Văn A",
      title: "Chủ tịch Hội đồng Quản trị",
      photo: "",
    },
    members: [
      { name: "Nguyễn Văn B", title: "Thành viên HĐQT", photo: "" },
      { name: "Nguyễn Văn C", title: "Thành viên HĐQT", photo: "" },
      { name: "Nguyễn Thị D", title: "Thành viên HĐQT", photo: "" },
      { name: "Nguyễn Văn E", title: "Thành viên độc lập HĐQT", photo: "" },
    ],
  },
  {
    id: "btgd",
    groupTitle: "Ban Tổng Giám đốc",
    leader: {
      name: "Nguyễn Văn F",
      title: "Tổng Giám đốc",
      photo: "",
    },
    members: [
      { name: "Nguyễn Văn G", title: "Phó Tổng Giám đốc", photo: "" },
      { name: "Nguyễn Văn H", title: "Phó Tổng Giám đốc", photo: "" },
      { name: "Nguyễn Văn I", title: "Phó Tổng Giám đốc", photo: "" },
    ],
  },
  {
    id: "bks",
    groupTitle: "Ban Kiểm soát",
    leader: {
      name: "Nguyễn Văn K",
      title: "Trưởng Ban kiểm soát",
      photo: "",
    },
    members: [
      { name: "Nguyễn Thị L", title: "Kiểm soát viên", photo: "" },
      { name: "Nguyễn Thị M", title: "Kiểm soát viên", photo: "" },
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
  const dimension = size === "lg" ? "h-36 w-36" : "h-28 w-28";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        className={`${dimension} rounded-full border-4 border-white object-cover shadow-md`}
      />
    );
  }

  return (
    <div
      className={`${dimension} flex items-center justify-center rounded-full border-4 border-white bg-slate-200 text-2xl font-bold text-slate-500 shadow-md`}
    >
      {initials || "?"}
    </div>
  );
}

export function PersonCard({
  person,
  size,
}: {
  person: LeadershipPerson;
  size: "lg" | "md";
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <PersonAvatar name={person.name} photo={person.photo} size={size} />
      <div className={`mt-4 font-bold text-slate-900 ${size === "lg" ? "text-xl" : "text-base"}`}>
        {person.name}
      </div>
      <div className="mt-1 text-sm font-medium text-cyan-700">{person.title}</div>
    </div>
  );
}

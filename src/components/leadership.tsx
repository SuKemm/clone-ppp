// ============================================================================
// BAN LÃNH ĐẠO
// Layout mô phỏng sơ đồ tổ chức theo hình mẫu:
// - 1 khung ngoài
// - 3 khung nhóm bên trong
// - HĐQT: 1 leader -> grid 4 cột
// - Ban Giám đốc: 1 leader -> grid 3 cột
// - Ban Kiểm soát: 1 leader -> grid 2 cột
// ============================================================================

export type LeadershipPerson = {
  name: string;
  title: string;
  title_en?: string;
  photo?: string;
};

export type LeadershipGroup = {
  id: string;
  groupTitle: string;
  groupTitle_en?: string;
  leader: LeadershipPerson;
  members: LeadershipPerson[];
};

export const leadershipGroups: LeadershipGroup[] = [
  {
  id: "hdqt",
  groupTitle: "Hội đồng Quản trị",
  groupTitle_en: "Board of Directors",

  leader: {
    name: "Ông Nguyễn Ngọc Hải",
    title: "Chủ tịch Hội đồng Quản trị",
    title_en: "Chairman of the Board of Directors",
    photo: "/images/leadership/hdqt-chu-tich-nguyen-ngoc-hai.png",
  },

  members: [
    {
      name: "Ông Đỗ Xuân Bình",
      title: "Thành viên HĐQT",
      title_en: "Board Member",
      photo: "/images/leadership/hdqt-uv-do-xuan-binh.jpg",
    },
    {
      name: "Ông Lê Quang Hào",
      title: "Thành viên HĐQT",
      title_en: "Board Member",
      photo: "/images/leadership/hdqt-uv-le-quang-hao.jpg",
    },
  ],
},

  {
    id: "btgd",
    groupTitle: "Ban Tổng Giám đốc",
    groupTitle_en: "Board of Management",
    leader: {
      name: "Ông Đỗ Xuân Bình",
      title: "Giám đốc",
      title_en: "Director",
      photo: "/images/leadership/bgd-giam-doc-do-xuan-binh.jpg",
    },
    members: [
      {
        name: "Ông Lê Năng",
        title: "Phó Giám đốc",
        title_en: "Deputy Director",
        photo: "/images/leadership/bgd-pgd-le-nang.jpg",
      },
      {
        name: "Ông Nguyễn Xuân Hải",
        title: "Phó Giám đốc",
        title_en: "Deputy Director",
        photo: "/images/leadership/bgd-pgd-nguyen-xuan-hai.png",
      },
      {
        name: "Ông Nguyễn Đình Tới",
        title: "Kế toán trưởng",
        title_en: "Chief Accountant",
        photo: "/images/leadership/bgd-ktt-nguyen-dinh-toi.jpg",
      },
    ],
  },

  {
    id: "bks",
    groupTitle: "Ban kiểm soát",
    groupTitle_en: "Supervisory Board",
    leader: {
      name: "Ông Nguyễn Thanh Khiết",
      title: "Trưởng Ban kiểm soát",
      title_en: "Head of the Supervisory Board",
      photo: "/images/leadership/bks-truong-nguyen-thanh-khiet.jpg",
    },
    members: [
      {
        name: "Ông Nguyễn Trung Tuấn",
        title: "Thành viên Ban Kiểm soát",
        title_en: "Supervisor",
        photo: "/images/leadership/bks-tv-nguyen-trung-tuan.jpg",
      },
      {
        name: "Bà Ngô Thị Hồng Hạnh",
        title: "Thành viên Ban Kiểm soát",
        title_en: "Supervisor",
        photo: "/images/leadership/bks-tv-ngo-thi-hong-hanh.png",
      },
    ],
  },
];


// ============================================================================
// ẢNH NHÂN SỰ
// ============================================================================

export function PersonAvatar({
  name,
  photo,
}: {
  name: string;
  photo?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto h-[90px] w-[72px] overflow-hidden sm:h-[105px] sm:w-[83px] lg:h-[120px] lg:w-[95px]">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-[8px] font-bold text-slate-400">
          {initials || "?"}
        </div>
      )}
    </div>
  );
}


// ============================================================================
// CARD NHÂN SỰ
// ============================================================================

export function PersonCard({
  person,
  locale = "vi",
  leader = false,
}: {
  person: LeadershipPerson;
  locale?: "vi" | "en";
  leader?: boolean;
}) {
  const title =
    locale === "en"
      ? person.title_en || person.title
      : person.title;

  return (
    <div
      className={[
        "flex min-w-0 flex-col items-center text-center",
        leader ? "w-[150px] sm:w-[200px] lg:w-[260px]" : "w-[130px] sm:w-[150px] lg:w-[180px]",
      ].join(" ")}
    >
      <PersonAvatar
        name={person.name}
        photo={person.photo}
      />

      <div className="mt-2 w-full text-[13px] font-semibold leading-5 text-[#008bd2] sm:text-[16px] sm:leading-6 lg:text-[18px]">
        {person.name}
      </div>

      <div className="mt-1 w-full text-[12px] font-normal leading-5 text-[#008bd2] sm:text-[13px] sm:leading-6 lg:text-[15px]">
        {title}
      </div>
    </div>
  );
}


// ============================================================================
// TỪNG NHÓM
// ============================================================================

function LeadershipSection({
  group,
  locale = "vi",
}: {
  group: LeadershipGroup;
  locale?: "vi" | "en";
}) {
  const title =
    locale === "en"
      ? group.groupTitle_en || group.groupTitle
      : group.groupTitle;

  let gridClass = "";

 if (group.id === "hdqt") {
  gridClass =
    "grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-16 lg:gap-x-32";
} else if (group.id === "btgd") {
    gridClass =
      "grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-10 lg:gap-x-20";
  } else {
    gridClass =
      "grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-16 lg:gap-x-32";
  }

  return (
    <fieldset className="rounded-[8px] border border-[#00a3ff] px-3 pb-6 pt-3 sm:px-5">
      <legend className="mx-auto px-3 text-[15px] font-bold text-[#008bd2] sm:text-[18px] lg:text-[20px]">
        {title}
      </legend>

      {/* Người đứng đầu */}
      <div className="flex justify-center">
        <PersonCard
          person={group.leader}
          locale={locale}
          leader
        />
      </div>

      {/* Thành viên */}
      {group.members.length > 0 && (
        <div className={`mx-auto mt-6 w-full max-w-[900px] sm:mt-10 ${gridClass}`}>
          {group.members.map((member) => (
            <div
              key={`${group.id}-${member.name}`}
              className="flex justify-center"
            >
              <PersonCard
                person={member}
                locale={locale}
              />
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}


// ============================================================================
// KHUNG SƠ ĐỒ CHÍNH
// ============================================================================

export function LeadershipBoard({
  groups,
  locale = "vi",
}: {
  groups: LeadershipGroup[];
  locale?: "vi" | "en";
}) {
  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <div className="rounded-[12px] border border-[#00a3ff] bg-white px-5 py-5 sm:px-7 sm:py-7">
        <div className="flex flex-col gap-[16px]">
          {groups.map((group) => (
            <LeadershipSection
              key={group.id}
              group={group}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
import type { CmsItem } from "@/lib/cms/store";
import { removeVietnameseDiacritics } from "@/lib/text";

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
  name_en?: string;
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

// Thứ tự nhóm cố định hiển thị trên trang, khớp với option "group" trong
// collection "leadership" (xem src/lib/cms/schema.ts).
const GROUP_ORDER: { key: string; title: string; title_en: string }[] = [
  { key: "Hội đồng Quản trị", title: "Hội đồng Quản trị", title_en: "Board of Directors" },
  { key: "Ban Giám đốc", title: "Ban Giám đốc", title_en: "Board of Management" },
  { key: "Ban kiểm soát", title: "Ban kiểm soát", title_en: "Supervisory Board" },
];

// Dữ liệu từ /admin (collection "leadership") lưu phẳng — mỗi item 1 người,
// có field "group" và "role" ("Trưởng nhóm" | "Thành viên"). Hàm này gom lại
// thành cấu trúc LeadershipGroup[] để component bên dưới render.
export function buildLeadershipGroups(items: CmsItem[]): LeadershipGroup[] {
  return GROUP_ORDER.map(({ key, title, title_en }) => {
    const groupItems = items.filter((it) => it.group === key);
    const leaderItem = groupItems.find((it) => it.role === "Trưởng nhóm") ?? groupItems[0];
    const memberItems = groupItems.filter((it) => it.id !== leaderItem?.id);

    const toPerson = (it: CmsItem): LeadershipPerson => ({
      name: it.name,
      name_en: it.name_en,
      title: it.title,
      title_en: it.title_en,
      photo: it.photo,
    });

    return {
      id: key,
      groupTitle: title,
      groupTitle_en: title_en,
      leader: leaderItem
        ? toPerson(leaderItem)
        : { name: "", title: "" },
      members: memberItems.map(toPerson),
    };
  }).filter((g) => g.leader.name);
}


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
  // Nếu admin chưa nhập title_en/name_en, tự bỏ dấu chữ tiếng Việt gốc thay
  // vì hiển thị nguyên chữ có dấu trên bản tiếng Anh (xem lib/text.ts).
  const title =
    locale === "en"
      ? person.title_en || removeVietnameseDiacritics(person.title)
      : person.title;

  const name =
    locale === "en"
      ? person.name_en || removeVietnameseDiacritics(person.name)
      : person.name;

  return (
    <div
      className={[
        "flex min-w-0 flex-col items-center text-center",
        leader ? "w-[150px] sm:w-[200px] lg:w-[260px]" : "w-[145px] sm:w-[165px] lg:w-[200px]",
      ].join(" ")}
    >
      <PersonAvatar
        name={person.name}
        photo={person.photo}
      />

      <div className="mt-2 w-full text-[11px] font-semibold leading-5 text-[#008bd2] sm:text-[14px] sm:leading-6 lg:text-[16px]">
        {name}
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

 if (group.id === "Hội đồng Quản trị") {
  gridClass =
    "grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-16 lg:gap-x-32";
} else if (group.id === "Ban Giám đốc") {
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
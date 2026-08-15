import { PtscShell } from "@/components/ptsc-shell";
import { ShareholderRelations, type SrTab } from "@/components/shareholder-relations";

const images = [
  "/images/ptsc/project-hd-mien-nam.jpg",
  "/images/ptsc/service-fso.jpg",
  "/images/ptsc/project-lng.jpg",
  "/images/ptsc/service-cong-nghiep.jpg",
  "/images/ptsc/project-bien-dong.jpg",
];

const tabs: SrTab[] = [
  {
    key: "info",
    label: "Shareholder Information",
    articles: [
      {
        image: images[0],
        category: "Shareholder Information",
        date: "latest update",
        title: "Notice of Shareholder Record Date",
        excerpt:
          "Notice of the final registration date for existing shareholders to exercise their rights.",
      },
      {
        image: images[1],
        category: "Shareholder Information",
        date: "latest update",
        title: "Company Charter and Governance Regulations",
        excerpt:
          "Updated Charter of organization and operation, and internal Corporate Governance Regulations.",
      },
      {
        image: images[2],
        category: "Shareholder Information",
        date: "latest update",
        title: "Periodic Information Disclosure",
        excerpt:
          "Periodic disclosure documents required for a public company.",
      },
    ],
  },
  {
    key: "agm",
    label: "General Meeting of Shareholders",
    articles: [
      {
        image: images[3],
        category: "General Meeting",
        date: "latest update",
        title: "Notice of Annual General Meeting of Shareholders",
        excerpt:
          "Invitation letter and meeting documents sent to shareholders ahead of the Annual General Meeting.",
      },
      {
        image: images[4],
        category: "General Meeting",
        date: "latest update",
        title: "Minutes and Resolutions of the Annual General Meeting",
        excerpt:
          "Summary of resolutions approved at the Annual General Meeting of Shareholders.",
      },
      {
        image: images[0],
        category: "General Meeting",
        date: "latest update",
        title: "Extraordinary General Meeting Documents",
        excerpt:
          "Documents related to matters submitted to an Extraordinary General Meeting, if any.",
      },
    ],
  },
  {
    key: "reports",
    label: "Financial / Annual Reports",
    articles: [
      {
        image: images[1],
        category: "Financial Report",
        date: "latest update",
        title: "Audited Financial Statements",
        excerpt: "Annual financial statements audited by an independent auditor.",
      },
      {
        image: images[2],
        category: "Annual Report",
        date: "latest update",
        title: "Annual Report",
        excerpt:
          "Overview of business results and the company's development orientation.",
      },
      {
        image: images[3],
        category: "Financial Report",
        date: "latest update",
        title: "Quarterly Financial Statements",
        excerpt: "Quarterly financial statements provided to shareholders and investors.",
      },
    ],
  },
];

const sidebarItems = [
  { image: images[4], title: "Notice of Annual General Meeting of Shareholders" },
  { image: images[0], title: "Audited Financial Statements" },
  { image: images[1], title: "Company Charter and Governance Regulations" },
  { image: images[2], title: "Annual Report" },
];

export default function ShareholdersPage() {
  return (
    <PtscShell
      title="Investor Relations"
      description="Transparent, up-to-date information for shareholders: shareholder documents, the General Meeting of Shareholders, and financial / annual reports."
    >
      <ShareholderRelations
        tabs={tabs}
        sidebarTitle="Most Viewed"
        sidebarItems={sidebarItems}
      />
    </PtscShell>
  );
}

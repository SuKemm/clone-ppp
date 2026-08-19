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
        id: "sr-en-01",
        image: images[0],
        category: "Shareholder Information",
        date: "latest update",
        title: "Notice of Shareholder Record Date",
        excerpt:
          "Notice of the final registration date for existing shareholders to exercise their rights.",
      },
      {
        id: "sr-en-02",
        image: images[1],
        category: "Shareholder Information",
        date: "latest update",
        title: "Company Charter and Governance Regulations",
        excerpt:
          "Updated Charter of organization and operation, and internal Corporate Governance Regulations.",
      },
      {
        id: "sr-en-03",
        image: images[2],
        category: "Shareholder Information",
        date: "latest update",
        title: "Periodic Information Disclosure",
        excerpt:
          "Periodic disclosure documents required for a public company.",
      },
      {
        id: "sr-en-04",
        image: images[3],
        category: "Shareholder Information",
        date: "latest update",
        title: "List of Related Persons Holding Shares",
        excerpt: "Periodic disclosure of insiders and related persons.",
      },
      {
        id: "sr-en-05",
        image: images[4],
        category: "Shareholder Information",
        date: "latest update",
        title: "Board of Directors' Resolutions",
        excerpt: "Resolutions and decisions of the Board of Directors disclosed to shareholders.",
      },
      {
        id: "sr-en-06",
        image: images[1],
        category: "Shareholder Information",
        date: "latest update",
        title: "Notice of Share Transactions by Internal Shareholders",
        excerpt:
          "Notice of share purchases/sales by internal shareholders and related persons.",
      },
    ],
  },
  {
    key: "agm",
    label: "General Meeting of Shareholders",
    articles: [
      {
        id: "sr-en-07",
        image: images[3],
        category: "General Meeting",
        date: "latest update",
        title: "Notice of Annual General Meeting of Shareholders",
        excerpt:
          "Invitation letter and meeting documents sent to shareholders ahead of the Annual General Meeting.",
      },
      {
        id: "sr-en-08",
        image: images[4],
        category: "General Meeting",
        date: "latest update",
        title: "Minutes and Resolutions of the Annual General Meeting",
        excerpt:
          "Summary of resolutions approved at the Annual General Meeting of Shareholders.",
      },
      {
        id: "sr-en-09",
        image: images[0],
        category: "General Meeting",
        date: "latest update",
        title: "Extraordinary General Meeting Documents",
        excerpt:
          "Documents related to matters submitted to an Extraordinary General Meeting, if any.",
      },
      {
        id: "sr-en-10",
        image: images[1],
        category: "General Meeting",
        date: "latest update",
        title: "Rules of Procedure for the General Meeting of Shareholders",
        excerpt: "Rules of procedure and voting applicable at the General Meeting of Shareholders.",
      },
      {
        id: "sr-en-11",
        image: images[2],
        category: "General Meeting",
        date: "latest update",
        title: "Board/Supervisory Board Nomination Documents",
        excerpt:
          "Nomination dossiers for personnel submitted to the General Meeting of Shareholders.",
      },
      {
        id: "sr-en-12",
        image: images[4],
        category: "General Meeting",
        date: "latest update",
        title: "Photos/Video of the Annual General Meeting",
        excerpt:
          "Collection of photos and videos recorded at the Annual General Meeting of Shareholders.",
      },
    ],
  },
  {
    key: "reports",
    label: "Financial / Annual Reports",
    articles: [
      {
        id: "sr-en-13",
        image: images[1],
        category: "Financial Report",
        date: "latest update",
        title: "Audited Financial Statements",
        excerpt: "Annual financial statements audited by an independent auditor.",
      },
      {
        id: "sr-en-14",
        image: images[2],
        category: "Annual Report",
        date: "latest update",
        title: "Annual Report",
        excerpt:
          "Overview of business results and the company's development orientation.",
      },
      {
        id: "sr-en-15",
        image: images[3],
        category: "Financial Report",
        date: "latest update",
        title: "Quarterly Financial Statements",
        excerpt: "Quarterly financial statements provided to shareholders and investors.",
      },
      {
        id: "sr-en-16",
        image: images[4],
        category: "Annual Report",
        date: "latest update",
        title: "Sustainability Report",
        excerpt: "Report on sustainability, environmental and social activities.",
      },
      {
        id: "sr-en-17",
        image: images[0],
        category: "Financial Report",
        date: "latest update",
        title: "Explanation of Business Results Fluctuation",
        excerpt:
          "Explanation of after-tax profit variance as required for information disclosure.",
      },
      {
        id: "sr-en-18",
        image: images[1],
        category: "Financial Report",
        date: "latest update",
        title: "Consolidated Financial Statements",
        excerpt: "Audited consolidated financial statements of the whole Corporation.",
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
        isEnglish
      />
    </PtscShell>
  );
}

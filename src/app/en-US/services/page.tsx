import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

const stockImages = [
  "/images/ptsc/project-gallaf.jpg",
  "/images/ptsc/service-fso.jpg",
  "/images/ptsc/service-cong-nghiep.jpg",
  "/images/ptsc/project-lng.jpg",
  "/images/ptsc/service-bien.jpg",
  "/images/ptsc/project-hd-mien-nam.jpg",
  "/images/ptsc/service-cang.jpg",
  "/images/ptsc/project-bien-dong.jpg",
  "/images/ptsc/service-tau.jpg",
  "/images/ptsc/service-khao-sat.jpg",
  "/images/ptsc/service-nang-luong.jpg",
  "/images/ptsc/service-co-khi.jpg",
];

const photoAlbums = [
  { title: "Year 2024", date: "Mar 12, 2024" },
  { title: "Year 2023", date: "Nov 20, 2023" },
  { title: "Year 2022", date: "Aug 08, 2022" },
  { title: "Year 2021", date: "Jul 24, 2022" },
  { title: "Year 2020", date: "Jun 24, 2022" },
  { title: "Year 2019", date: "May 24, 2022" },
  { title: "Year 2018", date: "Apr 24, 2022" },
  { title: "Year 2017", date: "Jul 17, 2017" },
  { title: "Year 2016", date: "Jul 17, 2017" },
  { title: "Year 2015", date: "Jul 17, 2017" },
  { title: "Year 2014", date: "Jul 17, 2017" },
  { title: "Year 2013", date: "Jul 17, 2017" },
  { title: "Year 2012", date: "Jul 17, 2017" },
  { title: "Year 2011", date: "Jul 17, 2017" },
  { title: "Year 2010", date: "Jul 17, 2017" },
  { title: "Year 2009", date: "Jul 14, 2017" },
  { title: "Year 2008", date: "Jul 14, 2017" },
  { title: "Documentary", date: "May 10, 2017" },
].map((album, index) => ({
  ...album,
  slug: album.title.toLowerCase().replace(/\s+/g, "-"),
  image: stockImages[index % stockImages.length],
}));

const videoAlbums = [
  { title: "Plant inauguration ceremony", date: "Sep 15, 2023" },
  { title: "Operations documentary", date: "Jun 02, 2023" },
  { title: "Featured projects", date: "Jan 18, 2023" },
  { title: "Corporate introduction film", date: "May 10, 2017" },
].map((video, index) => ({
  ...video,
  image: stockImages[(index + 4) % stockImages.length],
}));

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export default function GalleryPage() {
  return (
    <PtscShell
      title="Gallery"
      description="Photos and videos of activities, projects and key events of the company over the years."
    >
      {/* ===== Photo gallery ===== */}
      <section id="photos" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          <Link href="/en-US" className="transition hover:text-cyan-700">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-600">Photo Gallery</span>
        </nav>

        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
            Photo Gallery
          </h2>
          <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-cyan-500/70 to-transparent sm:block" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
          {photoAlbums.map((album) => (
            <Link
              key={album.title}
              href={`/en-US/services/${album.slug}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="mt-3 text-[15px] font-semibold leading-snug text-slate-800 transition group-hover:text-cyan-700">
                {album.title}
              </h3>
              <p className="mt-1 text-xs text-slate-400">{album.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Video gallery ===== */}
      <section id="videos" className="border-t border-slate-200 bg-slate-50/60">
        <div className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
            <Link href="/en-US" className="transition hover:text-cyan-700">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-600">Video Gallery</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Video Gallery
            </h2>
            <div className="hidden h-[3px] flex-1 max-w-xs bg-gradient-to-r from-cyan-500/70 to-transparent sm:block" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {videoAlbums.map((video) => (
              <div key={video.title} className="group block cursor-pointer">
                <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/25 transition group-hover:bg-slate-900/40">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-cyan-700 shadow-md transition group-hover:scale-110">
                      <PlayIcon />
                    </span>
                  </div>
                </div>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug text-slate-800 transition group-hover:text-cyan-700">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{video.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PtscShell>
  );
}

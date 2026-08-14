import { PtscShell } from "@/components/ptsc-shell";

const hero = {
  title: "Leading offshore oil and gas contractor and renewable energy service provider",
  subtitle:
    "PTSC is a national champion in technical services for oil and gas, industrial, and offshore renewable energy projects.",
  image: "/images/ptsc/service-fso.jpg",
};

const services = [
  {
    title: "Mechanical Engineering",
    description: "Design, procurement, fabrication, installation, hook-up and commissioning services for offshore projects.",
  },
  {
    title: "FSO / FPSO",
    description: "Manage, operate, and maintain FSO/FPSO vessels in domestic and international waters.",
  },
  {
    title: "Marine Construction",
    description: "Transportation, installation, operation and maintenance for offshore structures.",
  },
];

const projects = [
  {
    title: "Gallaf 1 Project",
    details: "Delivered engineering, procurement, construction, installation and commissioning for offshore platforms.",
  },
  {
    title: "Southern Petrochemical Complex",
    details: "Executed the A1 Olefins plant EPC package with high technical expertise.",
  },
  {
    title: "Thi Vai LNG Terminal",
    details: "Built LNG receiving and storage systems to ensure safe and stable operation.",
  },
];

const news = [
  {
    title: "PTSC names and delivers FSO PTSC Lac Da Vang, ready for first oil at Lac Da Vang field.",
    date: "24/06/2026",
  },
  {
    title: "PTSC strengthens risk management to keep Lo B Gas Project EPCI#1 on schedule.",
    date: "20/06/2026",
  },
  {
    title: "PTSC confirms its competitive position after a record year and builds regional strength.",
    date: "18/06/2026",
  },
];

export default function EnglishHomePage() {
  return (
    <PtscShell>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <img src={hero.image} alt={hero.title} className="h-[620px] w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
              PetroVietnam Technical Services Corporation
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">{service.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">Projects</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Major achievements across industries</h2>
            </div>
            <a href="/en-US/projects" className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-900">
              View all projects →
            </a>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-4 text-slate-600">{project.details}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">News</p>
              <p className="mt-4 text-lg font-semibold text-slate-900">{item.title}</p>
              <p className="mt-4 text-sm text-slate-500">{item.date}</p>
            </article>
          ))}
        </div>
      </section>
    </PtscShell>
  );
}

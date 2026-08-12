import Link from 'next/link';

export type SectionPageFact = {
  value: string;
  label: string;
};

export type SectionPageSection = {
  title: string;
  body: string;
  bullets?: string[];
};

export type SectionPageAction = {
  label: string;
  href: string;
};

export type SectionPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  actions: SectionPageAction[];
  facts: SectionPageFact[];
  sections: SectionPageSection[];
};

export function SectionPage({ content }: { content: SectionPageContent }) {
  return (
    <div>
      <section className="border-b border-slate-200 bg-[linear-gradient(135deg,#0d3b66_0%,#114f8a_50%,#f6a31a_160%)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">{content.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">{content.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {content.actions.map((action, index) => (
              <Link
                key={`${action.href}-${action.label}-${index}`}
                href={action.href}
                className={index === 0
                  ? 'inline-flex items-center justify-center rounded-full bg-[#f6a31a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e5930c]'
                  : 'inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20'}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.facts.map((fact) => (
              <div key={`${fact.value}-${fact.label}`} className="rounded-[1.5rem] border border-slate-200 bg-[#f7f9fb] p-6 shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">{fact.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fb] py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 sm:px-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="grid gap-6">
            {content.sections.map((section) => (
              <article key={section.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-950">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">{section.body}</p>
                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#f6a31a]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Điều hướng nhanh</h2>
            <div className="mt-5 grid gap-3">
              {content.actions.map((action) => (
                <Link
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#f6a31a]/40 hover:text-[#f6a31a]"
                >
                  {action.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 rounded-[1.25rem] bg-[#0d3b66] p-5 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">PVOIL</p>
              <p className="mt-3 text-sm leading-7 text-white/85">
                Tổng công ty Dầu Việt Nam - CTCP, Tầng 14-18, Tòa nhà PetroVietnam Tower, Số 1-5 Lê Duẩn, Phường Sài Gòn, TP. Hồ Chí Minh.
              </p>
              <p className="mt-3 text-sm text-white/85">Điện thoại: (84 - 28) 39106990</p>
              <p className="mt-1 text-sm text-white/85">Email: contact@pvoil.com.vn</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

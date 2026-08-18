import Link from "next/link";
import { PtscShell } from "@/components/ptsc-shell";

// Đồng bộ nội dung với trang tiếng Việt (src/app/gioi-thieu/page.tsx).

const shareholders = [
  "PetroVietnam Power Corporation - JSC (PV Power)",
  "Joint Stock Commercial Bank for Investment and Development of Vietnam (BIDV)",
  "LICOGI Corporation - JSC (LICOGI)",
  "Song Da Corporation - JSC (Song Da)",
  "Ms. Ha Thi Phuong Thuy",
];

const projectSpecs = [
  ["Installed capacity", "125 MW"],
  ["Multi-year average output (E0, per PPA)", "527.6 million kWh/year"],
  ["Location", "Son Tay District, Quang Ngai Province and Kon Plong District, Kon Tum Province"],
  ["Power planning", "Part of Power Development Plan VI and Plan VII"],
  ["Structure classification", "Grade I structure"],
  ["Headrace tunnel", "10.7 km long — one of the longest hydropower tunnels at the time of construction"],
  ["Concrete volume", "Over 800,000 m³ of RCC and CVC concrete"],
  ["Reservoir capacity", "248 million m³"],
  ["Catchment area", "420 km²"],
  ["Normal water level", "410 m"],
  ["Reservoir surface area at normal water level", "9.12 km²"],
];

const timeline = [
  ["21/03/2007", "Established Dakdrinh Hydropower Joint Stock Company under the Enterprise Law, operating as a joint stock company."],
  ["28/03/2007", "The Dakdrinh Hydropower Project officially broke ground."],
  ["17/05/2008", "The Company's Board of Directors approved the investment project under Decision No. 16/DHC-HĐQT-QĐ."],
  ["23/01/2011", "Construction began, first-stage river diversion."],
  ["16/10/2013", "Reservoir impoundment began (second-stage river diversion)."],
  ["29/05/2014", "Unit 1 (H1) generated power and was connected to the National Grid."],
  ["29/08/2014", "Unit 2 generated power and was connected to the National Grid."],
  ["24/11/2017", "The General Meeting of Shareholders approved the second revision of the total investment under Resolution No. 105/QĐ-ĐHĐCĐ."],
  ["2015 – 27/01/2016", "Construction completed; the State Acceptance Council approved handover of the facility for commercial operation (Notice No. 02/TB-HĐNTNN)."],
];

const stats = [
  ["125 MW", "Installed capacity"],
  ["1,160.011", "Charter capital (VND billion)"],
  ["~7 billion", "Cumulative output (kWh)"],
  ["12", "Years in operation (since 2014)"],
];

const emulationTitles = [
  ["2012", "Excellent Labor Collective", "Decision No. 608/QĐ-ĐLDK dated 04/12/2012 issued by PetroVietnam Power Corporation"],
  ["2013", "Excellent Labor Collective", "Decision No. 665/QĐ-ĐLDK dated 29/11/2013 issued by PetroVietnam Power Corporation"],
  ["2015", "Advanced Labor Collective", "Decision No. 956/QĐ-ĐLDK dated 01/12/2015 issued by PetroVietnam Power Corporation"],
  ["2016", "Advanced Labor Collective", "Decision No. 1313/QĐ-ĐLDK dated 01/12/2016 issued by PetroVietnam Power Corporation"],
  ["2017", "Advanced Labor Collective", "Decision No. 1158/QĐ-ĐLDK dated 01/12/2017 issued by PetroVietnam Power Corporation"],
  ["2018", "Advanced Labor Collective", "Decision No. 698/QĐ-ĐLDK dated 06/12/2018 issued by PetroVietnam Power Corporation - JSC"],
  ["2019", "Collective That Successfully Fulfilled Its Duties", "Decision No. 1220/QĐ-ĐKDK dated 28/11/2019 issued by PetroVietnam Power Corporation - JSC"],
  ["2020", "Advanced Labor Collective", "Decision No. 1081/QĐ-ĐKDK dated 27/11/2020 issued by PetroVietnam Power Corporation - JSC"],
];

const commendations = [
  ["2012", "Certificate of Merit from the Corporation", "Decision No. 609/QĐ-ĐLDK dated 04/12/2012 issued by PetroVietnam Power Corporation"],
  ["2014", "Certificate of Merit from the Minister of Industry and Trade", "Decision No. 783/QĐ-BCT dated 22/01/2014 issued by the Minister of Industry and Trade"],
  ["2015", "Certificate of Merit from the Corporation", "Decision No. 959/QĐ-ĐLDK dated 07/12/2015 issued by PetroVietnam Power Corporation"],
  ["2016", "Certificate of Merit from the Quang Ngai Provincial People's Committee", "Decision No. 1699/QĐ-UBND dated 20/9/2016 issued by the Quang Ngai Provincial People's Committee"],
  ["2016", "Certificate of Merit from the Corporation", "Decision No. 1312/QĐ-ĐLDK dated 01/12/2016 issued by PetroVietnam Power Corporation"],
  ["2017", "Certificate of Merit from the Quang Ngai Provincial People's Committee", "Decision No. 496/QĐ-UBND dated 23/3/2017 issued by the Quang Ngai Provincial People's Committee"],
  ["2017", "Certificate of Merit from the Corporation", "Decision No. 1160/QĐ-ĐLDK dated 01/12/2017 issued by PetroVietnam Power Corporation"],
  ["2018", "Certificate of Merit from the Quang Ngai Provincial People's Committee", "Decision No. 185/QĐ-UBND dated 30/01/2018 issued by the Quang Ngai Provincial People's Committee"],
  ["2018", "Certificate of Merit from the Corporation", "Decision No. 697/QĐ-ĐLDK dated 06/12/2018 issued by PetroVietnam Power Corporation - JSC"],
  ["2019", "Certificate of Merit from the Corporation", "Decision No. 1220/QĐ-ĐKDK dated 28/11/2019 issued by PetroVietnam Power Corporation - JSC"],
  ["2020", "Certificate of Merit from the Corporation", "Decision No. 1084/QĐ-ĐKDK dated 27/11/2019 issued by PetroVietnam Power Corporation - JSC"],
];

const operatingResults = [
  ["~7 billion kWh", "Cumulative output delivered to the National Grid (29/05/2014 – end of May 2026), averaging 564 million kWh/year, above the E0 target of 540.29 million kWh/year"],
  ["VND 6,622 billion", "Cumulative revenue before VAT"],
  ["VND 1,050 billion", "Cumulative after-tax profit"],
  ["VND 1,550 billion", "Contributions to the State Budget since the plant began operation"],
];

export default function AboutUsPage() {
  return (
    <PtscShell
      title="About Us"
      description="Dakdrinh Hydropower Joint Stock Company (PV Power DHC) — investor and operator of the 125 MW Dakdrinh Hydropower Plant in Son Tay District (Quang Ngai) and Kon Plong District (Kon Tum)."
    >
      <section className="border-b border-slate-200 bg-slate-50 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/en-US" className="transition hover:text-cyan-700">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-slate-900">About Us</span>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              PV Power DHC
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Corporate Overview
            </h2>

            <div className="mt-6 space-y-5 text-[16px] leading-8 text-slate-600">
              <p className="font-semibold text-slate-800">
                Dakdrinh Hydropower Plant has a designed capacity of 125 MW,
                total investment of VND 5,921 billion, a designed average
                output (E0) of 540.29 million kWh/year, and a contracted
                output under the power purchase agreement of 527 million
                kWh/year. Cumulative generation from 29 May 2014 to date has
                exceeded 7 billion kWh, contributing thousands of billions of
                VND to the budgets of Quang Ngai and Kon Tum provinces.
              </p>

              <p>
                Dakdrinh Hydropower Joint Stock Company was established on 16
                March 2007 by four founding shareholders: Vietnam Oil and Gas
                Group (rights since transferred to PetroVietnam Power
                Corporation - JSC, PV Power), the Joint Stock Commercial Bank
                for Investment and Development of Vietnam (BIDV), Song Da
                Corporation - JSC (Song Da), and LICOGI Corporation - JSC
                (LICOGI), under Business Registration Certificate No.
                4300350203 first issued by the Quang Ngai Department of
                Planning and Investment on 21 March 2007, with an initial
                charter capital of VND 930 billion. Following several
                amendments to the enterprise registration certificate, the
                Company's charter capital now stands at VND 1,160.011
                billion.
              </p>

              <p>
                The Company is the investor of the Dakdrinh Hydropower
                Project, located on the Dakdrinh river basin in Son Tay
                District, Quang Ngai Province and Kon Plong District, Kon
                Tum Province, about 70 km west of Quang Ngai City — a key
                project in the country's socio-economic development and
                energy security programs, and in Quang Ngai Province in
                particular. The plant comprises two generating units; Unit 1
                was connected to the National Grid in June 2014 and Unit 2
                in September 2014. Besides power generation, the plant also
                helps mitigate flooding during the rainy season and
                supplements downstream water supply during the dry season.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl font-bold text-cyan-700">{value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            2015 – 2020 Strategy, 2030 Vision
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Vision &amp; Mission
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Vision</h3>
            <p className="mt-4 leading-7 text-slate-600">
              Sustainable development — becoming one of the leading, most
              efficient power generation and trading joint stock companies
              in the Central Vietnam region.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Mission</h3>
            <p className="mt-4 leading-7 text-slate-600">
              Provide a reliable, quality power supply; foster sustainable
              cooperation with shareholders and partners; and build a
              professional, dynamic, creative, effective, people-centered
              and socially responsible working environment.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Ownership Structure
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Company Shareholders
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">List of Shareholders</h3>
              <ul className="mt-5 space-y-3">
                {shareholders.map((name) => (
                  <li key={name} className="flex gap-3 leading-7 text-slate-600">
                    <span className="mt-1 font-bold text-cyan-700">✓</span>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">Total Investment</h3>
              <p className="mt-4 leading-7 text-slate-600">
                The investment project was approved by the Company's Board
                of Directors under Decision No. 16/DHC-HĐQT-QĐ dated 17 May
                2008.
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                The project's second revised total investment of{" "}
                <span className="font-semibold text-slate-800">VND 5,921 billion</span>,
                was approved by the Company's General Meeting of
                Shareholders under Resolution No. 105/QĐ-ĐHĐCĐ dated 24
                November 2017.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Key Personnel
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Leadership</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              The Board of Directors, Board of Management, and Supervisory
              Board of Dakdrinh Hydropower Joint Stock Company (PV Power
              DHC).
            </p>
          </div>
          <Link
            href="/en-US/about-us/leadership"
            className="shrink-0 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
          >
            View Leadership
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Project
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Dakdrinh Hydropower Project Specifications
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectSpecs.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-slate-500">{label}</div>
              <div className="mt-2 text-lg font-bold text-cyan-700">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Operating Results
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Cumulative Generation (29/05/2014 – end of May 2026)
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {operatingResults.map(([value, label]) => (
              <div
                key={value}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-2xl font-bold text-cyan-700">{value}</div>
                <div className="mt-2 text-sm leading-6 text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Development Journey
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            History of Formation and Development
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {timeline.map(([date, summary]) => (
            <article
              key={date}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="text-xl font-bold text-cyan-700">{date}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
            Recognition
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Awards and Commendations Received
          </h2>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Emulation Titles</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-5 py-3 font-semibold">Year</th>
                    <th className="px-5 py-3 font-semibold">Emulation Title</th>
                    <th className="px-5 py-3 font-semibold">Recognition Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {emulationTitles.map(([year, title, decision], i) => (
                    <tr key={`${year}-${title}-${i}`} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{year}</td>
                      <td className="px-5 py-3 text-slate-700">{title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-slate-900">Forms of Commendation</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-5 py-3 font-semibold">Year</th>
                    <th className="px-5 py-3 font-semibold">Form of Commendation</th>
                    <th className="px-5 py-3 font-semibold">Commendation Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {commendations.map(([year, title, decision], i) => (
                    <tr key={`${year}-${title}-${i}`} className="border-b border-slate-100 last:border-0">
                      <td className="px-5 py-3 font-semibold text-cyan-700">{year}</td>
                      <td className="px-5 py-3 text-slate-700">{title}</td>
                      <td className="px-5 py-3 leading-6 text-slate-500">{decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-700">
              Brand Affirmation
            </span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              PV Power DHC Continues to Grow
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <p className="leading-8 text-slate-600">
              From an initial charter capital of VND 930 billion, after
              nearly 12 years of operation the Company's charter capital has
              grown to VND 1,160.01 billion, supported by 4 departments and
              1 operations and maintenance workshop. Dakdrinh Hydropower
              Plant maintains an average annual output of nearly 540.925
              million kWh. The Company plans to list more than 116 million
              shares on the stock exchange, aiming to become a public
              company in power investment, construction, generation and
              trading.
            </p>
            <p className="leading-8 text-slate-600">
              Both units of Dakdrinh Hydropower Plant operate stably under
              the close direction of the Company's leadership, with
              coordinated production management, technical operations and
              competitive bidding on the power market, supported by an ISO
              9001-2008 management system — as a result, the Company's
              cumulative profit for 2014–2022 reached VND 863 billion.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">Explore PV Power DHC</h2>
            <p className="mt-2 text-slate-300">
              Learn more about our projects, operations, and corporate information.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/en-US/services"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold transition hover:bg-cyan-500"
            >
              Services
            </Link>
            <Link
              href="/en-US/projects"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Projects
            </Link>
            <Link
              href="/en-US/contact"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </PtscShell>
  );
}

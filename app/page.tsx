"use client";

import Link from "next/link";
import { useCopy } from "./_i18n/provider";
import { Calculator } from "./_components/calculator";
import {
  SectionLabel,
  ghostButton,
  primaryButton,
} from "./_components/chrome";
import { SiteFooter } from "./_components/footer";
import { HelpTrigger } from "./_components/help-dialog";
import { MeshBackground } from "./_components/mesh-background";
import { OperatingSystem } from "./_components/operating-system";
import { Partnership } from "./_components/partnership";
import { SiteHeader } from "./_components/site-header";
import { TestimonialMarquee } from "./_components/testimonial-marquee";
import { Marquee } from "./_components/silk";
import {
  ArrowIcon,
  CheckIcon,
  CrossIcon,
} from "./_components/icons";
import {
  MotionRoot,
  Reveal,
  Stagger,
  StaggerItem,
} from "./_components/motion";
import { ServicePillars } from "./_components/service-pillars";

// Swap for the live scheduling link (Cal.com / Calendly) when it exists.
const BOOKING_URL = "/book";

const testimonialAvatars = [
  "from-[#1D1D1F] to-[#636366]",
  "from-[#0A84FF] to-[#5AC8FA]",
  "from-[#C7A27C] to-[#E8D5B5]",
  "from-[#3A3A3C] to-[#8E8E93]",
  "from-[#0B4FA8] to-[#5AC8FA]",
  "from-[#C7A27C] to-[#8E8E93]",
];

export default function Home() {
  const copy = useCopy();
  const testimonials = copy.home.testimonials.map((item, index) => ({
    ...item,
    avatar: testimonialAvatars[index],
  }));

  return (
    <MotionRoot>
      <div
        id="top"
        className="relative flex flex-1 flex-col font-sans text-[var(--fg)] antialiased"
      >
        <MeshBackground />
        <SiteHeader bookingUrl={BOOKING_URL} homeHref="#top" />

        <main className="flex-1">
          <section className="flex min-h-[calc(100dvh-8.5rem)] flex-col lg:min-h-[calc(100dvh-4.25rem)]">
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-10 pb-8 text-center sm:px-6 sm:pt-16 sm:pb-10">
              <Reveal>
                <SectionLabel>{copy.home.label}</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mx-auto mt-6 max-w-4xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.5rem]">
                  {copy.home.heroTitle}
                  <br />
                  <span className="bg-gradient-to-r from-[#0A84FF] via-[#3AA0FF] to-[#5AC8FA] bg-clip-text text-transparent">
                    {copy.home.heroAccent}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-7 tracking-[0.01em] text-pretty text-[#86868B] sm:text-lg sm:leading-8">
                  {copy.home.heroBody}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href={BOOKING_URL} className={`${primaryButton} w-full sm:w-auto`}>
                    {copy.home.bookCta}
                    <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </Link>
                  <a href="#pillars" className={`${ghostButton} w-full sm:w-auto`}>
                    {copy.home.servicesCta}
                  </a>
                </div>
                <HelpTrigger className="mt-4 text-[13px] text-[var(--muted)] transition-colors duration-500 hover:text-[var(--fg)]">
                  {copy.home.helpLink}
                </HelpTrigger>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="mt-7 flex max-w-md flex-col items-center justify-center gap-3 sm:mt-7 sm:max-w-none sm:flex-row">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {[
                      "from-[#1D1D1F] to-[#636366]",
                      "from-[#0A84FF] to-[#5AC8FA]",
                      "from-[#C7A27C] to-[#E8D5B5]",
                      "from-[#3A3A3C] to-[#8E8E93]",
                    ].map((gradient) => (
                      <span
                        key={gradient}
                        className={`size-6 rounded-full border-2 border-white bg-gradient-to-br ${gradient}`}
                      />
                    ))}
                  </div>
                  <p className="text-center text-[13px] text-[#86868B] sm:text-left">
                    {copy.home.trusted}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="pb-8 sm:pb-10">
              <p className="mb-5 text-center text-[11px] tracking-[0.16em] text-[#86868B] uppercase">
                {copy.home.fromPractice}
              </p>
              <TestimonialMarquee items={testimonials} />
            </div>
          </section>

          <Partnership />

          <section
            id="pillars"
            className="scroll-mt-40 py-20 sm:py-32 lg:scroll-mt-24"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal className="text-center">
                <SectionLabel>{copy.home.servicesLabel}</SectionLabel>
                <h2 className="mx-auto mt-6 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
                  {copy.home.servicesTitle}
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#86868B]">
                  {copy.home.servicesBody}
                </p>
              </Reveal>

              <ServicePillars />
            </div>
          </section>

          <section
            id="calculator"
            className="scroll-mt-40 py-20 sm:py-32 lg:scroll-mt-24"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal className="text-center">
                <SectionLabel>{copy.home.calcLabel}</SectionLabel>
                  <h2 className="mx-auto mt-6 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
                  {copy.home.calcTitle}
                  <br />
                  <span className="text-[#86868B]">{copy.home.calcTitleAccent}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#86868B]">
                  {copy.home.calcBody}
                </p>
              </Reveal>
              <Reveal delay={0.12} className="mt-16">
                <Calculator />
              </Reveal>
            </div>
          </section>

          <section id="proof" className="relative scroll-mt-40 lg:scroll-mt-24">
            <div
              className="pointer-events-none absolute -inset-y-96 inset-x-0"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0)_0%,rgba(5,5,5,0.06)_10%,rgba(5,5,5,0.22)_20%,rgba(5,5,5,0.55)_28%,rgba(5,5,5,0.9)_34%,#050505_40%,#050505_60%,rgba(5,5,5,0.9)_66%,rgba(5,5,5,0.55)_72%,rgba(5,5,5,0.22)_80%,rgba(5,5,5,0.06)_90%,rgba(5,5,5,0)_100%)]" />
              <div className="absolute top-[18%] left-[4%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.38),rgba(10,132,255,0)_66%)] blur-3xl" />
              <div className="absolute top-[38%] right-[-14%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(94,92,230,0.34),rgba(94,92,230,0)_66%)] blur-3xl" />
              <div className="absolute bottom-[16%] left-[22%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(90,200,250,0.22),rgba(90,200,250,0)_66%)] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pt-64 pb-72 sm:px-6 sm:pt-72 sm:pb-80">
              <Reveal className="text-center">
                <SectionLabel tone="dark">{copy.home.proofLabel}</SectionLabel>
                <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  {copy.home.proofTitle}
                  <br />
                  <span className="text-white/45">{copy.home.proofTitleAccent}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/50">
                  {copy.home.proofBody}
                </p>
              </Reveal>

              <Reveal delay={0.12} className="mt-16">
                <OperatingSystem />
              </Reveal>

              <Stagger className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" step={0.08}>
                {copy.home.trustStats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl transition-all duration-500 ease-out sm:p-6 [@media(hover:hover)]:hover:scale-[1.02] [@media(hover:hover)]:hover:border-white/20">
                      <p className="text-3xl font-semibold tracking-[-0.035em] text-white tabular-nums">
                        {stat.figure}
                      </p>
                      <p className="mt-2 text-[13px] leading-5 text-white/45">
                        {stat.label}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.1} className="mt-6">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
                  <div className="flex flex-col gap-1 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-6">
                    <div>
                      <p className="text-[11px] tracking-[0.14em] text-white/40 uppercase">
                        {copy.home.shift}
                      </p>
                      <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-white">
                        {copy.home.shiftTitle}
                      </h3>
                    </div>
                    <p className="text-[13px] text-white/35">
                      {copy.home.shiftNote}
                    </p>
                  </div>

                  <Stagger className="divide-y divide-white/[0.06]" step={0.06}>
                    {copy.home.beforeAfter.map((row) => (
                      <StaggerItem key={row.metric}>
                        <div className="grid gap-2 px-5 py-4 sm:grid-cols-[1.1fr_1fr_1fr] sm:items-center sm:gap-6 sm:px-8">
                          <p className="text-[13px] text-white/40">
                            {row.metric}
                          </p>
                          <p className="flex items-center gap-2 text-[14px] text-white/40">
                            <CrossIcon className="size-3.5 shrink-0 text-white/25" />
                            {row.before}
                          </p>
                          <p className="flex items-center gap-2 text-[14px] font-medium text-white">
                            <CheckIcon className="size-3.5 shrink-0 text-[#5AC8FA]" />
                            {row.after}
                          </p>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <Marquee items={copy.home.clientTags} />
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 flex flex-col items-center gap-4 text-center">
                  <p className="text-[15px] text-white/55">
                    {copy.home.proofTrust}
                  </p>
                  <Link
                    href={BOOKING_URL}
                    className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 text-[15px] font-medium text-white backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.03] hover:border-white/30 hover:bg-white/10"
                  >
                    {copy.home.proofCta}
                    <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <SiteFooter bookingUrl={BOOKING_URL} />
      </div>
    </MotionRoot>
  );
}

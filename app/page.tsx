"use client";

import Link from "next/link";
import { useCopy } from "./_i18n/provider";
import {
  SectionLabel,
  ghostButton,
  inverseButton,
  primaryButton,
} from "./_components/chrome";
import { SiteFooter } from "./_components/footer";
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
import { GlobalScale } from "./_components/global-scale";

// Swap for the live scheduling link (Cal.com / Calendly) when it exists.
const BOOKING_URL = "/book";

const avatarTones = [
  "from-[#3A3A3C] to-[#050505]",
  "from-[#5AC8FA] to-[#0A84FF]",
  "from-[#C7C7CC] to-[#86868B]",
  "from-[#64B5F6] to-[#0B4FA8]",
  "from-[#E8E8ED] to-[#A1A1A6]",
  "from-[#1C1C1E] to-[#0A84FF]",
] as const;

export default function Home() {
  const copy = useCopy();
  const testimonials = copy.home.testimonials.map((item, index) => ({
    ...item,
    avatar: avatarTones[index % avatarTones.length],
  }));

  return (
    <MotionRoot>
      <div
        id="top"
        className="relative flex max-w-[100vw] flex-1 flex-col font-sans text-[var(--fg)] antialiased"
      >
        <MeshBackground />
        <SiteHeader bookingUrl={BOOKING_URL} homeHref="#top" />

        <main className="max-w-[100vw] flex-1 overflow-x-clip">
          <section className="flex min-h-[calc(100dvh-8.5rem)] w-full max-w-full flex-col overflow-hidden lg:min-h-[calc(100dvh-4.25rem)]">
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
                  <Link href="/calculator" className={`${ghostButton} w-full sm:w-auto`}>
                    {copy.home.calcCta}
                  </Link>
                </div>
                <a
                  href="#pillars"
                  className="mt-4 inline-block text-[13px] text-[var(--muted)] transition-colors duration-500 hover:text-[var(--fg)]"
                >
                  {copy.home.servicesCta}
                </a>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="mt-7 flex max-w-md flex-col items-center justify-center gap-3 sm:mt-7 sm:max-w-none sm:flex-row">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {avatarTones.slice(0, 4).map((gradient) => (
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
              <p className="mb-5 text-center text-[13px] tracking-[-0.01em] text-[#86868B]">
                {copy.home.fromPractice}
              </p>
              <TestimonialMarquee items={testimonials} />
            </div>
          </section>

          <Partnership />

          <section
            id="pillars"
            className="w-full max-w-full overflow-x-clip py-16 sm:py-24"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal className="text-center">
                <SectionLabel>{copy.home.servicesLabel}</SectionLabel>
                <h2 className="mx-auto mt-6 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-[#050505] sm:text-5xl">
                  {copy.home.servicesTitle}
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-pretty text-[#86868B]">
                  {copy.home.servicesBody}
                </p>
              </Reveal>

              <ServicePillars />
            </div>
          </section>

          <GlobalScale />

          <section
            id="calculator"
            className="w-full max-w-full overflow-x-clip pt-12 pb-0 sm:pt-20 sm:pb-0"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-[2rem]">
                  <div
                    className="gpu os-spin pointer-events-none absolute -inset-[60%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(10,132,255,0.7)_70deg,transparent_140deg,rgba(90,200,250,0.4)_230deg,transparent_320deg)] opacity-80 blur-xl"
                    aria-hidden="true"
                  />
                  <div className="gpu relative m-[1.5px] overflow-hidden rounded-[calc(2rem-1.5px)] bg-[#050505] px-8 py-12 text-white shadow-[0_30px_90px_-45px_rgba(0,0,0,0.55)] sm:px-12 sm:py-16 lg:px-16">
                    <div
                      className="gpu os-pulse-glow pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.55),transparent_65%)] blur-2xl"
                      aria-hidden="true"
                    />
                    <div
                      className="gpu os-pulse-glow-alt pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(90,200,250,0.3),transparent_65%)] blur-3xl"
                      aria-hidden="true"
                    />
                    <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                      <div>
                        <p className="text-[13px] tracking-[-0.01em] text-white/45">
                          {copy.home.calcLabel}
                        </p>
                        <h2 className="mt-4 max-w-xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance sm:text-4xl">
                          {copy.home.teaserTitle}
                        </h2>
                        <p className="mt-5 max-w-lg text-[15px] leading-7 text-white/60 sm:text-[16px] sm:leading-8">
                          {copy.home.teaserBody}
                        </p>
                        <Link
                          href="/calculator"
                          className={`${inverseButton} mt-8 w-full sm:w-auto`}
                        >
                          {copy.home.teaserCta}
                          <ArrowIcon className="size-4 text-[#050505] transition-transform duration-500 ease-out group-hover:translate-x-1" />
                        </Link>
                      </div>
                      <div className="hidden text-center lg:block">
                        <p className="text-[13px] tracking-[-0.01em] text-white/35">
                          {copy.calc.lockedLabel}
                        </p>
                        <p className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-white/15 blur-[5px] select-none">
                          $000,000
                        </p>
                        <p className="mx-auto mt-4 max-w-xs text-[13px] leading-5 text-white/40">
                          {copy.calc.lockedBody}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section id="performance" className="relative w-full max-w-full">
            <div
              className="gpu pointer-events-none absolute inset-x-0 -top-20 bottom-0 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgb(250 250 250 / 0) 0%, rgb(250 250 250 / 0.06) 8rem, rgb(246 247 248 / 0.4) 14rem, #eef1f4 20rem, #d5dee7 26rem, #a3b4c4 32rem, #6b8296 38rem, #3d4d5c 44rem, #1a222c 50rem, #05060a 58rem, #05060a 100%)",
                }}
              />
              <div className="gpu absolute top-[22rem] left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,194,220,0.28),rgba(168,194,220,0)_70%)] blur-3xl" />
              <div className="gpu absolute top-[42%] left-[4%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.1),rgba(10,132,255,0)_68%)] blur-3xl" />
              <div className="gpu absolute top-[54%] right-[-12%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(90,200,250,0.07),rgba(90,200,250,0)_68%)] blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 sm:pt-36 sm:pb-32">
              <Reveal className="text-center">
                <SectionLabel tone="dark">{copy.home.proofLabel}</SectionLabel>
                <h2 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  {copy.home.proofTitle}
                  <br />
                  <span className="text-white/70">{copy.home.proofTitleAccent}</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-white/70">
                  {copy.home.proofBody}
                </p>
              </Reveal>

              <Reveal delay={0.12} className="mt-16">
                <OperatingSystem />
              </Reveal>

              <Reveal delay={0.08} className="mt-16 text-center sm:mt-20">
                <h3 className="mx-auto max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  {copy.home.standardTitle}:{" "}
                  <span className="text-white/45">{copy.home.standardAccent}</span>
                </h3>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <div className="gpu overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl">
                  <div className="grid grid-cols-1 border-b border-white/[0.08] sm:grid-cols-2">
                    <p className="px-5 py-5 text-[13px] tracking-[-0.01em] text-white/40 sm:px-8 sm:py-6">
                      {copy.home.leakLabel}
                    </p>
                    <p className="hidden border-white/[0.06] px-5 py-5 text-[13px] tracking-[-0.01em] text-white/40 sm:block sm:border-l sm:px-8 sm:py-6">
                      {copy.home.systemLabel}
                    </p>
                  </div>

                  <Stagger className="divide-y divide-white/[0.06]" step={0.06}>
                    {copy.home.beforeAfter.map((row) => (
                      <StaggerItem key={row.leak}>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                          <p className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-3 px-5 py-4 text-[14px] leading-6 text-white/40 sm:min-h-[3.5rem] sm:px-8">
                            <CrossIcon className="size-3.5 shrink-0 text-white/25" />
                            <span>{row.leak}</span>
                          </p>
                          <p className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-3 border-white/[0.06] px-5 py-4 text-[14px] leading-6 font-medium text-white sm:min-h-[3.5rem] sm:border-l sm:px-8">
                            <CheckIcon className="size-3.5 shrink-0 text-[#5AC8FA]" />
                            <span>{row.system}</span>
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
                    className="gpu group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 text-[15px] font-medium text-white backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.03] hover:border-white/30 hover:bg-white/10"
                  >
                    {copy.home.proofCta}
                    <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <SiteFooter bookingUrl={BOOKING_URL} tone="dark" />
      </div>
    </MotionRoot>
  );
}

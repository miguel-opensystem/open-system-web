"use client";

import { BookingForm } from "../_components/booking-form";
import { SectionLabel, glassCard } from "../_components/chrome";
import { Reveal, Stagger, StaggerItem } from "../_components/motion";
import { PageShell } from "../_components/page-shell";
import { useCopy } from "../_i18n/provider";

export function BookView() {
  const copy = useCopy();

  return (
    <PageShell bookingUrl="/book">
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <Reveal>
          <SectionLabel>{copy.book.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-3xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            {copy.book.title}
            <span className="text-[#86868B]"> {copy.book.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.book.body}
          </p>
        </Reveal>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Stagger className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" step={0.1}>
            <StaggerItem>
              <article className={`${glassCard} justify-between p-6 sm:p-10`}>
                <div>
                  <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
                    {copy.book.call}
                  </p>
                  <h2 className="mt-4 text-[22px] leading-8 font-semibold tracking-[-0.025em]">
                    {copy.book.covers}
                  </h2>
                  <ol className="mt-10 space-y-6">
                    {copy.book.beats.map((beat, index) => (
                      <li
                        key={beat.title}
                        className="grid grid-cols-[2.5rem_1fr] gap-4"
                      >
                        <span className="text-[11px] tracking-[0.16em] text-[#86868B] tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[15px] font-medium tracking-[-0.01em]">
                            {beat.title}
                          </p>
                          <p className="mt-1.5 text-[14px] leading-6 text-[#86868B]">
                            {beat.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <p className="mt-12 text-[13px] text-[#86868B]">
                  {copy.book.four}
                </p>
              </article>
            </StaggerItem>

            <StaggerItem>
              <BookingForm />
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </PageShell>
  );
}

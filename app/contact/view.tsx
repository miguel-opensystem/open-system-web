"use client";

import Link from "next/link";
import { SectionLabel, glassCard, primaryButton } from "../_components/chrome";
import { ArrowIcon } from "../_components/icons";
import { Reveal, Stagger, StaggerItem } from "../_components/motion";
import { PageShell } from "../_components/page-shell";
import { useCopy } from "../_i18n/provider";

export function ContactView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-20 text-center sm:px-6 sm:pt-28 sm:pb-24">
        <Reveal>
          <SectionLabel>{copy.contact.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-3xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            {copy.contact.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.contact.body}
          </p>
        </Reveal>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Stagger className="grid gap-4 lg:grid-cols-2" step={0.1}>
            {copy.contact.paths.map((path) => (
              <StaggerItem key={path.title}>
                <article className={`${glassCard} justify-between p-6 sm:p-10`}>
                  <div>
                    <h2 className="text-[22px] font-semibold tracking-[-0.025em]">
                      {path.title}
                    </h2>
                    <p className="mt-4 max-w-md text-[15px] leading-7 text-[#86868B]">
                      {path.body}
                    </p>
                  </div>
                  <Link href={path.href} className={`${primaryButton} mt-10 w-full sm:w-fit`}>
                    {path.cta}
                    <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </PageShell>
  );
}

"use client";

import Link from "next/link";
import { SectionLabel, primaryButton } from "../_components/chrome";
import { FaqList } from "../_components/faq-list";
import { ArrowIcon } from "../_components/icons";
import { Reveal } from "../_components/motion";
import { PageShell } from "../_components/page-shell";
import { useCopy } from "../_i18n/provider";

export function FaqView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <Reveal>
          <SectionLabel>{copy.faq.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-3xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            {copy.faq.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.faq.body}
          </p>
        </Reveal>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <FaqList items={copy.faq.items} />
          </Reveal>
        </div>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {copy.faq.wrongDoor}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-[#86868B]">
              {copy.faq.wrongBody}
            </p>
            <Link href="/book" className={`${primaryButton} mt-8 w-full sm:w-auto`}>
              {copy.faq.bookCta}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

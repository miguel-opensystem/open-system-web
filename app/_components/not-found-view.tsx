"use client";

import Link from "next/link";
import { useCopy } from "../_i18n/provider";
import { SectionLabel, ghostButton, primaryButton } from "./chrome";
import { ArrowIcon } from "./icons";
import { Reveal } from "./motion";
import { PageShell } from "./page-shell";

export function NotFoundView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-6xl flex-col justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:min-h-[calc(100dvh-4.25rem)]">
        <Reveal>
          <SectionLabel>{copy.notFound.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-3xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
            {copy.notFound.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.notFound.body}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className={`${primaryButton} w-full sm:w-auto`}>
              {copy.notFound.home}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
            <Link href="/book" className={`${ghostButton} w-full sm:w-auto`}>
              {copy.notFound.book}
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}

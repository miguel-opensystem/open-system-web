"use client";

import Link from "next/link";
import { useCopy } from "../_i18n/provider";
import { ghostButton } from "./chrome";
import { ArrowIcon } from "./icons";
import { Reveal } from "./motion";
import { PageShell } from "./page-shell";

export function NotFoundView() {
  const copy = useCopy();

  return (
    <PageShell>
      <section className="mx-auto flex min-h-[calc(100dvh-8.5rem)] max-w-6xl flex-col justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:min-h-[calc(100dvh-4.25rem)]">
        <Reveal>
          <h1 className="text-[2.05rem] leading-none font-semibold tracking-[-0.045em] sm:text-5xl">
            <span className="block text-[6.5rem] leading-none tracking-[-0.08em] text-[#050505] sm:text-[9.5rem] lg:text-[11rem]">
              {copy.notFound.label}
            </span>
            <span className="mt-6 block leading-[1.08]">{copy.notFound.title}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-md text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.notFound.body}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Link
            href="/"
            className={`group ${ghostButton} mx-auto mt-10 w-full gap-2 sm:w-auto`}
          >
            {copy.notFound.home}
            <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}

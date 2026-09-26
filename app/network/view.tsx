"use client";

import Link from "next/link";
import {
  SectionLabel,
  ghostButton,
  glassCard,
  primaryButton,
} from "../_components/chrome";
import { ArrowIcon, IconTile, LayersIcon, LoopIcon, TargetIcon } from "../_components/icons";
import { Reveal, Stagger, StaggerItem } from "../_components/motion";
import { PageShell } from "../_components/page-shell";
import { useCopy } from "../_i18n/provider";

const APPLICATION_URL = "#";

const offerIcons = [LayersIcon, TargetIcon, LoopIcon];

export function NetworkView() {
  const copy = useCopy();

  return (
    <PageShell bookingUrl={APPLICATION_URL} ctaLabel={copy.nav.applyCta}>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-32 sm:pb-20">
        <Reveal>
          <SectionLabel>{copy.network.label}</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-4xl text-[2.05rem] leading-[1.08] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[4.5rem]">
            {copy.network.title}
            <br />
            <span className="text-[#86868B]">{copy.network.titleAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 tracking-[0.01em] text-pretty text-[#86868B]">
            {copy.network.body}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-11 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={APPLICATION_URL} className={`${primaryButton} w-full sm:w-auto`}>
              {copy.network.apply}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </a>
            <Link href="/#pillars" className={`${ghostButton} w-full sm:w-auto`}>
              {copy.network.seeServices}
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>{copy.network.how}</SectionLabel>
            <h2 className="mt-6 text-4xl leading-[1.08] font-semibold tracking-[-0.04em] sm:text-5xl">
              {copy.network.howTitle}
              <span className="text-[#86868B]"> {copy.network.howAccent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#86868B]">
              {copy.network.howBody}
            </p>
          </Reveal>

          <Stagger className="mt-14" step={0.08}>
            {copy.network.steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <article className="grid gap-2 py-8 sm:grid-cols-[4.5rem_1fr] sm:gap-10">
                  <span className="text-[11px] tracking-[0.16em] text-[#86868B] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[20px] leading-7 font-semibold tracking-[-0.025em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-7 text-[#86868B]">
                      {step.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>{copy.network.leave}</SectionLabel>
            <h2 className="mx-auto mt-6 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] sm:text-5xl">
              {copy.network.leaveTitle}
              <span className="text-[#86868B]"> {copy.network.leaveAccent}</span>
            </h2>
          </Reveal>

          <Stagger className="mt-14 grid gap-4 lg:grid-cols-3" step={0.1}>
            {copy.network.offers.map((offer, index) => {
              const Icon = offerIcons[index];
              return (
                <StaggerItem key={offer.title}>
                  <article className={`${glassCard} p-8 sm:p-10`}>
                    <div className="flex items-center justify-between gap-4">
                      <IconTile>
                        <Icon />
                      </IconTile>
                      <span className="text-[11px] tracking-[0.16em] text-[#86868B]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-10 text-[22px] leading-8 font-semibold tracking-[-0.025em]">
                      {offer.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-7 tracking-[0.01em] text-[#86868B]">
                      {offer.body}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="pb-28 sm:pb-36">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Stagger className="grid gap-4 lg:grid-cols-2" step={0.1}>
            <StaggerItem>
              <article className={`${glassCard} p-8 sm:p-10`}>
                <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
                  {copy.network.forYou}
                </p>
                <ul className="mt-8 space-y-4">
                  {copy.network.forYouItems.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] leading-7 text-[#050505]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className={`${glassCard} p-8 sm:p-10`}>
                <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
                  {copy.network.notForYou}
                </p>
                <ul className="mt-8 space-y-4">
                  {copy.network.notForYouItems.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] leading-7 text-[#86868B]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.1} className="mt-16 text-center">
            <h2 className="mx-auto max-w-2xl text-3xl leading-[1.1] font-semibold tracking-[-0.035em] sm:text-4xl">
              {copy.network.seats}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-[#86868B]">
              {copy.network.seatsBody}
            </p>
            <a href={APPLICATION_URL} className={`${primaryButton} mt-8 w-full sm:w-auto`}>
              {copy.network.apply}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

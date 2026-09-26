"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCopy } from "../_i18n/provider";
import { SectionLabel, inverseButton } from "./chrome";
import { ArrowIcon } from "./icons";
import { LiveDot, Reveal, Stagger, StaggerItem } from "./motion";
import { Silk } from "./silk";

const BOOKING_URL = "/book";
const LOOP = { repeat: Infinity, ease: "easeInOut" } as const;

function useMarkScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() === true;
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      const passed = view - rect.top;
      const total = view + rect.height;
      scrollYProgress.set(Math.min(1, Math.max(0, passed / total)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced, scrollYProgress]);

  return { ref, reduced, scrollYProgress };
}

function useShift(
  progress: MotionValue<number>,
  from: number,
  to: number,
  reduced: boolean,
) {
  const state = useRef({ from, to, reduced });
  state.current = { from, to, reduced };
  return useTransform(progress, (p) => {
    const { from: start, to: end, reduced: still } = state.current;
    if (still) return 0;
    return start + p * (end - start);
  });
}

function useScrollScale(progress: MotionValue<number>, reduced: boolean) {
  const still = useRef(reduced);
  still.current = reduced;
  return useTransform(progress, (p) => {
    if (still.current) return 1;
    const peak = p < 0.5 ? p / 0.5 : 1 - (p - 0.5) / 0.5;
    return 0.9 + peak * 0.1;
  });
}

function LeakMark() {
  const { ref, reduced, scrollYProgress } = useMarkScroll();
  const cardY = useShift(scrollYProgress, 36, -28, reduced);
  const scale = useScrollScale(scrollYProgress, reduced);
  const topY = useShift(scrollYProgress, 22, -26, reduced);
  const midX = useShift(scrollYProgress, -36, 64, reduced);
  const capX = useShift(scrollYProgress, 28, -22, reduced);

  return (
    <div ref={ref}>
      <motion.div style={{ y: cardY, scale }}>
        <Silk tone="blue" className="h-52 sm:h-56">
          <div className="flex h-full flex-col justify-center gap-3 px-6 sm:px-7">
            <motion.div
              className="h-11 rounded-2xl border border-white/30 bg-white/25 backdrop-blur-xl"
              style={{ y: topY }}
              animate={reduced ? undefined : { x: [0, 18, -8, 0], opacity: [0.45, 1, 0.45] }}
              transition={{ ...LOOP, duration: 2.4 }}
            />
            <motion.div
              className="ml-10 h-11 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl"
              style={{ x: midX }}
              animate={reduced ? undefined : { y: [0, 12, -8, 0], opacity: [1, 0.28, 1] }}
              transition={{ ...LOOP, duration: 2.1 }}
            />
            <motion.div
              className="flex h-11 w-[72%] items-center rounded-2xl border border-white/50 bg-white/90 px-4"
              style={{ x: capX }}
              animate={reduced ? undefined : { y: [0, -8, 0] }}
              transition={{ ...LOOP, duration: 2.6 }}
            >
              <motion.span
                className="size-2 rounded-full bg-[#0A84FF]"
                animate={reduced ? undefined : { scale: [1, 2, 1], opacity: [1, 0.4, 1] }}
                transition={{ ...LOOP, duration: 1.4 }}
              />
            </motion.div>
          </div>
        </Silk>
      </motion.div>
    </div>
  );
}

function EngineMark() {
  const { ref, reduced, scrollYProgress } = useMarkScroll();
  const cardY = useShift(scrollYProgress, 18, -18, reduced);
  const scale = useScrollScale(scrollYProgress, reduced);
  const y0 = useShift(scrollYProgress, 34, -28, reduced);
  const y1 = useShift(scrollYProgress, 8, -8, reduced);
  const y2 = useShift(scrollYProgress, -26, 34, reduced);
  const rowY = [y0, y1, y2];

  return (
    <div ref={ref}>
      <motion.div style={{ y: cardY, scale }}>
        <div className="flex h-52 flex-col justify-center gap-2.5 overflow-hidden rounded-3xl border border-black/[0.08] bg-white/80 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:h-56 sm:px-7">
          {[0, 1, 2].map((row) => (
            <motion.div
              key={row}
              className="flex h-11 items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-3.5 shadow-[0_6px_18px_rgba(0,0,0,0.04)]"
              style={{ y: rowY[row] }}
              animate={reduced ? undefined : { x: [0, row === 1 ? -14 : 14, 0] }}
              transition={{ ...LOOP, duration: 2.2, delay: row * 0.18 }}
            >
              <motion.span
                className={`size-2 rounded-full ${
                  row === 2 ? "bg-[#0A84FF]" : "bg-black/15"
                }`}
                animate={reduced ? undefined : { scale: [1, 1.8, 1], opacity: [0.35, 1, 0.35] }}
                transition={{ ...LOOP, duration: 1.25, delay: row * 0.22 }}
              />
              <span className="h-1.5 flex-1 rounded-full bg-black/[0.06]" />
              <motion.span
                className={`h-1.5 origin-left rounded-full ${
                  row === 2 ? "w-10 bg-[#0A84FF]/25" : "w-6 bg-black/[0.06]"
                }`}
                animate={
                  reduced ? undefined : { scaleX: [0.15, 1, 0.15], opacity: [0.3, 1, 0.3] }
                }
                transition={{ ...LOOP, duration: 1.45, delay: row * 0.28 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function WatchMark() {
  const { ref, reduced, scrollYProgress } = useMarkScroll();
  const cardY = useShift(scrollYProgress, 32, -40, reduced);
  const scale = useScrollScale(scrollYProgress, reduced);
  const spin = useShift(scrollYProgress, -18, 18, reduced);

  return (
    <div ref={ref}>
      <motion.div style={{ y: cardY, scale }}>
        <div className="relative flex h-52 items-center overflow-hidden rounded-3xl border border-white/10 bg-[#050505] px-6 sm:h-56 sm:px-7">
          <div
            className="os-pulse-glow pointer-events-none absolute -top-16 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.5),transparent_65%)] blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-5">
            <motion.span className="relative grid size-[4.5rem] place-items-center" style={{ rotate: spin }}>
              <motion.span
                className="absolute inset-0 rounded-full border border-[#0A84FF]/40"
                animate={reduced ? undefined : { scale: [0.35, 1.75], opacity: [0.85, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-[#0A84FF]/30"
                animate={reduced ? undefined : { scale: [1, 1.5, 1], opacity: [0.25, 1, 0.25] }}
                transition={{ ...LOOP, duration: 1.8 }}
              />
              <motion.span
                className="absolute inset-2.5 rounded-full border border-[#5AC8FA]/50"
                animate={reduced ? undefined : { scale: [1, 1.28, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ ...LOOP, duration: 1.8, delay: 0.35 }}
              />
              <LiveDot />
            </motion.span>
            <div className="space-y-3">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-2.5">
                  <motion.span
                    className={`size-1.5 rounded-full ${
                      row === 0 ? "bg-[#0A84FF]" : "bg-white/25"
                    }`}
                    animate={reduced ? undefined : { scale: [1, 1.7, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ ...LOOP, duration: 1.2, delay: row * 0.18 }}
                  />
                  <motion.span
                    className={`h-1.5 origin-left rounded-full bg-white/12 ${
                      row === 0 ? "w-28" : row === 1 ? "w-20" : "w-16"
                    }`}
                    animate={
                      reduced ? undefined : { scaleX: [0.12, 1, 0.12], opacity: [0.25, 1, 0.25] }
                    }
                    transition={{ ...LOOP, duration: 1.35, delay: row * 0.2 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const marks = [LeakMark, EngineMark, WatchMark];

export function Partnership() {
  const copy = useCopy();
  const items = copy.home.partnerBento.slice(0, 3);
  const close = copy.home.partnerBento[3];

  return (
    <section
      id="partnership"
      className="w-full max-w-full overflow-x-clip py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <SectionLabel>{copy.home.partnerLabel}</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-[#050505] sm:text-5xl">
            {copy.home.partnerP1}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-pretty text-[#86868B]">
            {copy.home.partnerP2}
          </p>
        </Reveal>

        <Stagger
          className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-3 lg:gap-6"
          step={0.08}
        >
          {items.map((item, index) => {
            const Mark = marks[index];
            return (
              <StaggerItem key={item.title}>
                <article className="flex h-full flex-col">
                  {Mark ? <Mark /> : null}
                  <h3 className="mt-6 text-[15px] tracking-[-0.01em] text-[#86868B]">
                    {item.title}
                  </h3>
                  {item.pain ? (
                    <p className="mt-3 text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-[#050505] sm:text-[2.05rem]">
                      {item.pain}
                    </p>
                  ) : null}
                  <p className="mt-4 text-[17px] leading-8 text-pretty text-[#86868B]">
                    {item.body}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.08} className="mt-16 sm:mt-20">
          <div className="gpu relative w-full max-w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] text-white shadow-[0_50px_140px_-40px_rgba(0,0,0,0.8)]">
            <div
              className="h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
              aria-hidden="true"
            />
            <div
              className="gpu os-pulse-glow pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(10,132,255,0.55),transparent_65%)] blur-2xl"
              aria-hidden="true"
            />
            <div
              className="gpu os-pulse-glow-alt pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(90,200,250,0.3),transparent_65%)] blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid items-start gap-8 px-6 py-10 sm:gap-12 sm:px-12 sm:py-14 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-16">
              <h3 className="text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-white sm:text-[2.5rem] lg:col-span-5 lg:leading-[1.08]">
                {copy.home.partnerTitle}
              </h3>
              <div className="lg:col-span-7 lg:pt-2">
                <p className="text-[16px] leading-8 tracking-[0.01em] text-pretty text-white/60 sm:text-[17px] sm:leading-9">
                  {close.body}
                </p>
                <Link
                  href={BOOKING_URL}
                  className={`${inverseButton} mt-8 w-full sm:w-auto`}
                >
                  {copy.home.partnerCta}
                  <ArrowIcon className="size-4 text-[#050505] transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

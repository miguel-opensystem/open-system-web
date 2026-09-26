"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCopy } from "../_i18n/provider";
import { SectionLabel } from "./chrome";
import { Counter, Reveal, Stagger, StaggerItem } from "./motion";

function MarketMarquee({ items }: { items: readonly string[] }) {
  const reduced = useReducedMotion();
  const row = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="gpu flex w-max gap-2.5 pr-2.5"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shrink-0 rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-3.5 py-1 text-[13px] whitespace-nowrap text-[#86868B] backdrop-blur-xl"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function GlobalScale() {
  const copy = useCopy();

  return (
    <section
      id="scale"
      className="relative w-full max-w-full overflow-x-clip py-8 sm:py-12"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <SectionLabel>{copy.home.scaleLabel}</SectionLabel>
          <h2 className="mx-auto mt-5 max-w-3xl text-[1.5rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-[#050505] sm:text-4xl">
            {copy.home.scaleTitle}{" "}
            <span className="text-[#86868B]">{copy.home.scaleTitleAccent}</span>
          </h2>
        </Reveal>

        <Stagger
          className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:mt-10 lg:grid-cols-4 lg:gap-8"
          step={0.08}
        >
          {copy.home.scaleStats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <article className="text-center">
                <p className="text-[2rem] leading-none font-semibold tracking-[-0.06em] text-[#050505] tabular-nums sm:text-[2.35rem]">
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={0.35 + index * 0.12}
                  />
                </p>
                <p className="mt-2.5 text-[13px] tracking-[-0.01em] text-[#86868B]">
                  {stat.label}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <MarketMarquee items={copy.home.scaleMarkets} />
        </Reveal>
      </div>
    </section>
  );
}

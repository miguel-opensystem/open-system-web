"use client";

import { useCopy } from "../_i18n/provider";
import { Stagger, StaggerItem } from "./motion";

const pillarIds = [
  "intelligence",
  "monetization",
  "operations",
  "retention",
] as const;

export function ServicePillars() {
  const copy = useCopy();
  const pillars = pillarIds.map((id, index) => ({
    id,
    ...copy.home.pillars[index],
  }));

  return (
    <Stagger
      className="mt-14 grid gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-14"
      step={0.08}
    >
      {pillars.map((pillar) => (
        <StaggerItem key={pillar.id}>
          <article id={pillar.id} className="text-center lg:text-left">
            <h3 className="text-[15px] tracking-[-0.01em] text-[#86868B]">
              {pillar.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.04em] text-balance text-[#050505] sm:text-[2.05rem] lg:mx-0">
              {pillar.summary}
            </p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {pillar.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="rounded-full border border-[color:var(--chip-border)] bg-[var(--chip)] px-3.5 py-1.5 text-[13px] text-[var(--fg)] backdrop-blur-xl"
                >
                  {deliverable}
                </li>
              ))}
            </ul>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

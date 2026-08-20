"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { useCopy } from "../_i18n/provider";
import { glassCard } from "./chrome";
import { IconTile, pillarIcons, type PillarName } from "./icons";
import { ServiceSystems } from "./service-systems";

const EASE = [0.16, 1, 0.3, 1] as const;

const pillarLayout: {
  id: string;
  pillar: PillarName;
}[] = [
  { id: "intelligence", pillar: "Backend" },
  { id: "monetization", pillar: "Strategy" },
  { id: "operations", pillar: "Retention" },
  { id: "retention", pillar: "Amplifier" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ServicePillars() {
  const copy = useCopy();
  const reduced = useReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState<number[]>([]);

  const pillars = pillarLayout.map((layout, index) => ({
    ...layout,
    ...copy.home.pillars[index],
  }));

  return (
    <div className="mt-16 space-y-4 sm:space-y-5">
      {pillars.map((pillar, index) => {
        const Icon = pillarIcons[pillar.pillar];
        const isOpen = open.includes(index);
        const regionId = `${panelId}-${pillar.id}`;

        return (
          <motion.div
            key={pillar.id}
            id={pillar.id}
            className="scroll-mt-40 lg:scroll-mt-24"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "0px 0px -64px 0px" }}
            transition={{
              duration: 0.75,
              delay: reduced ? 0 : index * 0.08,
              ease: EASE,
            }}
          >
            <article
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={regionId}
              onClick={() =>
                setOpen((current) =>
                  isOpen
                    ? current.filter((item) => item !== index)
                    : [...current, index],
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setOpen((current) =>
                    isOpen
                      ? current.filter((item) => item !== index)
                      : [...current, index],
                  );
                }
              }}
              className={`${glassCard} cursor-pointer p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]/35 sm:p-12 lg:p-14 ${
                isOpen ? "border-[color:var(--fg)]/15 shadow-xl" : ""
              }`}
            >
              <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <IconTile size="lg">
                      <Icon />
                    </IconTile>
                    <span className="text-[11px] tracking-[0.16em] text-[var(--muted)] uppercase">
                      {copy.home.serviceKicker}
                    </span>
                  </div>
                  <h3 className="mt-8 text-[1.65rem] leading-[1.12] font-semibold tracking-[-0.04em] sm:text-[2.6rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-[16px] leading-8 tracking-[0.01em] text-[var(--muted)]">
                    {pillar.summary}
                  </p>
                </div>
                <ul className="mt-10 flex flex-wrap gap-2 lg:mt-0 lg:max-w-sm lg:justify-end">
                  {pillar.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-full border border-[color:var(--chip-border)] bg-[var(--chip)] px-3.5 py-1.5 text-[13px] text-[var(--fg)] backdrop-blur-xl"
                    >
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="mt-10 inline-flex items-center gap-2 text-[13px] text-[var(--muted)]">
                {isOpen ? copy.home.detailsClose : copy.home.detailsOpen}
                <Chevron open={isOpen} />
              </span>
            </article>

            <div
              className={`grid ${
                reduced
                  ? ""
                  : "transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              } ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id={regionId}
                  role="region"
                  aria-label={pillar.title}
                  aria-hidden={!isOpen}
                  inert={!isOpen || undefined}
                  className="pt-4"
                >
                  <ServiceSystems serviceIndex={index} active={isOpen} />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

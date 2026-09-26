"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCopy } from "../_i18n/provider";
import { inverseButton } from "./chrome";
import { ArrowIcon } from "./icons";

const STORAGE_KEY = "os-calc-cta-dismissed-v3";
const DELAY_MS = 1800;
const SCROLL_PX = 160;
const EASE = [0.16, 1, 0.3, 1] as const;

function isCalculatorPath(pathname: string) {
  return pathname === "/calculator" || pathname.startsWith("/calculator/");
}

export function FloatingCalculatorCTA() {
  const copy = useCopy();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isCalculatorPath(pathname)) {
      setOpen(false);
      return;
    }
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const show = () => {
      if (shown || window.sessionStorage.getItem(STORAGE_KEY)) return;
      shown = true;
      setOpen(true);
    };

    const onScroll = () => {
      if (window.scrollY >= SCROLL_PX) show();
    };

    const timer = window.setTimeout(show, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  function dismiss() {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (isCalculatorPath(pathname)) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          role="complementary"
          aria-label={copy.calc.floatTitle}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: reduced ? 0.2 : 0.55, ease: EASE }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex w-[min(calc(100%-2rem),320px)] max-w-[320px] flex-col gap-3 rounded-xl border border-white/20 bg-black p-4 text-white shadow-2xl sm:right-6 sm:bottom-8 sm:p-5"
        >
          <button
            type="button"
            onClick={dismiss}
            className="absolute top-2.5 right-2.5 grid size-8 place-items-center rounded-full text-white/40 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            aria-label={copy.calc.floatDismiss}
          >
            <span className="text-[15px] leading-none" aria-hidden="true">
              ✕
            </span>
          </button>
          <div className="flex items-center gap-2.5 pr-8">
            <span className="relative grid size-2.5 shrink-0 place-items-center">
              <span
                className="gpu os-pulse-glow absolute size-6 rounded-full bg-[#0A84FF]/45 blur-md"
                aria-hidden="true"
              />
              <span
                className="relative size-1.5 rounded-full bg-[#0A84FF] shadow-[0_0_12px_rgba(10,132,255,0.9)]"
                aria-hidden="true"
              />
            </span>
            <p className="text-[16px] leading-5 font-semibold tracking-[-0.03em]">
              {copy.calc.floatTitle}
            </p>
          </div>
          <p className="text-[13px] leading-5 text-white/55">
            {copy.calc.floatBody}
          </p>
          <Link
            href="/calculator"
            className={`${inverseButton} h-11 w-full px-5 text-[14px]`}
          >
            {copy.home.calcCta}
            <ArrowIcon className="size-4 text-[#050505] transition-transform duration-500 ease-out group-hover:translate-x-1" />
          </Link>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

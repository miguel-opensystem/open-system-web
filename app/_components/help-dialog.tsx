"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCopy } from "../_i18n/provider";
import { ArrowIcon } from "./icons";

const EASE = [0.16, 1, 0.3, 1] as const;
const SEEN_KEY = "os-help-seen";

type HelpContextValue = {
  open: () => void;
  close: () => void;
};

const HelpContext = createContext<HelpContextValue | null>(null);

export function useHelp() {
  const value = useContext(HelpContext);
  if (!value) {
    throw new Error("useHelp must be used inside HelpProvider");
  }
  return value;
}

export function HelpTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useHelp();
  return (
    <button
      type="button"
      onClick={open}
      className={`cursor-pointer appearance-none border-0 bg-transparent ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function HelpProvider({ children }: { children: ReactNode }) {
  const copy = useCopy();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (window.sessionStorage.getItem(SEEN_KEY)) return;
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem(SEEN_KEY, "1");
      setVisible(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, close]);

  return (
    <HelpContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.35, ease: EASE }}
          >
            <button
              type="button"
              aria-label={copy.help.close}
              className="gpu absolute inset-0 bg-[#050505]/45 backdrop-blur-md"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative max-h-[min(88dvh,40rem)] w-full max-w-lg overflow-y-auto rounded-[1.75rem] border border-[color:var(--card-border)] bg-[var(--background)] p-6 text-[var(--fg)] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)] sm:rounded-[2rem] sm:p-9"
              initial={reduced ? false : { opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
                    Open System
                  </p>
                  <h2
                    id={titleId}
                    className="mt-3 text-[24px] leading-8 font-semibold tracking-[-0.03em] sm:text-[28px] sm:leading-9"
                  >
                    {copy.help.title}
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={copy.help.closeDialog}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-black/[0.08] bg-white/80 text-[#86868B] transition-all duration-300 hover:scale-[1.04] hover:text-[#050505]"
                >
                  <span className="text-[18px] leading-none">×</span>
                </button>
              </div>

              <ul className="mt-8">
                {copy.help.paths.map((path) => (
                  <li key={path.href}>
                    <Link
                      href={path.href}
                      onClick={close}
                      className="group flex items-center justify-between gap-4 py-5 transition-colors duration-300"
                    >
                      <span className="text-[16px] font-semibold tracking-[-0.015em]">
                        {path.title}
                      </span>
                      <ArrowIcon className="size-4 shrink-0 text-[#86868B] transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:text-[#050505]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </HelpContext.Provider>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCopy } from "../_i18n/provider";
import { Wordmark } from "./chrome";
import { HelpTrigger } from "./help-dialog";
import { ArrowIcon } from "./icons";

const sectionIds = [
  "partnership",
  "pillars",
  "calculator",
  "proof",
] as const;

const navItem =
  "rounded-full px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors duration-300";

export function SiteHeader({
  bookingUrl,
  homeHref = "/",
  showSections = true,
  ctaLabel,
}: {
  bookingUrl: string;
  homeHref?: string;
  showSections?: boolean;
  ctaLabel?: string;
}) {
  const copy = useCopy();
  const resolvedCta = ctaLabel ?? copy.nav.bookCta;
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(112);
  const [active, setActive] = useState("");
  const sections = sectionIds.map((id) => ({
    id,
    label:
      id === "pillars"
        ? copy.nav.services
        : id === "calculator"
          ? copy.nav.calculator
          : id === "proof"
            ? copy.nav.proof
            : copy.nav.partnership,
  }));

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const syncHeight = () => setHeaderHeight(node.offsetHeight);
    syncHeight();

    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showSections) return;

    let offsets: { id: string; top: number }[] = [];

    const measure = () => {
      offsets = sectionIds.flatMap((id) => {
        const node = document.getElementById(id);
        return node ? [{ id: id as string, top: node.offsetTop }] : [];
      });
    };

    const onScroll = () => {
      const marker = window.scrollY + 160;
      setActive(
        offsets.reduce(
          (found, entry) => (entry.top <= marker ? entry.id : found),
          "",
        ),
      );
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [showSections]);

  const links = sections.map((section) => {
    const isActive = showSections && active === section.id;
    return (
      <Link
        key={section.id}
        href={`/#${section.id}`}
        aria-current={isActive ? "true" : undefined}
        className={`${navItem} ${
          isActive
            ? "font-medium text-[var(--fg)]"
            : "text-[var(--muted)] hover:text-[var(--fg)]"
        }`}
      >
        {section.label}
      </Link>
    );
  });

  return (
    <>
    <header
      ref={headerRef}
      className="fixed top-0 right-0 left-0 z-50 w-full max-w-[100vw] overflow-x-clip bg-[var(--background)]/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl"
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href={homeHref} className="relative z-10 min-w-0 shrink-0">
          <Wordmark />
        </Link>

        <nav
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          aria-label="Page sections"
        >
          <div className="gpu flex items-center gap-0.5 rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-1.5 py-1 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
            {links}
          </div>
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/faq"
            className="hidden px-2 text-[13px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] sm:inline"
          >
            {copy.nav.faq}
          </Link>
          <HelpTrigger className="hidden px-2 text-[13px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] sm:inline">
            {copy.nav.help}
          </HelpTrigger>
          <Link
            href={bookingUrl}
            className="group inline-flex min-h-10 shrink-0 touch-manipulation items-center gap-1.5 rounded-full bg-[var(--btn)] px-3.5 py-2 text-[13px] font-medium text-[var(--btn-fg)] transition-all duration-500 ease-out sm:px-4 [@media(hover:hover)]:hover:scale-[1.03] [@media(hover:hover)]:hover:shadow-lg"
          >
            <span className="sm:hidden">
              {resolvedCta === copy.nav.applyCta
                ? copy.nav.apply
                : copy.nav.book}
            </span>
            <span className="hidden sm:inline">{resolvedCta}</span>
            <ArrowIcon className="size-3.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="px-4 pb-3 sm:px-6 lg:hidden">
        <nav
          className="gpu flex items-center gap-0.5 overflow-x-auto rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-1.5 py-1 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Page sections"
        >
          {links}
          <Link href="/faq" className={`${navItem} text-[var(--muted)]`}>
            {copy.nav.faq}
          </Link>
          <HelpTrigger className={`${navItem} text-[var(--muted)]`}>
            {copy.nav.help}
          </HelpTrigger>
        </nav>
      </div>
    </header>
    <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCopy } from "../_i18n/provider";
import { Wordmark } from "./chrome";
import { scrollToEstimate } from "./estimate-scroll";
import { ArrowIcon } from "./icons";

const sectionIds = [
  "partnership",
  "pillars",
  "calculator",
  "performance",
] as const;

const HEADER_GAP = 8;

const navItem =
  "relative z-10 inline-flex min-h-11 shrink-0 touch-manipulation items-center rounded-full px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors duration-300 lg:min-h-0";

function isSectionId(id: string): id is (typeof sectionIds)[number] {
  return sectionIds.includes(id as (typeof sectionIds)[number]);
}

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
  const pathname = usePathname();
  const resolvedCta = ctaLabel ?? copy.nav.bookCta;
  const headerRef = useRef<HTMLElement>(null);
  const headerHeightRef = useRef(112);
  const [headerHeight, setHeaderHeight] = useState(112);
  const [active, setActive] = useState("");
  const sections = sectionIds.map((id) => ({
    id,
    label:
      id === "pillars"
        ? copy.nav.services
        : id === "calculator"
          ? copy.nav.calculator
          : id === "performance"
            ? copy.nav.performance
            : copy.nav.partnership,
  }));

  useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const syncHeight = () => {
      const height = node.offsetHeight;
      headerHeightRef.current = height;
      setHeaderHeight(height);
      document.documentElement.style.setProperty(
        "--header-offset",
        `${height + HEADER_GAP}px`,
      );
    };
    syncHeight();

    const observer = new ResizeObserver(syncHeight);
    observer.observe(node);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-offset");
    };
  }, []);

  useEffect(() => {
    const offset = () => headerHeightRef.current + HEADER_GAP;

    const scrollToId = (id: string, behavior: ScrollBehavior) => {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior });
        setActive("");
        return true;
      }
      if (id === "estimate") {
        return scrollToEstimate(behavior);
      }
      const node = document.getElementById(id);
      if (!node) return false;
      const rect = node.getBoundingClientRect();
      const top = Math.max(0, window.scrollY + rect.top - offset());
      window.scrollTo({ top, behavior });
      if (isSectionId(id)) setActive(id);
      return true;
    };

    const onScroll = () => {
      const marker = offset();
      const current = sectionIds.reduce((found, id) => {
        const node = document.getElementById(id);
        if (!node) return found;
        return node.getBoundingClientRect().top <= marker + 1 ? id : found;
      }, "");
      setActive(current);
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      const match = href.match(/^(?:\/)?#([A-Za-z0-9_-]+)$/);
      if (!match) return;
      const id = match[1];
      if (!scrollToId(id, "smooth")) return;
      event.preventDefault();
      event.stopPropagation();
      window.history.replaceState(
        null,
        "",
        id === "top"
          ? window.location.pathname === "/"
            ? "/"
            : window.location.pathname
          : `${window.location.pathname}#${id}`,
      );
    };

    const onHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) scrollToId(id, "auto");
    };

    onScroll();
    const raf = requestAnimationFrame(onHash);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [showSections]);

  const sectionLinks = (keyPrefix: string) =>
    sections.map((section) => {
      const isPage = section.id === "calculator";
      const isActive = isPage
        ? pathname === "/calculator" || pathname.startsWith("/calculator/")
        : showSections && active === section.id;
      return (
        <Link
          key={`${keyPrefix}-${section.id}`}
          href={isPage ? "/calculator" : `/#${section.id}`}
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
      className="fixed top-0 right-0 left-0 z-50 w-full bg-[var(--background)]/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl"
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href={homeHref} className="relative z-10 min-w-0 shrink-0">
          <Wordmark />
        </Link>

        <nav
          className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          aria-label="Page sections"
        >
          <div className="flex items-center gap-0.5 rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-1.5 py-1 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl">
            {sectionLinks("desktop")}
          </div>
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/about"
            className="hidden px-2 text-[13px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] sm:inline"
          >
            {copy.nav.about}
          </Link>
          <Link
            href="/faq"
            className="hidden px-2 text-[13px] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] sm:inline"
          >
            {copy.nav.faq}
          </Link>
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
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-[color:var(--card-border)] bg-[var(--card)] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl"
          />
          <nav
            className="relative z-10 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Page sections"
          >
            <div className="flex w-max items-center gap-0.5 px-1.5 py-1">
              {sectionLinks("mobile")}
              <Link href="/about" className={`${navItem} text-[var(--muted)]`}>
                {copy.nav.about}
              </Link>
              <Link href="/faq" className={`${navItem} text-[var(--muted)]`}>
                {copy.nav.faq}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <div aria-hidden="true" style={{ height: headerHeight }} />
    </>
  );
}

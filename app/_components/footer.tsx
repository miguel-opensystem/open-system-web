"use client";

import Link from "next/link";
import { useCopy } from "../_i18n/provider";
import { ArrowIcon } from "./icons";
import { Wordmark, inverseButton } from "./chrome";
import { HelpTrigger } from "./help-dialog";

export function SiteFooter({
  bookingUrl,
  tone = "light",
}: {
  bookingUrl: string;
  tone?: "light" | "dark";
}) {
  const copy = useCopy();
  const dark = tone === "dark";
  const columns = [
    {
      title: copy.footer.platform,
      links: [
        { label: copy.nav.partnership, href: "/#partnership" },
        { label: copy.nav.services, href: "/#pillars" },
        { label: copy.nav.calculator, href: "/calculator" },
        { label: copy.nav.performance, href: "/#performance" },
      ],
    },
    {
      title: copy.footer.services,
      links: [
        { label: copy.footer.intelligence, href: "/#intelligence" },
        { label: copy.footer.monetization, href: "/#monetization" },
        { label: copy.footer.operations, href: "/#operations" },
        { label: copy.footer.retention, href: "/#retention" },
        { label: copy.footer.strategyCall, href: "/book" },
      ],
    },
    {
      title: copy.footer.company,
      links: [
        { label: copy.footer.about, href: "/about" },
        { label: copy.footer.faq, href: "/faq" },
        { label: copy.footer.careers, href: "/network" },
        { label: copy.footer.contact, href: "/contact" },
      ],
    },
  ];

  return (
    <footer
      className={
        dark
          ? "relative w-full max-w-full overflow-x-clip pb-[env(safe-area-inset-bottom)]"
          : "relative w-full max-w-full overflow-x-clip bg-[var(--surface)] pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl"
      }
    >
      {dark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[#05060a]"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/">
              <Wordmark
                className={
                  dark
                    ? "[&>span:first-child]:bg-white [&>span:last-child]:text-white"
                    : ""
                }
              />
            </Link>
            <p
              className={`mt-5 max-w-xs text-[14px] leading-6 ${dark ? "text-white/50" : "text-[#86868B]"}`}
            >
              {copy.footer.blurb}
            </p>
            <Link
              href={bookingUrl}
              className={
                dark
                  ? `${inverseButton} mt-7 h-11 w-full px-6 text-[14px] sm:w-auto`
                  : "group mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn)] px-6 text-[14px] font-medium text-[var(--btn-fg)] transition-all duration-500 ease-out sm:w-auto hover:scale-[1.03] hover:shadow-xl"
              }
            >
              {copy.footer.bookCta}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p
                  className={`text-[13px] font-medium tracking-[-0.01em] ${dark ? "text-white/80" : "text-[var(--fg)]"}`}
                >
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={
                          dark
                            ? "text-[13px] leading-5 text-white/45 transition-colors duration-500 hover:text-white"
                            : "text-[13px] leading-5 text-[var(--muted)] transition-colors duration-500 hover:text-[var(--fg)]"
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {column.title === copy.footer.company ? (
                    <li>
                      <HelpTrigger
                        className={
                          dark
                            ? "p-0 text-[13px] leading-5 text-white/45 transition-colors duration-500 hover:text-white"
                            : "p-0 text-[13px] leading-5 text-[var(--muted)] transition-colors duration-500 hover:text-[var(--fg)]"
                        }
                      >
                        {copy.nav.help}
                      </HelpTrigger>
                    </li>
                  ) : null}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-16 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className={`text-[13px] ${dark ? "text-white/40" : "text-[#86868B]"}`}>
            © {new Date().getFullYear()} Open System. {copy.footer.rights}
          </p>
          <span className={`text-[13px] ${dark ? "text-white/40" : "text-[#86868B]"}`}>
            {copy.footer.built}
          </span>
        </div>
      </div>
    </footer>
  );
}

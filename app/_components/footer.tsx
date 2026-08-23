"use client";

import Link from "next/link";
import { useCopy } from "../_i18n/provider";
import { ArrowIcon } from "./icons";
import { Wordmark } from "./chrome";

const socials = [
  {
    label: "X",
    href: "#",
    path: "M18.9 2.5H22l-7 8 8.2 11H16.6l-5-6.6-5.7 6.6H2.8l7.5-8.6L2.4 2.5h6.7l4.5 6 5.3-6Zm-1.1 17.6h1.7L7.3 4.3H5.5l12.3 15.8Z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M5 3.5A2 2 0 1 1 1 3.5a2 2 0 0 1 4 0ZM1.3 8h3.4v13H1.3V8Zm5.6 0h3.3v1.8h.05c.46-.86 1.6-1.8 3.3-1.8 3.5 0 4.15 2.2 4.15 5.1V21h-3.4v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H6.9V8Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.2 7.1a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.6A3 3 0 0 0 .8 7.1 31 31 0 0 0 .3 12a31 31 0 0 0 .5 4.9 3 3 0 0 0 2.1 2.1c1.9.6 9.1.6 9.1.6s7.2 0 9.1-.6a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.8 15.3V8.7l6 3.3-6 3.3Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.4.37 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.4.17-1 .37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.53.2-.9.45-1.3.85-.4.4-.65.77-.85 1.3-.16.4-.35 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.53.45.9.85 1.3.4.4.77.65 1.3.85.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.53-.2.9-.45 1.3-.85.4-.4.65-.77.85-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1a3.5 3.5 0 0 0-.85-1.3 3.5 3.5 0 0 0-1.3-.85c-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-3.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z",
  },
];

export function SiteFooter({ bookingUrl }: { bookingUrl: string }) {
  const copy = useCopy();
  const columns = [
    {
      title: copy.footer.platform,
      links: [
        { label: copy.nav.partnership, href: "/#partnership" },
        { label: copy.nav.services, href: "/#pillars" },
        { label: copy.nav.calculator, href: "/#calculator" },
        { label: copy.nav.proof, href: "/#proof" },
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
    <footer className="gpu relative mt-8 w-full max-w-full overflow-x-hidden border-t border-[color:var(--card-border)] bg-[var(--surface)] pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/">
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-6 text-[#86868B]">
              {copy.footer.blurb}
            </p>
            <Link
              href={bookingUrl}
              className="group mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--btn)] px-6 text-[14px] font-medium text-[var(--btn-fg)] transition-all duration-500 ease-out sm:w-auto hover:scale-[1.03] hover:shadow-xl"
            >
              {copy.footer.bookCta}
              <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
            </Link>
            <div className="mt-8 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="grid size-10 place-items-center rounded-xl border border-[color:var(--card-border)] bg-[var(--card)] text-[var(--muted)] backdrop-blur-xl transition-all duration-500 ease-out hover:scale-[1.06] hover:text-[var(--fg)] hover:shadow-md"
                >
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                    <path d={social.path} fill="currentColor" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-medium tracking-[0.14em] text-[var(--fg)] uppercase">
                  {column.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] leading-5 text-[var(--muted)] transition-colors duration-500 hover:text-[var(--fg)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-black/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[#86868B]">
            © {new Date().getFullYear()} Open System. {copy.footer.rights}
          </p>
          <span className="text-[13px] text-[#86868B]">
            {copy.footer.built}
          </span>
        </div>
      </div>
    </footer>
  );
}

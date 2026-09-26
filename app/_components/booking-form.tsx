"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCopy } from "../_i18n/provider";
import { glassCard } from "./chrome";
import { ArrowIcon } from "./icons";

const FORMSPREE_URL = "https://formspree.io/f/xgawlzkl";
const CAL_LINK = "m-opensystem/infrastructure-strategy-call";
const EASE = [0.16, 1, 0.3, 1] as const;

const deliveryIds = [
  "Nothing yet",
  "Low-ticket products",
  "A course",
  "1:1 coaching",
  "A membership",
] as const;

const audienceIds = [
  "Under 50K",
  "50K – 150K",
  "150K – 500K",
  "500K+",
] as const;

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {htmlFor ? (
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-medium tracking-[-0.01em]"
        >
          {label}
        </label>
      ) : (
        <p className="text-[13px] font-medium tracking-[-0.01em]">{label}</p>
      )}
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-[color:var(--input-border)] bg-[var(--chip)] px-4 py-3 text-[16px] tracking-[-0.01em] outline-none backdrop-blur-xl transition-all duration-300 ease-out placeholder:text-[#C0C0C6] focus:border-black/25 focus:shadow-md sm:text-[15px]";

const chipIdle =
  "border border-[color:var(--input-border)] bg-[var(--chip)] text-[var(--muted)] backdrop-blur-xl [@media(hover:hover)]:hover:scale-[1.03] [@media(hover:hover)]:hover:text-[var(--fg)] [@media(hover:hover)]:hover:shadow-md";

export function BookingForm() {
  const copy = useCopy();
  const router = useRouter();
  const [isCalendarView, setIsCalendarView] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<(typeof audienceIds)[number] | "">(
    "",
  );
  const [delivery, setDelivery] = useState<(typeof deliveryIds)[number] | "">(
    "",
  );
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!isCalendarView) return;
    let cancelled = false;

    void getCalApi().then((cal) => {
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      const goThanks = () => {
        router.push("/book/thanks");
      };
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: goThanks,
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: goThanks,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isCalendarView, router]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !audience || !delivery || submitting) {
      return;
    }

    setSubmitting(true);

    void fetch(FORMSPREE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        audience,
        delivery,
        note: note.trim(),
      }),
    });

    setIsCalendarView(true);
  }

  const cardClass = isCalendarView
    ? "gpu relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:p-10"
    : `${glassCard} p-8 sm:p-10`;

  return (
    <article className={cardClass}>
      <AnimatePresence mode="wait" initial={false}>
        {!isCalendarView ? (
          <motion.div
            key="intake"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
              {copy.book.request}
            </p>
            <h2 className="mt-4 text-[22px] leading-8 font-semibold tracking-[-0.025em]">
              {copy.book.tellUs}
            </h2>
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
              <Field label={copy.book.name} htmlFor="book-name">
                <input
                  id="book-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
                  placeholder={copy.book.namePlaceholder}
                />
              </Field>

              <Field label={copy.book.email} htmlFor="book-email">
                <input
                  id="book-email"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  placeholder="you@studio.com"
                />
              </Field>

              <Field label={copy.book.audience}>
                <div className="flex flex-wrap gap-2">
                  {audienceIds.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={audience === option}
                      onClick={() => setAudience(option)}
                      className={`rounded-full px-4 py-2 text-[13px] transition-all duration-300 ease-out ${
                        audience === option
                          ? "bg-[#050505] text-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
                          : chipIdle
                      }`}
                    >
                      {copy.book.audienceOpts[index]}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={copy.book.sell}>
                <div className="flex flex-wrap gap-2">
                  {deliveryIds.map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={delivery === option}
                      onClick={() => setDelivery(option)}
                      className={`rounded-full px-4 py-2 text-[13px] transition-all duration-300 ease-out ${
                        delivery === option
                          ? "bg-[#050505] text-white shadow-[0_6px_20px_-8px_rgba(0,0,0,0.6)]"
                          : chipIdle
                      }`}
                    >
                      {copy.book.deliveryOpts[index]}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label={copy.book.note} htmlFor="book-note">
                <textarea
                  id="book-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder={copy.book.optional}
                />
              </Field>

              <button
                type="submit"
                disabled={
                  !name.trim() ||
                  !email.trim() ||
                  !audience ||
                  !delivery ||
                  submitting
                }
                className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#050505] px-7 text-[15px] font-medium text-white transition-all duration-500 ease-out [@media(hover:hover)]:hover:scale-[1.01] [@media(hover:hover)]:hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:scale-100 disabled:hover:shadow-none sm:w-fit"
              >
                {submitting ? copy.book.loading : copy.book.submit}
                {!submitting && (
                  <ArrowIcon className="size-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="calendar"
            className="flex min-h-[36rem] flex-col"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="text-[13px] tracking-[-0.01em] text-[#86868B]">
              {copy.book.request}
            </p>
            <h2 className="mt-4 text-[22px] leading-8 font-semibold tracking-[-0.025em]">
              {copy.book.choose}
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#86868B]">
              {copy.book.chooseBody}
            </p>
            <div className="mt-6 h-[36rem] overflow-hidden rounded-2xl bg-white/50 sm:h-[40rem]">
              <Cal
                calLink={CAL_LINK}
                style={{ width: "100%", height: "100%", overflow: "auto" }}
                config={{
                  layout: "month_view",
                  theme: "light",
                  name: name.trim(),
                  email: email.trim(),
                  notes: [audience, delivery, note.trim()]
                    .filter(Boolean)
                    .join(" · "),
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

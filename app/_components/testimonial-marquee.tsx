"use client";

import { motion, useReducedMotion } from "framer-motion";

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  avatar: string;
};

function Card({ item }: { item: Testimonial }) {
  return (
    <figure className="gpu flex w-[300px] shrink-0 flex-col rounded-3xl border border-[color:var(--card-border)] bg-[var(--card)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-2xl sm:w-[340px] sm:p-6">
      <blockquote className="text-[14px] leading-6 tracking-[0.01em] text-[var(--fg)] sm:text-[15px] sm:leading-7">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className={`size-7 shrink-0 rounded-full bg-gradient-to-br ${item.avatar}`}
          aria-hidden="true"
        />
        <span>
          <span className="block text-[13px] font-medium tracking-[-0.01em]">
            {item.name}
          </span>
          <span className="block text-[12px] text-[#86868B]">{item.detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items }: { items: Testimonial[] }) {
  return (
    <div className="flex gap-4 pr-4">
      {items.map((item, index) => (
        <Card key={`${item.name}-${index}`} item={item} />
      ))}
    </div>
  );
}

export function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="flex justify-center gap-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.slice(0, 3).map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <motion.div
        className="gpu flex w-max"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <Row items={items} />
        <div aria-hidden="true">
          <Row items={items} />
        </div>
      </motion.div>
    </div>
  );
}

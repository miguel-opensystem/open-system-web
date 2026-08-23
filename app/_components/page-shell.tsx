import type { ReactNode } from "react";
import { SiteFooter } from "./footer";
import { MeshBackground } from "./mesh-background";
import { MotionRoot } from "./motion";
import { SiteHeader } from "./site-header";

export function PageShell({
  children,
  bookingUrl = "/book",
  ctaLabel,
}: {
  children: ReactNode;
  bookingUrl?: string;
  ctaLabel?: string;
}) {
  return (
    <MotionRoot>
      <div className="relative flex min-h-full max-w-[100vw] flex-1 flex-col font-sans text-[var(--fg)] antialiased">
        <MeshBackground />
        <SiteHeader
          bookingUrl={bookingUrl}
          showSections={false}
          ctaLabel={ctaLabel}
        />
        <main className="max-w-[100vw] flex-1 overflow-x-hidden">{children}</main>
        <SiteFooter bookingUrl="/book" />
      </div>
    </MotionRoot>
  );
}

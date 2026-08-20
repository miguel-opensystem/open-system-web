import type { Metadata } from "next";
import { ThanksView } from "./view";

export const metadata: Metadata = {
  title: "Booking confirmed — Open System",
  description:
    "Thank you for booking. We'll contact you shortly about your strategy call.",
};

export default function ThanksPage() {
  return <ThanksView />;
}

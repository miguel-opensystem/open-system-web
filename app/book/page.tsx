import type { Metadata } from "next";
import { BookView } from "./view";

export const metadata: Metadata = {
  title: "Book a Strategy Call — Open System",
  description:
    "A thirty-minute review of your audience and current setup. Four engagements a quarter.",
};

export default function BookPage() {
  return <BookView />;
}

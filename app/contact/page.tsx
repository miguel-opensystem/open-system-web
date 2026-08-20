import type { Metadata } from "next";
import { ContactView } from "./view";

export const metadata: Metadata = {
  title: "Initiate — Open System",
  description:
    "Submit your public metrics. If the gap is measurable, we map how to capture it.",
};

export default function ContactPage() {
  return <ContactView />;
}

import type { Metadata } from "next";
import { AboutView } from "./view";

export const metadata: Metadata = {
  title: "The Thesis — Open System",
  description:
    "Most creators have attention. Few have the systems to turn it into revenue. Open System builds and runs that backend.",
};

export default function AboutPage() {
  return <AboutView />;
}

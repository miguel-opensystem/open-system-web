import type { Metadata } from "next";
import { AboutView } from "./view";

export const metadata: Metadata = {
  title: "About — Open System",
  description:
    "Open System builds and runs creator revenue infrastructure. Who we are, how the practice started, and the mission behind the operating layer.",
};

export default function AboutPage() {
  return <AboutView />;
}

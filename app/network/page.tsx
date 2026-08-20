import type { Metadata } from "next";
import { NetworkView } from "./view";

export const metadata: Metadata = {
  title: "Operators — Open System",
  description:
    "We work with independent operators, not employees. Submit proof of work.",
  robots: { index: false, follow: false },
};

export default function NetworkPage() {
  return <NetworkView />;
}

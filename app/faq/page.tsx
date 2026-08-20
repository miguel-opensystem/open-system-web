import type { Metadata } from "next";
import { FaqView } from "./view";

export const metadata: Metadata = {
  title: "FAQ — Open System",
  description:
    "Straightforward answers about how we work, who we work with, and what to expect.",
};

export default function FaqPage() {
  return <FaqView />;
}

import type { Metadata } from "next";
import { NotFoundView } from "./_components/not-found-view";
import { en } from "./_i18n/en";

export const metadata: Metadata = {
  title: "404 — Open System",
  description: en.notFound.body,
};

export default function NotFound() {
  return <NotFoundView />;
}

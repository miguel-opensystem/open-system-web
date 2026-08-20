"use client";

import type { ReactNode } from "react";
import { en } from "./en";

export type { Messages } from "./en";
export { en };

export function LocaleProvider({ children }: { children: ReactNode }) {
  return children;
}

export function useCopy() {
  return en;
}

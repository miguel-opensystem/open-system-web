import type { Metadata } from "next";
import { en } from "../_i18n/en";
import { CalculatorView } from "./view";

export const metadata: Metadata = {
  title: en.calc.metaTitle,
  description: en.calc.metaDescription,
};

export default function CalculatorPage() {
  return <CalculatorView />;
}

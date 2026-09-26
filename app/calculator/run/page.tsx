import type { Metadata } from "next";
import { en } from "../../_i18n/en";
import { CalculatorRunView } from "./view";

export const metadata: Metadata = {
  title: en.calc.runMetaTitle,
  description: en.calc.runMetaDescription,
};

export default function CalculatorRunPage() {
  return <CalculatorRunView />;
}

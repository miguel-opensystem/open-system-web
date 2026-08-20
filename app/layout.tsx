import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { HelpProvider } from "./_components/help-dialog";
import { LocaleProvider } from "./_i18n/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open System — Creator Revenue Infrastructure",
  description:
    "The revenue infrastructure behind creator-led businesses. Turning existing attention into compounding enterprise value.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <LocaleProvider>
          <HelpProvider>{children}</HelpProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

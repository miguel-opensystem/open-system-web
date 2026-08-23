import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full max-w-[100vw] overflow-x-clip scroll-smooth antialiased`}
    >
      <body className="flex min-h-full max-w-[100vw] flex-col overflow-x-clip">
        <LocaleProvider>
          <HelpProvider>{children}</HelpProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

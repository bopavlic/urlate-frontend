import type { Metadata } from "next";
import { Big_Shoulders, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Condensed scoreboard type for numbers and titles, as in the app.
const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["800", "900"],
  // next/font has no fallback metrics for this family; system fonts stand in while it loads.
  adjustFontFallback: false,
});

const siteUrl =
  process.env.SITE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://urlate.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ur Late", template: "%s" },
  description: "Who’s been waiting on who? Ur Late keeps score, in minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

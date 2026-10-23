import type { Metadata } from "next";
import { Big_Shoulders, Figtree } from "next/font/google";
import { siteUrl } from "@/src/site/url";
import "./globals.css";

// Friendly, slightly rounded text face: warm next to the condensed scoreboard type.
const figtree = Figtree({
  variable: "--font-figtree",
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

const appStoreId = process.env.APP_STORE_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ur Late: who’s been waiting on who?", template: "%s · Ur Late" },
  description:
    "Ur Late keeps a running score, in minutes, of who kept whom waiting. For friends, siblings, couples and carpools.",
  openGraph: { siteName: "Ur Late", type: "website" },
  // iOS Smart App Banner, once the app is on the App Store (read at build time).
  ...(appStoreId ? { itunes: { appId: appStoreId } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

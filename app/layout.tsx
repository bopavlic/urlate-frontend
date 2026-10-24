import type { Metadata } from "next";
import { Archivo_Black, Inter, Space_Mono } from "next/font/google";
import { siteUrl } from "@/src/site/url";
import "./globals.css";

// Plain, readable text face.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Titles and numbers, as in the app.
const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

// The ticket's printed fields.
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const appStoreId = process.env.APP_STORE_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ur Late: who’s been waiting on who?", template: "%s · Ur Late" },
  description:
    "Ur Late keeps track, in minutes, of who kept whom waiting. For friends, siblings, couples and carpools.",
  openGraph: { siteName: "Ur Late", type: "website" },
  // iOS Smart App Banner, once the app is on the App Store (read at build time).
  ...(appStoreId ? { itunes: { appId: appStoreId } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivoBlack.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip font-sans">{children}</body>
    </html>
  );
}

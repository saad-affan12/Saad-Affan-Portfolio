import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { DataProvider } from "@/components/providers/DataProvider";
import { readAllDataFiles } from "@/lib/data-store";
import type { SEO } from "@/lib/types";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap", preload: true });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: true });
const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/clash-display/ClashDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/clash-display/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
  preload: true,
});

export async function generateMetadata() {
  const allData = await readAllDataFiles();
  const seo = allData.seo as SEO | undefined;

  return {
    metadataBase: new URL("https://saad-affan.vercel.app"),
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
    authors: seo?.author ? [{ name: seo.author }] : undefined,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "Saad Affan",
    },
    icons: {
      apple: [
        { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
        { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
        { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
    },
    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "Saad Affan",
      "application-name": "Saad Affan",
      "msapplication-TileColor": "#6366f1",
      "theme-color": "#6366f1",
    },
    openGraph: {
      title: seo?.ogTitle,
      description: seo?.ogDescription,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle,
      description: seo?.twitterDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await readAllDataFiles();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <DataProvider initialData={initialData}>
            {children}
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

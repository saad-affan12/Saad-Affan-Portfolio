import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { DataProvider } from "@/components/providers/DataProvider";
import { readAllData } from "@/lib/data";

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

const initialData = readAllData();

export const metadata = {
  metadataBase: new URL("https://saad-affan.vercel.app"),
  title: initialData.seo.title,
  description: initialData.seo.description,
  keywords: initialData.seo.keywords,
  authors: [{ name: initialData.seo.author }],
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
    title: initialData.seo.ogTitle,
    description: initialData.seo.ogDescription,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: initialData.seo.twitterTitle,
    description: initialData.seo.twitterDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

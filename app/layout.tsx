import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import TopNavbar from "@/components/layout/TopNavbar";
import Footer from "@/components/layout/Footer";
import BottomDock from "@/components/layout/BottomDock";
import Background from "@/components/sections/Background";
import GradientOrbs from "@/components/backgrounds/GradientOrbs";
import DarkGradientOrbs from "@/components/backgrounds/dark/DarkGradientOrbs";
import PageTransition from "@/components/shared/PageTransition";
import InitialLoader from "@/components/shared/InitialLoader";
import SearchBar from "@/components/shared/SearchBar";
import AddToHomeScreen from "@/components/AddToHomeScreen";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const PremiumCursor = dynamic(() => import("@/components/effects/PremiumCursor"));
const FloatingTriangle = dynamic(() => import("@/components/effects/FloatingTriangle"));

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

export const metadata = {
  metadataBase: new URL("https://saad-portfolio-ashy.vercel.app"),
  title: "Mohammed Saad Affan A | Building Scalable Systems & Intelligent Interfaces",
  description:
    "Full-stack engineer specializing in AI systems, premium frontend experiences, and scalable architectures.",
  keywords: [
    "Mohammed Saad Affan",
    "Full Stack Developer",
    "AI Engineer",
    "Frontend Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Saad Affan A" }],
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
    title: "Mohammed Saad Affan A | Portfolio",
    description: "Building scalable systems and intelligent interfaces.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Saad Affan A | Building Scalable Systems & Intelligent Interfaces",
    description:
      "Full-stack engineer specializing in AI systems, premium frontend experiences, and scalable architectures.",
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
          <GradientOrbs />
          <DarkGradientOrbs />
          <InitialLoader />
          <SmoothScrollProvider>
            <Background />
            <FloatingTriangle />
            <TopNavbar />
            <PremiumCursor />
            <SearchBar />
            <main className="relative z-10">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <BottomDock />
          </SmoothScrollProvider>
          <ServiceWorkerRegistration />
          <AddToHomeScreen />
        </ThemeProvider>
      </body>
    </html>
  );
}

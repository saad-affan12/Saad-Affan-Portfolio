import { Inter } from "next/font/google";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import TopNavbar from "@/components/layout/TopNavbar";
import Footer from "@/components/layout/Footer";
import BottomDock from "@/components/layout/BottomDock";
import Background from "@/components/sections/Background";
import PageTransition from "@/components/shared/PageTransition";
import InitialLoader from "@/components/shared/InitialLoader";
import SearchBar from "@/components/shared/SearchBar";

const PremiumCursor = dynamic(() => import("@/components/effects/PremiumCursor"));
const FloatingTriangle = dynamic(() => import("@/components/effects/FloatingTriangle"));

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

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
  openGraph: {
    title: "Mohammed Saad Affan A | Portfolio",
    description: "Building scalable systems and intelligent interfaces.",
    type: "website",
    locale: "en_US",
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
        className={`${inter.variable} ${clashDisplay.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}

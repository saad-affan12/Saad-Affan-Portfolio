import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import TopNavbar from "@/components/layout/TopNavbar";
import Footer from "@/components/layout/Footer";
import BottomDock from "@/components/layout/BottomDock";
import Background from "@/components/sections/Background";
import PageTransition from "@/components/shared/PageTransition";
import InitialLoader from "@/components/shared/InitialLoader";
import SearchBar from "@/components/shared/SearchBar";
import AIAssistant from "@/components/shared/AIAssistant";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import ClientPremiumCursor from "@/components/effects/ClientPremiumCursor";
import { BackgroundStateProvider } from "@/components/providers/BackgroundStateProvider";
import SectionRevealObserver from "@/components/effects/SectionRevealObserver";

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InitialLoader />
      <BackgroundStateProvider>
        <SectionRevealObserver />
        <SmoothScrollProvider>
          <Background />
          <TopNavbar />
          <ClientPremiumCursor />
          <SearchBar />
          <AIAssistant />
          <main className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <BottomDock />
        </SmoothScrollProvider>
      </BackgroundStateProvider>
      <ServiceWorkerRegistration />
    </>
  );
}

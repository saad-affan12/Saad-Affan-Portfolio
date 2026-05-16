"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type DeviceType = "ios" | "android" | "other";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function AddToHomeScreen() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("other");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
        return;
      }

      const dismissed = localStorage.getItem("pwa-popup-dismissed");
      if (dismissed) {
        const dismissedDate = new Date(dismissed);
        const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSince < 7) return;
      }
    } catch {
      return;
    }

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/.test(ua);
    const isMobile = isIOS || isAndroid || window.innerWidth < 768;

    if (!isMobile) return;

    if (isIOS) {
      setDeviceType("ios");
      const timer = setTimeout(() => setShowPopup(true), 10000);
      return () => clearTimeout(timer);
    }

    if (isAndroid) {
      setDeviceType("android");
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const timer = setTimeout(() => setShowPopup(true), 10000);
      return () => clearTimeout(timer);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deviceType === "android" && deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPopup(false);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPopup(false);
    try {
      localStorage.setItem("pwa-popup-dismissed", new Date().toISOString());
    } catch {
      /* incognito */
    }
  };

  if (!mounted || !showPopup || isInstalled) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <div
        className="fixed inset-0 z-[998] bg-black/20 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Add to Home Screen"
        className={`
          fixed bottom-0 left-0 right-0 z-[999]
          mx-4 mb-6 rounded-2xl p-5
          shadow-2xl border
          transform transition-all duration-500 ease-out
          ${isDark
            ? "bg-zinc-900 border-zinc-700/60 shadow-black/60"
            : "bg-white border-zinc-200 shadow-zinc-200/80"
          }
        `}
        style={{
          animation: "slide-up-popup 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
              <span className="text-white font-bold text-lg">SA</span>
            </div>
            <div>
              <p className={`font-semibold text-sm ${isDark ? "text-white" : "text-zinc-900"}`}>
                Saad Affan
              </p>
              <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                Add to Home Screen
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className={`
              w-7 h-7 rounded-full flex items-center justify-center
              text-lg leading-none transition-colors
              ${isDark
                ? "text-zinc-400 hover:text-white hover:bg-zinc-700"
                : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
              }
            `}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>

        {deviceType === "ios" ? (
          <div className={`text-sm space-y-3 ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
            <p className="font-medium">
              Install this portfolio as an app on your iPhone:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}
                `}>1</span>
                <span>
                  Tap the{" "}
                  <span className="inline-flex items-center gap-1 font-medium">
                    Share
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                    </svg>
                  </span>{" "}
                  button in Safari
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}
                `}>2</span>
                <span>Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                  ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"}
                `}>3</span>
                <span>Tap <strong>&quot;Add&quot;</strong> in the top right corner</span>
              </div>
            </div>
            <div className={`
              mt-3 pt-3 border-t text-xs text-center
              ${isDark ? "border-zinc-700 text-zinc-500" : "border-zinc-100 text-zinc-400"}
            `}>
              ↓ Look for the Share button in your browser toolbar
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className={`text-sm ${isDark ? "text-zinc-300" : "text-zinc-600"}`}>
              Install this portfolio as an app for quick access — works offline too.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleInstall}
                className="
                  flex-1 py-2.5 rounded-xl text-sm font-semibold
                  bg-indigo-500 hover:bg-indigo-600 text-white
                  transition-all duration-200 active:scale-95
                  shadow-lg shadow-indigo-500/30
                "
              >
                Install App
              </button>
              <button
                onClick={handleDismiss}
                className={`
                  px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 active:scale-95 border
                  ${isDark
                    ? "border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }
                `}
              >
                Not now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

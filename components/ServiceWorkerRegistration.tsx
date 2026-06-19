"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Unregister any active service workers
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister().then((success) => {
              if (success) {
                console.log("Service worker unregistered successfully.");
              }
            });
          }
        }).catch((err) => {
          console.error("Error unregistering service worker:", err);
        });
      }

      // Clear any stored Cache Storage
      if ("caches" in window) {
        caches.keys().then((keys) => {
          Promise.all(keys.map((key) => caches.delete(key))).then(() => {
            if (keys.length > 0) {
              console.log("Cleared Cache Storage keys:", keys);
            }
          });
        }).catch((err) => {
          console.error("Error clearing caches:", err);
        });
      }
    }
  }, []);

  return null;
}

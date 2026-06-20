"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function SectionRevealObserver() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Only run intersection observer in dark mode to keep light mode standard
    if (resolvedTheme !== "dark") {
      return;
    }

    const targets = document.querySelectorAll(
      "section, #github, #philosophy, #sponsor, #contact"
    );

    targets.forEach((el) => {
      el.classList.add("reveal-section");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -120px 0px",
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      targets.forEach((el) => {
        observer.unobserve(el);
        el.classList.remove("reveal-section", "active");
      });
    };
  }, [resolvedTheme]);

  return null;
}

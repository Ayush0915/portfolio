"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const darkTints: Record<string, { bg: string; radial: string }> = {
  hero: {
    bg: "#09090d",
    radial: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.22), transparent 70%)",
  },
  about: {
    bg: "#090c1a",
    radial: "radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.28), transparent 70%)",
  },
  journey: {
    bg: "#06121a",
    radial: "radial-gradient(circle at 50% 45%, rgba(14, 165, 233, 0.25), transparent 70%)",
  },
  projects: {
    bg: "#0f091c",
    radial: "radial-gradient(circle at 50% 40%, rgba(168, 85, 247, 0.28), transparent 70%)",
  },
  skills: {
    bg: "#061510",
    radial: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25), transparent 70%)",
  },
  contact: {
    bg: "#150818",
    radial: "radial-gradient(circle at 50% 60%, rgba(244, 63, 94, 0.22), transparent 70%)",
  },
};

const lightTints: Record<string, { bg: string; radial: string }> = {
  hero: {
    bg: "#f8fafc",
    radial: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.12), transparent 70%)",
  },
  about: {
    bg: "#f1f5f9",
    radial: "radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.15), transparent 70%)",
  },
  journey: {
    bg: "#f0f9ff",
    radial: "radial-gradient(circle at 50% 45%, rgba(14, 165, 233, 0.14), transparent 70%)",
  },
  projects: {
    bg: "#faf5ff",
    radial: "radial-gradient(circle at 50% 40%, rgba(168, 85, 247, 0.15), transparent 70%)",
  },
  skills: {
    bg: "#ecfdf5",
    radial: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.14), transparent 70%)",
  },
  contact: {
    bg: "#fff1f2",
    radial: "radial-gradient(circle at 50% 60%, rgba(244, 63, 94, 0.12), transparent 70%)",
  },
};

export function SectionBackgroundTint() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -30% 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return null;
  }

  const tintMap = theme === "light" ? lightTints : darkTints;
  const current = tintMap[activeSection] || tintMap.hero;

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-30 transition-colors duration-1000 ease-out"
      style={{ backgroundColor: current.bg }}
    >
      {/* Ambient Gradient Glow Layer */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out opacity-90"
        style={{ backgroundImage: current.radial }}
      />
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#888888_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
    </div>
  );
}

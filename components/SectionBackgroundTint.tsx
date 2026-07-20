"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const sectionTints: Record<string, { bg: string; radial: string; borderGlow: string }> = {
  hero: {
    bg: "#09090d",
    radial: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.22), transparent 70%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15), transparent 50%)",
    borderGlow: "rgba(99, 102, 241, 0.3)",
  },
  about: {
    bg: "#090c1a",
    radial: "radial-gradient(circle at 50% 40%, rgba(99, 102, 241, 0.28), transparent 70%), radial-gradient(circle at 20% 60%, rgba(79, 70, 229, 0.2), transparent 60%)",
    borderGlow: "rgba(99, 102, 241, 0.4)",
  },
  journey: {
    bg: "#06121a",
    radial: "radial-gradient(circle at 50% 45%, rgba(14, 165, 233, 0.25), transparent 70%), radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.18), transparent 60%)",
    borderGlow: "rgba(14, 165, 233, 0.4)",
  },
  projects: {
    bg: "#0f091c",
    radial: "radial-gradient(circle at 50% 40%, rgba(168, 85, 247, 0.28), transparent 70%), radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.2), transparent 60%)",
    borderGlow: "rgba(168, 85, 247, 0.4)",
  },
  skills: {
    bg: "#061510",
    radial: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25), transparent 70%), radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.18), transparent 60%)",
    borderGlow: "rgba(16, 185, 129, 0.4)",
  },
  contact: {
    bg: "#150818",
    radial: "radial-gradient(circle at 50% 60%, rgba(244, 63, 94, 0.22), transparent 70%), radial-gradient(circle at 20% 40%, rgba(217, 70, 239, 0.18), transparent 60%)",
    borderGlow: "rgba(244, 63, 94, 0.4)",
  },
};

export function SectionBackgroundTint() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const shouldReduceMotion = useReducedMotion();

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

  const current = sectionTints[activeSection] || sectionTints.hero;

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
      {/* Subtle Noise / Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.02]" />
    </div>
  );
}

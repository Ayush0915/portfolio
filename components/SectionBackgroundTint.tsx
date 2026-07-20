"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const sectionTints: Record<string, { bg: string; radial: string }> = {
  hero: {
    bg: "#09090b",
    radial: "radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.08), transparent 70%)",
  },
  about: {
    bg: "#090a12",
    radial: "radial-gradient(circle at 50% 40%, rgba(79, 70, 229, 0.12), transparent 70%)",
  },
  journey: {
    bg: "#080e14",
    radial: "radial-gradient(circle at 50% 50%, rgba(14, 116, 144, 0.1), transparent 70%)",
  },
  projects: {
    bg: "#0c0a14",
    radial: "radial-gradient(circle at 50% 40%, rgba(124, 58, 237, 0.12), transparent 70%)",
  },
  skills: {
    bg: "#08100d",
    radial: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.09), transparent 70%)",
  },
  contact: {
    bg: "#0e0b16",
    radial: "radial-gradient(circle at 50% 60%, rgba(168, 85, 247, 0.1), transparent 70%)",
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
        rootMargin: "-25% 0px -35% 0px",
        threshold: 0.1,
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
      className="fixed inset-0 pointer-events-none -z-40 transition-colors duration-1000 ease-out"
      style={{ backgroundColor: current.bg }}
    >
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out opacity-80"
        style={{ backgroundImage: current.radial }}
      />
    </div>
  );
}

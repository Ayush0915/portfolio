import type { Metadata } from "next";
import SkillsOrbit from "@/components/ui/skills-orbit";
import { currentlyExploring } from "@/lib/data";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills | Ayush Kumar Bhadani",
  description: "Technical skills and active learning path of Ayush Kumar Bhadani across AI/ML, backend, and databases.",
};

export default function SkillsPage() {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-[var(--text-main)]">Technical Skills</h1>
        <p className="mb-8 text-[var(--text-muted)]">Mastered and applied technical domains across AI/ML engineering, multi-agent systems, and data pipelines.</p>
        <SkillsOrbit />
      </div>

      {/* Currently Exploring Section */}
      <div className="border-t border-[var(--border-color)] pt-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-[var(--accent-primary)]">
            <Compass size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-main)]">Currently Exploring</h2>
            <p className="text-xs text-[var(--text-muted)]">Technologies I am actively reading and prototype testing.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {currentlyExploring.map((item) => (
            <div 
              key={item.topic} 
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 backdrop-blur-sm transition-all hover:border-[var(--accent-primary)] shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[var(--text-main)]">{item.topic}</h3>
                <span 
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-indigo-500/10 text-[var(--accent-primary)] border border-indigo-500/20"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

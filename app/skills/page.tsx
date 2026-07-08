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
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Skills</h1>
        <p className="mb-8 text-zinc-500">Mastered and applied technical domains.</p>
        <SkillsOrbit />
      </div>

      {/* Currently Exploring Section */}
      <div className="border-t border-zinc-800/80 pt-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Compass size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Currently Exploring</h2>
            <p className="text-xs text-zinc-500">Technologies I am actively reading and prototype testing.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {currentlyExploring.map((item) => (
            <div 
              key={item.topic} 
              className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/20"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-zinc-200">{item.topic}</h3>
                <span 
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                    item.status === "Active" 
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                      : "bg-zinc-800 text-zinc-500 border border-zinc-700/50"
                  }`}
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

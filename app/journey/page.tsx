import type { Metadata } from "next";
import JourneyTimeline from "@/components/JourneyTimeline";
import { achievements } from "@/lib/data";
import { Trophy, GraduationCap, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Journey | Ayush Kumar Bhadani",
  description: "Experience, education, achievements, and leadership journey of Ayush Kumar Bhadani.",
};

export default function JourneyPage() {
  return (
    <div className="space-y-14">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Journey</h1>
        <p className="mb-8 text-zinc-500">Timeline of education, technical experience, and community leadership.</p>
        <JourneyTimeline />
      </div>

      {/* Achievements & Activities Section */}
      <div className="border-t border-zinc-800/80 pt-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Trophy size={18} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">Achievements & Activities</h2>
            <p className="text-xs text-zinc-500">Milestones, awards, and key responsibilities outside the classroom.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((ach) => {
            let Icon = Sparkles;
            let iconColor = "text-teal-400 bg-teal-500/10";
            if (ach.category === "academic") {
              Icon = GraduationCap;
              iconColor = "text-indigo-400 bg-indigo-500/10";
            } else if (ach.category === "leadership") {
              Icon = Users;
              iconColor = "text-sky-400 bg-sky-500/10";
            } else if (ach.category === "award") {
              Icon = Trophy;
              iconColor = "text-amber-400 bg-amber-500/10";
            }

            return (
              <div 
                key={ach.title} 
                className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all hover:border-indigo-500/20"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconColor}`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                    {ach.period}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-zinc-200 mb-2 leading-tight">{ach.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{ach.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

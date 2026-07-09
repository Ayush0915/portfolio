"use client";

import Image from "next/image";
import { skillGroups } from "@/lib/data";

// ─── CDN icon URLs for real-product logos only ──────────────────────────────
const ICONS: Record<string, string> = {
  Python:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "C++":        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  SQL:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  FastAPI:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  MongoDB:      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  MySQL:        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  DuckDB:       "https://cdn.simpleicons.org/duckdb/FFF000",
  Git:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  GitHub:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  Pandas:       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  NumPy:        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  Plotly:       "https://cdn.simpleicons.org/plotly/3F4F75",
  "Power BI":   "https://cdn.simpleicons.org/powerbi/F2C811",
};

export default function SkillsOrbit() {
  return (
    <div className="space-y-8">
      {skillGroups.map((group, groupIndex) => (
        <div key={group.category}>
          {/* Section Header */}
          <h2
            className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-indigo-400"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {group.category}
          </h2>

          {/* Badges container */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 py-2">
            {group.skills.map((skill) => {
              const hasIcon = !!ICONS[skill];

              if (hasIcon) {
                return (
                  <div
                    key={skill}
                    className="flex flex-col items-center gap-2 cursor-default group w-[72px]"
                  >
                    {/* Circular Logo Badge */}
                    <div className="w-12 h-12 rounded-full bg-zinc-950 border border-zinc-855 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500/60 group-hover:shadow-indigo-500/10 group-hover:shadow-lg p-2.5">
                      <Image
                        src={ICONS[skill]}
                        alt={skill}
                        width={28}
                        height={28}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Skill Name Label */}
                    <span className="text-[10px] font-medium text-zinc-400 text-center leading-tight max-w-[80px] group-hover:text-zinc-200 transition-colors">
                      {skill}
                    </span>
                  </div>
                );
              }

              // Text-chip Badge for concepts/techniques without a logo
              return (
                <div
                  key={skill}
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/30 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900/50 hover:text-indigo-300 hover:shadow-[0_0_12px_rgba(99,102,241,0.08)] cursor-default"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {skill}
                </div>
              );
            })}
          </div>

          {/* Horizontal divider between categories */}
          {groupIndex < skillGroups.length - 1 && (
            <div className="border-t border-zinc-800/50 my-6" />
          )}
        </div>
      ))}
    </div>
  );
}

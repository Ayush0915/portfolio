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

          {/* Uniform Chip/Pill Badges container */}
          <div className="flex flex-wrap items-center gap-3 py-1">
            {group.skills.map((skill) => {
              const iconUrl = ICONS[skill];

              return (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-medium text-zinc-300 transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-800/80 hover:text-zinc-100 hover:shadow-[0_0_14px_rgba(99,102,241,0.2)] cursor-default"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {iconUrl ? (
                    <div className="relative h-4 w-4 shrink-0">
                      <Image
                        src={iconUrl}
                        alt={skill}
                        width={16}
                        height={16}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/80 shadow-[0_0_6px_rgba(129,140,248,0.8)]" />
                  )}
                  <span>{skill}</span>
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

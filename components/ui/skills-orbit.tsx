"use client";

import Image from "next/image";
import { skillGroups } from "@/lib/data";

// ─── CDN icon URLs for real-product logos only ──────────────────────────────
// Only include entries for skills that have an official, recognisable brand
// icon. Conceptual skills (RAG, asyncio, FAISS, SQL, Agile…) are intentionally
// omitted so they render as clean text-only chips — no dot bullet, no icon.
const ICONS: Record<string, string> = {
  Python:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "C++":           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "scikit-learn":  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  FastAPI:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  MongoDB:         "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  MySQL:           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  DuckDB:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/duckdb/duckdb-original.svg",
  Git:             "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  GitHub:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  Pandas:          "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  NumPy:           "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  Plotly:          "https://cdn.simpleicons.org/plotly/3F4F75",
  "Power BI":      "https://cdn.simpleicons.org/powerbi/F2C811",
};

// Skills deliberately excluded from ICONS (no distinct brand logo):
//   SQL         — no single generic logo; Azure SQL icon is wrong/misleading
//   asyncio     — Python stdlib module, no official brand mark
//   FAISS       — Meta research library, no logo
//   RAG, Agentic AI, K-Means, Sentence Transformers, Prompt Engineering,
//   REST APIs, Agile/Scrum, EDA — all conceptual, no brand icon

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
                  className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-chip)] px-4 py-2 text-xs font-medium text-[var(--text-sub)] transition-all duration-300 hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] hover:text-[var(--text-main)] hover:shadow-sm cursor-default"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {iconUrl && (
                    <div className="relative h-4 w-4 shrink-0">
                      <Image
                        src={iconUrl}
                        alt={skill}
                        width={16}
                        height={16}
                        className="h-full w-full object-contain"
                      />
                    </div>
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

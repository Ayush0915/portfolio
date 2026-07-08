"use client";
import { Timeline } from "@/components/ui/timeline";
import { education } from "@/lib/data";
import Image from "next/image";

const institutionInitials: Record<string, string> = {
  "Bangalore Institute of Technology": "BIT",
  "Delhi Public School": "DPS",
  "St. Michael's School": "SMS",
};

function EducationEntry({ edu }: { edu: (typeof education)[0] }) {
  return (
    <div className="mb-2">
      {/* Header: logo OR institution name + degree + meta */}
      <div className="mb-5 flex items-center gap-4">
        {edu.logo ? (
          <div className="flex h-12 w-32 shrink-0 items-center justify-start">
            <Image
              src={edu.logo}
              alt={`${edu.institution} logo`}
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </div>
        ) : (
          <span
            className="text-xl font-black text-zinc-300"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {institutionInitials[edu.institution] ?? edu.institution}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-zinc-100">{edu.institution}</p>
          <p
            className="text-xs text-zinc-500"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {edu.location} · {edu.period}
          </p>
        </div>
      </div>

      {/* Degree + score */}
      <p className="mb-3 text-sm text-zinc-300">
        {edu.degree} <span className="text-indigo-400">· {edu.score}</span>
      </p>

      {/* Highlights */}
      {edu.highlights && edu.highlights.length > 0 && (
        <ul className="space-y-2">
          {edu.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/70" />
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function EducationTimeline() {
  const timelineData = education.map((edu) => {
    const yearMatch = edu.period.match(/\d{4}/);
    return {
      title: yearMatch ? yearMatch[0] : edu.period,
      content: <EducationEntry edu={edu} />,
    };
  });

  return <Timeline data={timelineData} />;
}

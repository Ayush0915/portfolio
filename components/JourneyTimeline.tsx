"use client";

import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface JourneyItem {
  year: string;
  title: string;
  organization: string;
  location: string;
  type: "experience" | "education";
  subtitle?: string;
  bullets?: string[];
  tags?: string[];
}

const journeyItems: JourneyItem[] = [
  {
    year: "2025",
    title: "AI Study Jams Organizer & Mentor",
    organization: "Google Developer Group (GDG) BIT",
    location: "Bangalore, India",
    type: "experience",
    bullets: [
      "Curated learning pathways and ran technical study jams on Artificial Intelligence & Machine Learning for 200+ students.",
      "Conducted interactive labs demonstrating model fine-tuning, prompt engineering, and basic neural network design.",
      "Organized amBITion 2.0 hackathon, leading coordination across logistics, prompt selection, and technical grading.",
    ],
    tags: ["Python", "scikit-learn", "Hugging Face", "Google Colab"],
  },
  {
    year: "2024 – Present",
    title: "Core Technical Member",
    organization: "Google Developer Group (GDG) BIT",
    location: "Bangalore, India",
    type: "experience",
    bullets: [
      "Collaborated in a 5-member core team to architect, build, and deploy the official GDG BIT community platform.",
      "Spearheaded hands-on workshops and regional events, instructing 1000+ attendees in programming fundamentals, Python, and open-source practices.",
      "Mentored 10+ junior students in Data Structures, Algorithms, and Object-Oriented Programming (OOP) concepts.",
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  {
    year: "2023 – 2027",
    title: "B.Tech in Computer Science & Engineering (Data Science)",
    organization: "Bangalore Institute of Technology",
    location: "Bangalore, India",
    type: "education",
    subtitle: "VTU Affiliated University · CGPA: 9.45 / 10",
    bullets: [
      "Focused on statistical analysis, data mining, database management systems, algorithms, operating systems, and neural network models.",
      "Elected as a lead student coordinator for peer developer clubs and campus AI jams.",
    ],
  },
  {
    year: "2022",
    title: "Senior Secondary Education",
    organization: "Delhi Public School",
    location: "Ranchi, India",
    type: "education",
    subtitle: "Science (Physics, Chemistry, Mathematics) · Score: 87.2%",
  },
  {
    year: "2020",
    title: "Secondary Education",
    organization: "St. Michael's School",
    location: "Ranchi, India",
    type: "education",
    subtitle: "Secondary Board Certification · Score: 95.6%",
  },
];

export default function JourneyTimeline() {
  return (
    <div className="relative space-y-6">
      {/* Sleek Left Timeline Line */}
      <div className="absolute left-4 top-3 bottom-3 w-[2px] bg-gradient-to-b from-indigo-500 via-indigo-500/40 to-transparent rounded-full" />

      {journeyItems.map((item, idx) => {
        const Icon = item.type === "experience" ? Briefcase : GraduationCap;
        const iconBg = item.type === "experience" 
          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" 
          : "bg-amber-500/10 text-amber-400 border-amber-500/20";

        return (
          <div key={idx} className="relative pl-10 group">
            {/* Timeline Dot Icon */}
            <div className={`absolute left-1.5 top-5 h-6 w-6 -translate-x-1/2 rounded-full border bg-zinc-950 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${iconBg}`}>
              <Icon size={12} />
            </div>

            {/* Card Content */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-zinc-900/50 shadow-md">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.organization}</p>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span 
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    <Calendar size={12} />
                    {item.year}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
                    <MapPin size={11} />
                    {item.location}
                  </span>
                </div>
              </div>

              {item.subtitle && (
                <div className="mb-3 text-xs font-semibold text-indigo-400/90" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {item.subtitle}
                </div>
              )}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="space-y-1.5 mb-3 text-xs text-zinc-300/90 leading-relaxed">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/80" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="rounded bg-zinc-800/80 border border-zinc-700/50 px-2 py-0.5 text-[11px] text-zinc-300" 
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

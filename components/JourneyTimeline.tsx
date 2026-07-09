"use client";
import { Timeline } from "@/components/ui/timeline";
import { education, experiences } from "@/lib/data";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

export default function JourneyTimeline() {
  // Combine education and experiences, sorted or organized by timeline
  const timelineData = [
    {
      title: "2025",
      content: (
        <div className="space-y-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-100">AI Study Jams Organizer & Mentor</h4>
                  <p className="text-xs text-zinc-400">Google Developer Group (GDG) BIT</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="inline-flex items-center gap-1 text-xs text-indigo-300 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  <Calendar size={12} />
                  2025
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                  <MapPin size={11} />
                  Bangalore, India
                </span>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Curated learning pathways and ran technical study jams on Artificial Intelligence & Machine Learning for 200+ students.
              </li>
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Conducted interactive labs demonstrating model fine-tuning, prompt engineering, and basic neural network design.
              </li>
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Organized amBITion 2.0 hackathon, leading coordination across logistics, prompt selection, and technical grading.
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {["Python", "scikit-learn", "Hugging Face", "Google Colab"].map((tech) => (
                <span key={tech} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="space-y-8">
          {/* Experience GDG Core */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Briefcase size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-100">Core Technical Member</h4>
                  <p className="text-xs text-zinc-400">Google Developer Group (GDG) BIT</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="inline-flex items-center gap-1 text-xs text-indigo-300 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  <Calendar size={12} />
                  2024 – Present
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                  <MapPin size={11} />
                  Bangalore, India
                </span>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Collaborated in a 5-member core team to architect, build, and deploy the official GDG BIT community platform.
              </li>
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Spearheaded hands-on workshops and regional events, instructing 1000+ attendees in programming fundamentals, Python, and open-source practices.
              </li>
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Mentored 10+ junior students in Data Structures, Algorithms, and Object-Oriented Programming (OOP) concepts.
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase"].map((tech) => (
                <span key={tech} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="space-y-8">
          {/* Undergrad */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-100">B.Tech in Computer Science & Engineering (Data Science)</h4>
                  <p className="text-xs text-zinc-400">Bangalore Institute of Technology</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="inline-flex items-center gap-1 text-xs text-indigo-300 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  <Calendar size={12} />
                  2023 – 2027
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                  <MapPin size={11} />
                  Bangalore, India
                </span>
              </div>
            </div>
            <div className="mb-3 text-sm font-semibold text-zinc-300">
              VTU Affiliated University <span className="text-indigo-400">· CGPA: 9.45 / 10</span>
            </div>
            <ul className="space-y-2">
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Focused on statistical analysis, data mining, database management systems, algorithms, operating systems, and neural network models.
              </li>
              <li className="flex gap-2 text-sm text-zinc-400 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                Elected as a lead student coordinator for peer developer clubs and campus AI jams.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="space-y-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-100">Senior Secondary Education</h4>
                  <p className="text-xs text-zinc-400">Delhi Public School</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  <Calendar size={12} />
                  2022
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                  <MapPin size={11} />
                  Ranchi, India
                </span>
              </div>
            </div>
            <div className="text-sm text-zinc-300">
              Science (Physics, Chemistry, Mathematics) <span className="text-indigo-400">· Score: 87.2%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div className="space-y-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-indigo-500/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-zinc-100">Secondary Education</h4>
                  <p className="text-xs text-zinc-400">St. Michael's School</p>
                </div>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="inline-flex items-center gap-1 text-xs text-zinc-500 font-semibold" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  <Calendar size={12} />
                  2020
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
                  <MapPin size={11} />
                  Ranchi, India
                </span>
              </div>
            </div>
            <div className="text-sm text-zinc-300">
              Secondary Board Certification <span className="text-indigo-400">· Score: 95.6%</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={timelineData} />;
}

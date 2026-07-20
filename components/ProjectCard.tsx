import { type Project } from "@/lib/data";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 transition-all hover:border-[var(--accent-primary)] shadow-md">
      <h2 className="mb-3 text-lg font-bold text-[var(--text-main)]">{project.name}</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-[var(--border-color)] bg-[var(--bg-chip)] px-2.5 py-1 text-xs font-medium text-[var(--text-sub)]"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            {tech}
          </span>
        ))}
      </div>
      <ul className="space-y-2">
        {project.bullets.map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm text-[var(--text-muted)] leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import ProjectsRail from "@/components/ProjectsRail";

export const metadata: Metadata = {
  title: "Projects | Ayush Kumar Bhadani",
  description: "AI/ML and full-stack projects built by Ayush Kumar Bhadani — CodeVerdict, AskSQL, Digital Wellbeing Intelligence, and CareerIQ.",
};

export default function ProjectsPage() {
  return <ProjectsRail />;
}



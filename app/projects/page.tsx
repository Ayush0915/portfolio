import type { Metadata } from "next";
import ProjectsRail from "@/components/ProjectsRail";

export const metadata: Metadata = {
  title: "Projects | Ayush Kumar Bhadani",
  description: "AI/ML projects built by Ayush Kumar Bhadani — CodeVerdict, Digital Wellbeing Intelligence, and CareerIQ.",
};

export default function ProjectsPage() {
  return <ProjectsRail />;
}




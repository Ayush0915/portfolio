import type { Metadata } from "next";
import EducationTimeline from "@/components/EducationTimeline";

export const metadata: Metadata = {
  title: "Education | Ayush Kumar Bhadani",
  description: "Academic background of Ayush Kumar Bhadani — Bangalore Institute of Technology and prior schooling.",
};

export default function EducationPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Education</h1>
      <p className="mb-10 text-zinc-500">Academic background, newest first.</p>
      <EducationTimeline />
    </div>
  );
}

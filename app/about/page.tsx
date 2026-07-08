import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About | Ayush Kumar Bhadani",
  description: "Background and bio of Ayush Kumar Bhadani, CS student and AI/ML builder.",
};

export default function AboutPage() {
  return <AboutContent />;
}

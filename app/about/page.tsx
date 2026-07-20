import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "About | Ayush Kumar Bhadani",
  description: "Learn more about Ayush Kumar Bhadani — final-year CS (Data Science) student, background, bio, and FAQs.",
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <AboutContent />
      <FAQSection />
    </div>
  );
}

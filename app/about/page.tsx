import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "About | Ayush Kumar Bhadani",
  description: "Learn more about Ayush Kumar Bhadani — CS student and AI/ML engineer background, bio, and FAQs.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutContent />
      <FAQSection />
    </div>
  );
}

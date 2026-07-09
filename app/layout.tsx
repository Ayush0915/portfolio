import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ayushkr-bhadani.vercel.app"),
  title: "Ayush Kumar Bhadani — Portfolio",
  description: "Final-year CS (Data Science) student building AI/ML systems — multi-agent pipelines, RAG, and applied ML.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ayush Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-zinc-950 text-zinc-100 min-h-screen flex flex-col"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ayush Kumar Bhadani",
              "url": "https://ayushkr-bhadani.vercel.app",
              "sameAs": [
                "https://github.com/Ayush0915",
                "https://www.linkedin.com/in/ayush-kumar-bhadani-78558a21a/"
              ],
              "jobTitle": "AI/ML Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Bangalore Institute of Technology"
              },
              "description": "Final-year CS (Data Science) student building high-performance, production-ready AI/ML systems: multi-agent workflows, optimized RAG pipelines, and applied machine learning."
            })
          }}
        />
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-16 pt-28">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}

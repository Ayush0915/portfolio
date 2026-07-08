import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Ayush Kumar Bhadani — Portfolio",
  description: "Final-year CS (Data Science) student building AI/ML systems — multi-agent pipelines, RAG, and applied ML.",
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

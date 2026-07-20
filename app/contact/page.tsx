import type { Metadata } from "next";
import { contact } from "@/lib/data";
import { Github, Mail, Linkedin, MapPin, FileText } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Ayush Kumar Bhadani",
  description: "Get in touch with Ayush Kumar Bhadani — availability, location, social links, and quick signals contact form.",
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-100">Contact</h1>
        <p className="mb-10 text-zinc-500">
          Let&apos;s build something together. Reach out for opportunities, collaborations, or tech discussions.
        </p>

        {/* Contact Grid */}
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  Active availability for internships and early-career engineer roles.
                </span>
              </div>
              <div className="flex items-center gap-3 border-t border-zinc-800/60 pt-4">
                <MapPin size={16} className="text-indigo-400 shrink-0" />
                <span className="text-xs text-zinc-300">
                  Bangalore, Karnataka, India (open to hybrid, remote, or relocation).
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
                >
                  <Mail size={18} className="shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Email Address</p>
                    <p className="text-xs font-semibold text-zinc-200">{contact.email}</p>
                  </div>
                </a>
              )}

              <Link
                href={contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
              >
                <Github size={18} className="shrink-0 text-indigo-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>GitHub Profile</p>
                  <p className="text-xs font-semibold text-zinc-200">{contact.githubUrl.replace("https://", "")}</p>
                </div>
              </Link>

              {contact.linkedinUrl && (
                <Link
                  href={contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
                >
                  <Linkedin size={18} className="shrink-0 text-indigo-400" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>LinkedIn Network</p>
                    <p className="text-xs font-semibold text-zinc-200">{contact.linkedin}</p>
                  </div>
                </Link>
              )}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 text-zinc-300 transition-all hover:border-indigo-500/50 hover:shadow-[0_0_14px_rgba(99,102,241,0.15)] min-h-[44px]"
              >
                <FileText size={18} className="shrink-0 text-indigo-400" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>Curriculum Vitae</p>
                  <p className="text-xs font-semibold text-zinc-200">Download Résumé PDF</p>
                </div>
              </a>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

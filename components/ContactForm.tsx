"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 md:p-8 backdrop-blur-sm shadow-xl">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles size={16} className="text-[var(--accent-primary)]" />
        <h3 className="text-base font-bold text-[var(--text-main)]">Send a Quick Signal</h3>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                Subject
              </label>
              <input
                type="text"
                placeholder="Collaboration opportunity / Role opening"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition-colors focus:border-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1.5" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                Message *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Tell me about your project or opportunity..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] px-4 py-2.5 text-sm text-[var(--text-main)] placeholder-[var(--text-faint)] outline-none transition-colors focus:border-[var(--accent-primary)] resize-none"
              />
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3"
                >
                  <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-400" />
                  <p className="text-xs leading-relaxed text-red-600 dark:text-red-300">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                ⚡ Usually responds in under 2 hours
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-semibold shadow-md hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer min-h-[44px]"
                style={{ fontFamily: "var(--font-jetbrains-mono)" }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mb-4 text-emerald-500"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h4 className="text-base font-bold text-[var(--text-main)] mb-1">Signal Received Successfully!</h4>
            <p className="text-xs text-[var(--text-muted)] max-w-xs leading-relaxed mb-6">
              Thank you for reaching out. I&apos;ll reply directly to your email — usually within 2 hours.
            </p>
            <button
              onClick={() => { setIsSuccess(false); setError(null); }}
              className="rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] px-4 py-2 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-colors cursor-pointer shadow-sm"
              style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

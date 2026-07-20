"use client";
import { useState } from "react";
import { faqs } from "@/lib/data";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="border-t border-[var(--border-color)] pt-8 mt-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-[var(--accent-primary)]">
          <HelpCircle size={18} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--text-main)]">Frequently Asked Questions</h2>
          <p className="text-xs text-[var(--text-muted)]">Quick answers about my background, mindset, and availability.</p>
        </div>
      </div>

      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={i} 
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] transition-all duration-200 hover:border-[var(--accent-primary)] shadow-sm"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-[var(--text-main)] hover:text-[var(--accent-primary)] cursor-pointer"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-[var(--text-muted)]">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-[var(--border-color)] p-4 text-xs text-[var(--text-muted)] leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

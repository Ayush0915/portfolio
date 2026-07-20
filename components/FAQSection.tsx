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
    <div className="border-t border-zinc-800/60 pt-8 mt-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
          <HelpCircle size={18} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Frequently Asked Questions</h2>
          <p className="text-xs text-zinc-500">Quick answers about my background, mindset, and availability.</p>
        </div>
      </div>

      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div 
              key={i} 
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 transition-colors duration-200 hover:border-zinc-700/80"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left text-sm font-semibold text-zinc-200 hover:text-zinc-100"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-zinc-500">
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
                    <div className="border-t border-zinc-800/60 p-4 text-xs text-zinc-400 leading-relaxed font-sans">
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

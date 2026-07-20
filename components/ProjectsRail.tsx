"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

const ITEMS = projects.map((p) => ({
  title: p.name,
  slug: p.slug,
  meta: p.meta ?? "",
  description: p.bullets[0],
  src: p.imageSrc ?? "",
  href: p.href,
  githubUrl: p.githubUrl,
}));

function getCardLayout(viewportWidth: number) {
  if (viewportWidth < 420) {
    return {
      width: 300,
      height: 169,
      sideOffset: 320,
    };
  }
  if (viewportWidth < 768) {
    return {
      width: 380,
      height: 214,
      sideOffset: 410,
    };
  }
  return {
    width: 480,
    height: 270,
    sideOffset: 520,
  };
}

function subscribeToViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getViewportSnapshot() {
  return window.innerWidth;
}

function getServerViewportSnapshot() {
  return 1024;
}

export default function ProjectsRail() {
  const viewportWidth = useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );
  const layout = getCardLayout(viewportWidth);
  const CARD_W = layout.width;
  const CARD_H = layout.height;
  const SIDE_OFFSET = layout.sideOffset;

  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const lastWheelTime = useRef(0);

  const prev = () => setIndex((i) => (i - 1 + ITEMS.length) % ITEMS.length);
  const next = () => setIndex((i) => (i + 1) % ITEMS.length);

  // signed offset of card i relative to current index, wrapping around
  const getOffset = (i: number) => {
    let d = i - index;
    if (d > ITEMS.length / 2) d -= ITEMS.length;
    if (d < -ITEMS.length / 2) d += ITEMS.length;
    return d;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
  };
  const onWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 700) return;
    // only fire on predominantly horizontal scroll (trackpad swipe)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      lastWheelTime.current = now;
      if (e.deltaX > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  const item = ITEMS[index];

  return (
    <>
      {/* ── Full-viewport background — bleeds through entire page ── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${index}`}
          className="fixed inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1 }}
        >
          {item.src && (
            <Image
              src={item.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover scale-125 blur-[90px] saturate-[1.9] opacity-50"
              aria-hidden
            />
          )}
          {/* dark vignette keeps text readable */}
          <div className="absolute inset-0 bg-zinc-950/60" />
        </motion.div>
      </AnimatePresence>

      {/* ── Carousel — breaks out of max-w-5xl constraint ───────── */}
      <section
        className="relative flex flex-col items-center pt-2 pb-6 select-none"
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          overflow: "hidden",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onWheel={onWheel}
      >
        {/* Cards track */}
        <div
          className="relative w-full"
          style={{ height: CARD_H + 48 }}
        >
          {ITEMS.map((card, i) => {
            const offset = getOffset(i);
            if (Math.abs(offset) > 1) return null;
            const isActive = offset === 0;

            return (
              <motion.div
                key={i}
                className="absolute rounded-[26px] overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: "50%",
                  top: "50%",
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  zIndex: isActive ? 10 : 1,
                  cursor: isActive ? "default" : "pointer",
                }}
                animate={{
                  x: offset * SIDE_OFFSET,
                  scale: isActive ? 1 : 0.82,
                  opacity: isActive ? 1 : 0.36,
                }}
                transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => {
                  if (offset === -1) prev();
                  if (offset === 1) next();
                }}
              >
                {card.src ? (
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-zinc-900 to-zinc-950 flex flex-col justify-between p-8 border border-zinc-800/80 rounded-[26px]">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black tracking-wider text-indigo-500/30">PORTFOLIO</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-indigo-500/85 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-1">{card.meta}</p>
                      <h3 className="text-2xl font-black text-zinc-100 leading-tight">{card.title}</h3>
                    </div>
                  </div>
                )}
                {/* extra dim + soft blur overlay on side cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[2px]" />
                )}
                {/* deep shadow on active card only */}
                {isActive && (
                  <div className="absolute inset-0 shadow-[inset_0_-80px_60px_rgba(0,0,0,0.55)]" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Text + nav ─────────────────────────────────────────── */}

        <div className="mt-8 w-full max-w-xl px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${index}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, delay: 0.08 }}
            >
              {item.meta && (
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent-primary)]" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                  {item.meta}
                </p>
              )}
              <h2 className="mb-3 text-3xl sm:text-[2.4rem] font-black leading-tight text-[var(--text-main)]">
                {item.title}
              </h2>

              <div className="flex flex-col sm:flex-row sm:items-end gap-6">
                <p className="flex-1 text-sm leading-relaxed text-[var(--text-muted)] max-w-xs">
                  {item.description}
                </p>

                <div className="flex flex-col items-start gap-3 flex-shrink-0">
                  {/* Detail + external links */}
                  <div className="flex items-center gap-2">
                    {/* Primary CTA */}
                    <Link
                      href={`/projects/${item.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                    >
                      View Details
                    </Link>
                    {/* Secondary CTAs */}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-all shadow-sm cursor-pointer"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                    {item.href && item.href !== "#" && (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-semibold text-[var(--text-main)] hover:border-[var(--accent-primary)] hover:bg-[var(--bg-chip-hover)] transition-all shadow-sm cursor-pointer"
                        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                  </div>

                  {/* prev / counter / next pill */}
                  <div className="inline-flex items-center rounded-full bg-[var(--bg-surface)] backdrop-blur-sm border border-[var(--border-color)] px-1 py-1">
                    <button
                      onClick={prev}
                      aria-label="Previous project"
                      className="rounded-full p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-chip-hover)] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="px-2 text-center text-sm font-semibold text-[var(--text-main)] tabular-nums" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                      {index + 1} / {ITEMS.length}
                    </span>
                    <button
                      onClick={next}
                      aria-label="Next project"
                      className="rounded-full p-2 text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-chip-hover)] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/journey", label: "Journey" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-5 left-1/2 z-50 w-full -translate-x-1/2 px-4">
      {/* Desktop Navbar */}
      <nav className="hidden md:flex mx-auto max-w-fit items-center gap-1 rounded-full border border-zinc-700/60 bg-zinc-900/80 px-4 py-2 shadow-lg shadow-black/40 backdrop-blur-md">
        <Link
          href="/"
          className={`mr-2 px-3 py-1.5 text-sm font-bold tracking-tight transition-colors min-h-[44px] flex items-center ${
            pathname === "/" ? "text-indigo-400 font-extrabold" : "text-zinc-100 hover:text-indigo-400"
          }`}
        >
          AB
        </Link>

        <div className="mx-1 h-4 w-px bg-zinc-700" />

        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors flex items-center min-h-[44px] ${
                isActive
                  ? "bg-zinc-800 text-zinc-100 font-semibold shadow-sm border border-zinc-700/60"
                  : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="mx-1 h-4 w-px bg-zinc-700" />

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-3.5 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100 flex items-center min-h-[44px]"
        >
          Resume
        </a>

        <div className="mx-1 h-4 w-px bg-zinc-700" />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-amber-400 min-w-[44px] min-h-[44px] flex items-center justify-center ml-1"
          aria-label="Toggle dark/light theme"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </motion.div>
        </button>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden flex items-center justify-between rounded-full border border-zinc-700/60 bg-zinc-900/80 px-4 py-2 shadow-lg shadow-black/40 backdrop-blur-md">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-zinc-100 px-2 py-1 flex items-center min-h-[44px]"
        >
          AB
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-800/60 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle dark/light theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-400" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2.5 transition-colors hover:bg-zinc-800/60 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X className="w-5 h-5 text-zinc-100" />
              ) : (
                <Menu className="w-5 h-5 text-zinc-100" />
              )}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
              style={{ top: "60px", zIndex: 40 }}
            />

            {/* Menu Items */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-4 left-4 md:hidden rounded-2xl border border-zinc-700/60 bg-zinc-900/95 shadow-xl shadow-black/60 backdrop-blur-md overflow-hidden z-50"
            >
              {navLinks.map((link, index) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-5 py-3.5 text-base font-medium transition-colors border-b border-zinc-800/50 min-h-[44px] flex items-center ${
                        isActive
                          ? "bg-zinc-800 text-zinc-100 font-semibold"
                          : "text-zinc-300 hover:bg-zinc-800/80 hover:text-zinc-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.04 }}
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3.5 text-base font-medium text-indigo-400 hover:bg-zinc-800/80 transition-colors min-h-[44px] flex items-center"
                >
                  Resume PDF ↗
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

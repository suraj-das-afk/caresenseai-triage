import React from "react";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

const links = [
  { label: "Home", target: "top" },
  { label: "How it works", target: "learn-more" },
  { label: "Safety", target: "safety" },
  { label: "Triage", target: "triage" },
  { label: "About", target: "about" },
  { label: "FAQ", target: "faq" },
  { label: "Contact", target: "contact" },
];

export const Navbar: React.FC = () => {
  const handleScroll = (target: string) => {
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto mt-4 flex w-[92%] max-w-5xl items-center justify-between rounded-3xl border border-white/15 bg-slate-950/70 px-4 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:px-6 md:py-3"
      >
        {/* Brand */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/80 border border-cyan-400/40">
            <HeartPulse className="h-4 w-4 text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            <span className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-md" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-sm font-semibold text-transparent md:text-base">
              CareSense AI
            </span>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.25em] text-slate-400 md:text-[0.65rem]">
              Neo-Medical Triage
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden items-center gap-3 text-xs font-medium text-slate-200 md:flex md:text-sm">
          {links.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => handleScroll(link.target)}
              className="rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-slate-300 transition-all duration-200 hover:bg-white/10 hover:text-white md:px-3.5 md:text-[0.75rem]"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile: compact CTA */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => handleScroll("triage")}
            className="rounded-full border border-cyan-400/60 bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 px-3 py-1 text-[0.7rem] font-semibold text-white shadow-[0_8px_30px_rgba(34,211,238,0.5)]"
          >
            Start
          </button>
        </div>
      </motion.nav>
    </header>
  );
};
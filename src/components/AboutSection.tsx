import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative z-10 border-t border-white/10 bg-slate-950/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-start md:justify-between md:py-20">
        {/* Left: Title + mission */}
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            About CareSense AI
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Built at the intersection of care, AI, and trust.
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-300 md:text-base">
            CareSense AI is a neo-medical triage companion designed to give
            patients instant clarity while keeping clinicians at the center of
            decision-making. Our goal is not to replace doctors, but to bridge
            the gap between{" "}
            <span className="font-semibold text-cyan-300">
              “I&apos;m worried”
            </span>{" "}
            and{" "}
            <span className="font-semibold text-emerald-300">
              “I know what to do next.”
            </span>
          </p>
          <p className="text-sm leading-relaxed text-slate-400 md:text-base">
            We focus on safety-first AI, transparent recommendations, and
            experiences that feel calm, reassuring, and human — even when
            powered by advanced machine intelligence.
          </p>
        </div>

        {/* Right: Pillars / values */}
        <div className="flex flex-1 flex-col gap-5 md:max-w-sm">
          <div className="glass-card rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.6)]">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">
              Patient-first by design
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
              Every interaction is written in simple, human language. No
              medical jargon, no fear-inducing wording — just clear, calm
              guidance.
            </p>
          </div>

          <div className="glass-card rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-slate-900/70 p-5">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">
              Built with clinicians in mind
            </h3>
            <p className="text-xs leading-relaxed text-slate-200 md:text-sm">
              CareSense AI is designed to complement clinical workflows —
              structuring symptoms, highlighting red flags, and empowering
              faster, more informed consultations.
            </p>
          </div>

          <div className="glass-card rounded-3xl border border-white/15 bg-white/5 p-5">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">
              Privacy & safety at the core
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
              We take data protection seriously. Our roadmap is aligned with
              strict privacy standards and responsible AI best practices so
              users stay in control of their information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
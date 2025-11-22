import React from "react";

export const SafetySection: React.FC = () => {
  return (
    <section
      id="safety"
      className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Clinical Safety & Use
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Designed to support decisions — not replace clinicians.
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            CareSense AI is intended as a{" "}
            <span className="font-semibold text-cyan-300">
              symptom triage support tool
            </span>
            , helping people describe what they&apos;re experiencing and
            understand potential levels of urgency. It does{" "}
            <span className="font-semibold text-emerald-300">
              not provide diagnoses
            </span>{" "}
            and is not a substitute for professional medical advice,
            diagnosis, or treatment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="glass-card rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.6)]">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">
              Risk-oriented triage logic
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
              Prompts users to mention onset, severity, location, and
              associated symptoms, then highlights potential red-flag
              patterns to encourage timely escalation when needed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-slate-900/70 p-6">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">
              Escalation by default when unclear
            </h3>
            <p className="text-xs leading-relaxed text-slate-200 md:text-sm">
              When symptoms are severe, ambiguous, or potentially
              life-threatening, CareSense AI is designed to recommend
              immediate in-person evaluation or emergency services.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl border border-white/15 bg-white/5 p-6">
            <h3 className="mb-2 text-sm font-semibold text-white md:text-base">
              Human oversight required
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
              CareSense AI should always be used under the oversight of
              licensed professionals in clinical workflows, or as an
              informational companion for individuals — never as the sole
              basis for medical decisions.
            </p>
          </div>
        </div>

        {/* Disclaimer strip */}
        <div className="mt-8 rounded-3xl border border-amber-400/40 bg-amber-500/10 px-4 py-4 text-xs text-amber-100 shadow-[0_16px_50px_rgba(0,0,0,0.8)] md:text-sm">
          <p className="font-semibold mb-1">
            Important safety notice
          </p>
          <p className="text-amber-100/90">
            CareSense AI does not provide medical diagnoses or treatment
            plans. Always consult a qualified healthcare professional for
            concerns about your health. In an emergency, contact local
            emergency services immediately.
          </p>
        </div>
      </div>
    </section>
  );
};
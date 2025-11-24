import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, PhoneCall, Siren } from "lucide-react";
import type { TriageResponse } from "@/lib/api";

interface ResultsSectionProps {
  results: TriageResponse | null;
}

export const ResultsSection = ({ results }: ResultsSectionProps) => {
  // No results yet → render nothing
  if (!results) return null;

  const triageLevel = results.triageLevel || "AI analysis";
  const advice =
    results.advice ||
    "No detailed advice was generated. Please describe your symptoms again with more detail if needed.";

  const commonCauses: string[] = Array.isArray(results.commonCauses)
    ? results.commonCauses
    : [];

  const isEmergency =
    triageLevel.toLowerCase().includes("emergency") ||
    triageLevel.toLowerCase().includes("urgent");

  return (
    <section className="relative bg-slate-950 py-16">
      {/* soft glow backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-40 left-10 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
            CareSense AI · Triage Outcome
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Your AI-Structured Triage Result
          </h2>
        </motion.div>

        {/* Main bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {/* Status card */}
          <div
            className={`glass-card rounded-3xl border bg-white/5 p-5 backdrop-blur-xl md:p-6 ${
              isEmergency
                ? "border-red-500/40 shadow-[0_0_40px_rgba(248,113,113,0.4)]"
                : "border-emerald-400/30 shadow-[0_0_30px_rgba(52,211,153,0.35)]"
            }`}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-300">
              Triage Level
            </p>
            <div className="mt-4 flex items-center gap-3">
              {isEmergency ? (
                <span className="relative inline-flex">
                  <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-red-500/40" />
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  </span>
                </span>
              ) : (
                <span className="relative inline-flex">
                  <span className="absolute inline-flex h-8 w-8 animate-pulse rounded-full bg-emerald-400/30" />
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  </span>
                </span>
              )}
              <div>
                <p className="text-sm font-medium text-slate-300">
                  {isEmergency ? "Higher-priority concern" : "Lower-priority concern"}
                </p>
                <p className="text-lg font-semibold text-white md:text-xl">
                  {triageLevel}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400 md:text-[0.8rem]">
              This is an AI-generated triage suggestion. It should be used to
              support—not replace—clinical judgment.
            </p>
          </div>

          {/* Advice card */}
          <div className="glass-card rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:col-span-2 md:p-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-300">
              AI Summary &amp; Next Steps
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 md:text-sm">
              {advice}
            </p>
            <p className="mt-4 text-[0.7rem] text-slate-400 md:text-xs">
              If anything feels suddenly worse, or you feel unsafe waiting, treat
              this as an emergency and seek immediate in-person care.
            </p>
          </div>

          {/* Common causes card */}
          <div className="glass-card rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:col-span-3 md:p-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-300">
              Possible Causes (AI-Suggested)
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-200 md:text-sm">
              {commonCauses.length > 0 ? (
                commonCauses.map((cause, i) => <li key={i}>• {cause}</li>)
              ) : (
                <li>No specific common causes were suggested for this description.</li>
              )}
            </ul>
          </div>
        </motion.div>

        {/* Emergency block for India – only if looks urgent/emergency */}
        {isEmergency && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 rounded-3xl border border-red-500/40 bg-red-500/10 p-6 backdrop-blur-xl shadow-[0_0_45px_rgba(248,113,113,0.45)]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-red-600/30">
                  <span className="absolute h-full w-full animate-ping rounded-2xl bg-red-500/40" />
                  <Siren className="relative h-5 w-5 text-red-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-200">
                    Emergency Guidance (India)
                  </p>
                  <p className="mt-1 text-xs text-red-100 md:text-sm">
                    If you believe this could be an emergency, do not rely on this
                    app alone. Contact emergency services immediately.
                  </p>
                </div>
              </div>

              <div className="grid gap-2 text-sm text-red-50 md:text-base">
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-red-200" />
                  <span>
                    <span className="font-semibold">112</span> – All-in-One Emergency
                    Helpline
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-red-200" />
                  <span>
                    <span className="font-semibold">108</span> – Ambulance (National)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-red-200" />
                  <span>
                    <span className="font-semibold">102</span> – Medical Emergency
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Always-on safety note */}
        <div className="mt-8 text-center text-[0.7rem] text-slate-500 md:text-xs">
          CareSense AI is an informational tool and does not provide a medical
          diagnosis. In India, for emergencies you can call{" "}
          <span className="font-semibold text-slate-300">112</span> or{" "}
          <span className="font-semibold text-slate-300">108</span> for an
          ambulance.
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { Activity, Brain, ShieldCheck, Clock, FileText, Stethoscope } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Symptom structuring",
    body: "Transforms free-text descriptions into structured clinical fields like onset, severity, and associated factors.",
  },
  {
    icon: Brain,
    title: "AI triage support",
    body: "Suggests potential urgency levels to help decide whether self-care, remote consult, or urgent in-person care is appropriate.",
  },
  {
    icon: ShieldCheck,
    title: "Safety-first prompts",
    body: "Actively surfaces red-flag symptom clusters with guidance to seek immediate evaluation when appropriate.",
  },
  {
    icon: Clock,
    title: "Time-aware context",
    body: "Encourages users to share duration, progression, and changes over time — key context for clinicians.",
  },
  {
    icon: FileText,
    title: "Clinician-ready summaries",
    body: "Generates concise summaries that can be shared with healthcare professionals to streamline consultations.",
  },
  {
    icon: Stethoscope,
    title: "Clinic integration ready",
    body: "Designed to be integrated into digital front doors, intake flows, and virtual care journeys.",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section
      id="features"
      className="relative z-10 border-t border-white/10 bg-slate-950/75 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-10 max-w-3xl text-left md:text-center md:mx-auto">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Capabilities
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Built for modern, responsible digital triage.
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            CareSense AI focuses on clarity, safety, and usability — for both
            patients and clinicians — combining conversational input with
            medically oriented structure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card flex flex-col gap-3 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.7)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-cyan-400/40 bg-slate-950/80">
                  <feature.icon className="h-4 w-4 text-cyan-300" />
                </div>
                <h3 className="text-sm font-semibold text-white md:text-base">
                  {feature.title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
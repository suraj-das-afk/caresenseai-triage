import React from "react";

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="stories"
      className="relative z-10 border-t border-white/10 bg-slate-950/85 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-10 max-w-3xl md:mx-auto md:text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Clinicians & Patients
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Designed to reduce anxiety and improve conversations.
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            These are representative examples of how tools like CareSense AI
            may fit into real-world journeys — not endorsements or specific
            clinical claims.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Clinician-style testimonial */}
          <div className="glass-card flex h-full flex-col justify-between rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
            <p className="mb-4 text-sm leading-relaxed text-slate-200 md:text-base">
              &quot;Having a pre-structured summary of a patient&apos;s
              symptoms — onset, severity, associated factors — can save several
              minutes per consultation. It doesn&apos;t replace clinical
              reasoning, but it helps us start at a much clearer baseline.&quot;
            </p>
            <div className="mt-4 text-xs text-slate-400 md:text-sm">
              <p className="font-semibold text-slate-200">
                Example clinician perspective
              </p>
              <p>General internal medicine · Digital triage pilot context</p>
            </div>
          </div>

          {/* Patient-style story */}
          <div className="glass-card flex h-full flex-col justify-between rounded-3xl border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-slate-950/90 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
            <p className="mb-4 text-sm leading-relaxed text-slate-200 md:text-base">
              &quot;Before my appointment, I used a triage tool to write out
              what I was feeling. By the time I spoke with the clinician, it
              felt easier to explain what had changed and when. It didn&apos;t
              tell me what I had, but it helped me feel less lost.&quot;
            </p>
            <div className="mt-4 text-xs text-slate-400 md:text-sm">
              <p className="font-semibold text-slate-200">
                Example patient perspective
              </p>
              <p>Adult primary care journey · Symptom triage context</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[0.7rem] text-slate-500 md:text-xs">
          These scenarios are illustrative and do not describe specific real
          individuals, providers, or outcomes.
        </p>
      </div>
    </section>
  );
};
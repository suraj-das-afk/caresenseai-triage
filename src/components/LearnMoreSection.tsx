import React from 'react';

export const LearnMoreSection: React.FC = () => {
  return (
    <section
      id="learn-more"
      className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 md:flex-row md:items-start md:justify-between md:py-20">
        {/* Left column: text */}
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            How CareSense AI Works
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            From symptoms to structured, actionable insights.
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-slate-300 md:text-base">
            CareSense AI combines advanced language models with clinical triage
            logic to help you understand what your body might be telling you.
            It&apos;s not a replacement for a doctor, but it can help you decide
            what to do next, faster and with more clarity.
          </p>

          <ul className="space-y-3 text-sm text-slate-200 md:text-base">
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400" />
              <span>
                <strong>Describe your symptoms</strong> in plain language — no
                medical jargon required.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
              <span>
                Our AI analyzes patterns, risk factors, and red-flag symptoms
                using a triage-oriented approach.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-cyan-300 to-sky-400" />
              <span>
                You receive <strong>clear, human-readable guidance</strong>{' '}
                including suggested urgency and next steps.
              </span>
            </li>
          </ul>
        </div>

        {/* Right column: mini stat + reassurance card */}
        <div className="flex flex-1 flex-col gap-6 md:max-w-sm">
          <div className="glass-card rounded-3xl border border-white/15 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.6)]">
            <h3 className="mb-3 text-sm font-semibold text-white md:text-base">
              Designed for safety and clarity
            </h3>
            <p className="mb-3 text-xs leading-relaxed text-slate-200 md:text-sm">
              CareSense AI is built to support, not replace, professional
              medical advice. It always encourages you to seek emergency care
              when symptoms sound serious or ambiguous.
            </p>
            <p className="text-xs text-slate-400">
              Always contact a licensed clinician or emergency services if
              you&apos;re in immediate danger, severe pain, or unsure about your
              condition.
            </p>
          </div>

          <div className="glass-card rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-slate-900/60 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
              Snapshot
            </p>
            <p className="mb-2 text-2xl font-bold text-white">
              Seconds to clarity,
              <br />
              built for real people.
            </p>
            <p className="text-xs text-slate-200 md:text-sm">
              No accounts, no complex forms — just a space to describe what
              you&apos;re feeling and get structured support back.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
import React from "react";

export const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="glass-card mx-auto max-w-3xl rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-950/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Contact
          </p>
          <h2 className="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
            Let&apos;s talk about CareSense AI.
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm leading-relaxed text-slate-300 md:text-base">
            Whether you&apos;re a patient, clinician, or builder in health-tech,
            we&apos;d love to hear from you. Share feedback, ideas, or
            collaboration opportunities — every conversation helps us make
            smarter, safer health tools.
          </p>

          {/* Simple contact layout – mailto & placeholder form */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Contact details */}
            <div className="space-y-3 text-sm text-slate-200 md:text-base">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Email
                </p>
                <a
                  href="mailto:hello@caresense.ai"
                  className="text-cyan-300 underline-offset-4 hover:underline"
                >
                  hello@caresense.ai
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Purpose
                </p>
                <p className="text-sm text-slate-300">
                  Product feedback, pilot programs, clinical validation, or
                  partnership inquiries.
                </p>
              </div>
            </div>

            {/* Simple form UI (no backend yet) */}
            <form
              className="mt-2 flex-1 space-y-4 text-sm text-slate-200 md:text-base"
              onSubmit={(e) => {
                e.preventDefault();
                alert("This is a demo UI. Hook this form to your backend or email service.");
              }}
            >
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Name
                </label>
                <input
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none backdrop-blur-xl placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none backdrop-blur-xl placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none backdrop-blur-xl placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  placeholder="Tell us a bit about how you’d like to use CareSense AI..."
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(34,211,238,0.5)] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Send Message (Demo)
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-[0.7rem] text-slate-500">
            *This is a demo contact form. Replace with your real email or API
            endpoint when you&apos;re ready.
          </p>
        </div>
      </div>
    </section>
  );
};
import React from "react";

const faqs = [
  {
    q: "Is CareSense AI a medical device or a diagnostic tool?",
    a: "No. CareSense AI is not a medical device and does not provide diagnoses or treatment decisions. It is intended as a symptom triage support and information companion to help structure conversations with qualified healthcare professionals.",
  },
  {
    q: "Can I use CareSense AI instead of seeing a doctor?",
    a: "No. You should never use CareSense AI as a replacement for a consultation with a licensed clinician. If you have concerning, severe, or rapidly worsening symptoms, seek in-person or emergency care immediately.",
  },
  {
    q: "How accurate are the triage suggestions?",
    a: "CareSense AI is built on AI models designed for pattern recognition and language understanding, not certified clinical decision support systems. Triage suggestions are approximate, may be incomplete, and can be wrong. They must always be interpreted by humans in context.",
  },
  {
    q: "What happens to the information I enter?",
    a: "Implementation details depend on your deployment. As a principle, CareSense AI is designed with privacy, encryption, and least-necessary data retention in mind. Any production use should follow local regulations and robust privacy policies.",
  },
  {
    q: "Is this suitable for emergencies?",
    a: "No. For chest pain, difficulty breathing, signs of stroke, severe bleeding, or any symptom that feels like an emergency, contact local emergency services immediately instead of using any digital triage tool.",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="relative z-10 border-t border-white/10 bg-slate-950/85 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <div className="mb-8 text-left md:mb-10 md:text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Frequently Asked Questions
          </p>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Safety, use, and limitations.
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            Understanding what CareSense AI can and cannot do is central to
            safe, responsible use.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="glass-card rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 shadow-[0_12px_50px_rgba(0,0,0,0.8)] md:px-5 md:py-4"
            >
              <p className="mb-2 text-sm font-semibold text-white md:text-base">
                {item.q}
              </p>
              <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
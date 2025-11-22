import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Legal: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="mx-auto max-w-4xl px-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            Legal & Safety Information
          </p>
          <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Intended use, limitations, and safety notices.
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-slate-300 md:text-base">
            This page provides high-level information about how CareSense AI is
            designed to be used, as well as important limitations and safety
            considerations. It does not replace formal legal agreements, terms
            of service, or privacy policies for any specific deployment.
          </p>

          {/* Intended use */}
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Intended use
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              CareSense AI is intended as a symptom triage support and
              information tool. It helps individuals structure their symptom
              descriptions and understand potential levels of urgency, so they
              can communicate more effectively with licensed healthcare
              professionals.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
              CareSense AI is not a medical device, is not cleared or approved
              as a diagnostic system, and is not designed to make independent
              medical decisions. Any use in clinical workflows must be under the
              oversight of qualified healthcare professionals and in compliance
              with local regulations.
            </p>
          </section>

          {/* No diagnosis / no emergency use */}
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              No diagnosis, treatment, or emergency use
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300 md:text-base">
              <li>
                CareSense AI does <span className="font-semibold">not</span>{" "}
                provide medical diagnoses or treatment plans.
              </li>
              <li>
                It must <span className="font-semibold">not</span> be used as
                the sole basis for clinical decisions or to delay seeking
                in-person care.
              </li>
              <li>
                It is <span className="font-semibold">not</span> suitable for
                emergencies of any kind.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-amber-200 md:text-base">
              If you experience chest pain, difficulty breathing, signs of
              stroke, severe bleeding, sudden confusion, or any symptom that
              feels like an emergency, contact local emergency services
              immediately. Do not rely on digital tools for emergency triage.
            </p>
          </section>

          {/* Data & privacy (generic) */}
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Data protection and privacy
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              Deployments of CareSense AI should follow applicable privacy,
              security, and health data regulations in their jurisdiction (for
              example, HIPAA-like or GDPR-like frameworks where relevant). This
              includes appropriate safeguards for data storage, access control,
              encryption, and retention policies.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
              Any real-world use should be accompanied by clear, accessible
              privacy documentation describing what information is collected,
              how it is used, and how long it is retained.
            </p>
          </section>

          {/* Limitations of AI */}
          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Limitations of AI-generated content
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              Like all AI systems, CareSense AI can generate outputs that are
              incomplete, imprecise, or incorrect. It may miss relevant
              symptoms, over-emphasize benign findings, or suggest urgency
              levels that do not match a clinician&apos;s judgment.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
              Outputs should always be reviewed and interpreted by humans in
              context. Users — whether patients or clinicians — must not treat
              generated content as authoritative medical guidance.
            </p>
          </section>

          {/* Generic disclaimer */}
          <section className="mb-10">
            <h2 className="mb-2 text-lg font-semibold text-white md:text-xl">
              Disclaimer
            </h2>
            <p className="text-sm leading-relaxed text-slate-300 md:text-base">
              Information presented through CareSense AI, including this page,
              is for informational and educational purposes only. It does not
              constitute medical, legal, or regulatory advice. For questions
              about specific implementations, compliance obligations, or risk
              management requirements, consult relevant legal, regulatory, and
              clinical experts.
            </p>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;

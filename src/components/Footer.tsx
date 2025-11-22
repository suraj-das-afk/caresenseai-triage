import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          
          {/* Brand + summary */}
          <div className="max-w-sm">
            <h3 className="bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-lg font-semibold text-transparent">
              CareSense AI
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 md:text-sm">
              A neo-medical triage companion for structuring symptoms, improving
              communication, and empowering patients — always with human
              oversight. Not a diagnostic tool.
            </p>
          </div>

          {/* Links */}
          <div className="grid flex-1 grid-cols-2 gap-6 text-xs text-slate-300 md:grid-cols-3 md:text-sm">
            
            {/* Product */}
            <div>
              <p className="mb-2 font-semibold text-slate-100">Product</p>
              <ul className="space-y-1.5">
                <li>
                  <a href="/#learn-more" className="hover:text-cyan-300">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="/#triage" className="hover:text-cyan-300">
                    Symptom Triage
                  </a>
                </li>
                <li>
                  <a href="/#features" className="hover:text-cyan-300">
                    Features
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-2 font-semibold text-slate-100">Company</p>
              <ul className="space-y-1.5">
                <li>
                  <a href="/#about" className="hover:text-cyan-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-cyan-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/#roadmap" className="hover:text-cyan-300">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="mb-2 font-semibold text-slate-100">Legal & Safety</p>
              <ul className="space-y-1.5">
                <li>
                  <a href="/legal" className="hover:text-cyan-300">
                    Intended Use
                  </a>
                </li>
                <li>
                  <a href="/legal" className="hover:text-cyan-300">
                    Privacy & Data
                  </a>
                </li>
                <li>
                  <a href="/legal" className="hover:text-cyan-300">
                    Safety Notices
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 border-t border-white/10 pt-4 text-[0.7rem] text-slate-500 md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CareSense AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Not for emergency use. If this is a medical emergency, contact
            local emergency services immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};
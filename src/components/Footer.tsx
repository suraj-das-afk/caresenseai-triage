import React from "react";
import { Link } from "react-router-dom";

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
                  <Link to="/#learn-more" className="hover:text-cyan-300">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link to="/#triage" className="hover:text-cyan-300">
                    Symptom Triage
                  </Link>
                </li>
                <li>
                  <Link to="/#features" className="hover:text-cyan-300">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mb-2 font-semibold text-slate-100">Company</p>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/#about" className="hover:text-cyan-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/#contact" className="hover:text-cyan-300">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/#roadmap" className="hover:text-cyan-300">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="mb-2 font-semibold text-slate-100">Legal & Safety</p>
              <ul className="space-y-1.5">
                <li>
                  <Link to="/legal" className="hover:text-cyan-300">
                    Intended Use
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="hover:text-cyan-300">
                    Privacy & Data
                  </Link>
                </li>
                <li>
                  <Link to="/legal" className="hover:text-cyan-300">
                    Safety Notices
                  </Link>
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
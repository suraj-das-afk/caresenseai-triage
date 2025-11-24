import { motion } from "framer-motion";
import { User, ShieldCheck, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const ProfileSection = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <section
      id="profile"
      className="bg-slate-950/95 py-16 px-4 border-t border-white/5"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="glass-card rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 p-6 md:p-8 backdrop-blur-2xl shadow-[0_24px_80px_rgba(15,23,42,0.9)]"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Left: title + description */}
            <div className="md:max-w-sm">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Your CareSense profile
              </h2>
              <p className="mt-2 text-sm md:text-base text-slate-300">
                Manage your identity and understand how CareSense AI uses your
                account to personalise your experience and keep your health
                information safe.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-300 border border-emerald-400/40">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Privacy-first by design</span>
              </div>
            </div>

            {/* Right: profile card */}
            <div className="w-full md:max-w-xs">
              {user ? (
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 md:p-5 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_20px_rgba(16,185,129,0.7)]">
                      <User className="h-5 w-5 text-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {user.displayName ||
                          (user.email
                            ? user.email.split("@")[0]
                            : "CareSense user")}
                      </p>
                      <p className="truncate text-[0.75rem] text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-[0.8rem] text-slate-300">
                    <p>
                      • Signed in with{" "}
                      <span className="font-semibold text-cyan-300">
                        Google
                      </span>
                    </p>
                    <p>
                      • Used only to associate triage sessions and securely
                      save your records.
                    </p>
                    <p>
                      • You can sign out at any time from the navigation bar.
                    </p>
                  </div>

                  <p className="mt-4 text-[0.7rem] text-slate-500">
                    Coming soon: export your history, manage notification
                    preferences, and view past triage summaries in one place.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 md:p-5 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 shadow-inner">
                      <User className="h-5 w-5 text-slate-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        You’re not signed in
                      </p>
                      <p className="text-[0.8rem] text-slate-400">
                        Sign in to keep your triage history linked to you.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 px-4 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.5)] transition-all hover:bg-cyan-500/30 hover:shadow-[0_0_32px_rgba(34,211,238,0.7)]"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign in with Google
                  </button>

                  <p className="mt-3 text-[0.7rem] text-slate-500">
                    We don&apos;t show ads or sell your data. Your sign-in is
                    only used to keep your experience personalised and secure.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

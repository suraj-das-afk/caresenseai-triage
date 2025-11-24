// src/components/UserProfileModal.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  CalendarClock,
  Activity,
  X,
  ShieldCheck,
  ArrowRight,
  Settings,
  History,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
}

type ProfileTab = "overview" | "activity" | "settings";

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onClose,
}) => {
  const { user, signOutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  // If not logged in or not open → nothing
  if (!open || !user) return null;

  const email = user.email ?? "";
  const displayName =
    user.displayName || (email ? email.split("@")[0] : "CareSense User");

  const prettyName =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);

  const avatarInitial = prettyName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOutUser();
    onClose();
  };

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Quick action: scroll to triage section
  const goToTriage = () => {
    const el = document.getElementById("triage");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      onClose();
    }
  };

  const tabs: { id: ProfileTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <User className="h-3.5 w-3.5" /> },
    {
      id: "activity",
      label: "Activity",
      icon: <History className="h-3.5 w-3.5" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-slate-950/95 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.7)]">
                  <span className="text-lg font-bold">{avatarInitial}</span>
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/40 to-emerald-400/40 blur-xl opacity-60" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">
                    {prettyName}
                  </h2>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    CareSense AI account
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1 rounded-full bg-white/5 p-1">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-medium transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/80 to-emerald-500/80 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.7)]"
                            : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {tab.icon}
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <span className="hidden text-[0.65rem] text-slate-500 sm:inline">
                  ESC to close
                </span>
              </div>

              {/* Tab content */}
              <div className="min-h-[150px] space-y-3 text-[0.75rem] text-slate-200 sm:text-sm">
                {activeTab === "overview" && (
                  <>
                    <div className="mb-1 flex flex-wrap gap-2 text-[0.7rem] sm:text-xs">
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="text-slate-400">Status</p>
                        <p className="mt-1 flex items-center gap-1 text-emerald-300">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          Active
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="text-slate-400">Sign-in</p>
                        <p className="mt-1 flex items-center gap-1 text-slate-100">
                          <User className="h-3 w-3" />
                          Google
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="text-slate-400">Mode</p>
                        <p className="mt-1 flex items-center gap-1 text-slate-100">
                          <Activity className="h-3 w-3 text-cyan-300" />
                          Personal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Mail className="mt-0.5 h-4 w-4 text-slate-400" />
                      <p className="break-all">{email}</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <CalendarClock className="mt-0.5 h-4 w-4 text-slate-400" />
                      <p>
                        Signed in via Google OAuth. Future versions will let you
                        sync your triage history across devices using this
                        profile.
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <p>
                        Your account is used only to identify you securely. We
                        don&apos;t share your email or data with clinicians
                        without your consent.
                      </p>
                    </div>
                  </>
                )}

                {activeTab === "activity" && (
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      Activity dashboard is{" "}
                      <span className="text-cyan-300">coming soon</span>.
                    </p>
                    <ul className="space-y-2 text-[0.7rem] sm:text-xs">
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Recent triage sessions</span>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[0.65rem] text-slate-400">
                          Planned
                        </span>
                      </li>
                      <li className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <span>Download triage summary</span>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[0.65rem] text-slate-400">
                          Coming soon
                        </span>
                      </li>
                    </ul>
                    <p className="text-[0.7rem] text-slate-500">
                      You can still start new triage sessions from the home
                      screen. Once history is live, they&apos;ll appear here.
                    </p>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-3">
                    <p className="text-slate-300">
                      Profile settings will be available in a later version.
                    </p>
                    <div className="space-y-2 text-[0.7rem] sm:text-xs">
                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <div>
                          <p className="font-medium text-slate-100">
                            Email notifications
                          </p>
                          <p className="text-[0.7rem] text-slate-400">
                            Get reminders when you have a new report.
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[0.65rem] text-slate-400">
                          Coming soon
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <div>
                          <p className="font-medium text-slate-100">
                            Data export & deletion
                          </p>
                          <p className="text-[0.7rem] text-slate-400">
                            Control how your data is stored and removed.
                          </p>
                        </div>
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-[0.65rem] text-slate-400">
                          Planned
                        </span>
                      </div>
                    </div>
                    <p className="text-[0.7rem] text-slate-500">
                      For now, you can manage access by signing out of your
                      account on shared devices.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer: quick actions */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goToTriage}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_22px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]"
                >
                  Start new assessment
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </button>

                <div className="flex items-center gap-2 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-full border border-red-400/60 bg-red-500/15 px-4 py-2 text-xs font-semibold text-red-100 hover:bg-red-500/25"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

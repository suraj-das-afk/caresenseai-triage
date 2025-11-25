// src/components/UserProfileModal.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, Mail, ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onClose,
}) => {
  const { user, hasAuthError, authErrorMessage, signOutUser } = useAuth();

  const handleClose = () => {
    onClose();
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      onClose();
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal card */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.18 }}
          >
            <div
              className="relative w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/95 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header avatar + name */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.8)]">
                  <User className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                    Signed in profile
                  </p>
                  <h2 className="truncate text-lg font-semibold text-white">
                    {user?.displayName ||
                      (user?.email
                        ? user.email.split("@")[0].charAt(0).toUpperCase() +
                          user.email.split("@")[0].slice(1)
                        : "CareSense User")}
                  </h2>
                </div>
              </div>

              {/* Body content */}
              <div className="space-y-4 text-sm text-slate-200">
                {hasAuthError && (
                  <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-3 text-xs text-amber-100">
                    <p className="font-semibold mb-1">Auth configuration issue</p>
                    <p>{authErrorMessage || "Firebase authentication is disabled."}</p>
                  </div>
                )}

                {!user && !hasAuthError && (
                  <div className="rounded-2xl border border-white/12 bg-white/5 p-3 text-xs text-slate-200">
                    <p className="font-semibold mb-1">You are not signed in</p>
                    <p>
                      Sign in from the navigation bar to see your profile details.
                    </p>
                  </div>
                )}

                {user && (
                  <>
                    {/* Email */}
                    <div className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
                      <Mail className="mt-0.5 h-4 w-4 text-cyan-300" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Email
                        </p>
                        <p className="break-all text-sm text-slate-100">
                          {user.email || "Not available"}
                        </p>
                      </div>
                    </div>

                    {/* Security / privacy note */}
                    <div className="flex items-start gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                      <div className="space-y-0.5 text-xs">
                        <p className="font-semibold text-emerald-100">
                          Your account & privacy
                        </p>
                        <p className="text-slate-200">
                          We only use your Google account to authenticate you on
                          this device. CareSense AI does not post anything to your
                          Google account.
                        </p>
                      </div>
                    </div>

                    {/* Info list */}
                    <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-3 text-[0.75rem] text-slate-300">
                      <p className="mb-1 font-semibold text-slate-100">
                        Account details
                      </p>
                      <ul className="space-y-1.5">
                        <li>
                          • Signed in via{" "}
                          <span className="font-medium text-cyan-300">
                            Google
                          </span>
                        </li>
                        {user.metadata?.creationTime && (
                          <li>
                            • Account created:{" "}
                            <span className="font-medium">
                              {new Date(
                                user.metadata.creationTime
                              ).toLocaleString()}
                            </span>
                          </li>
                        )}
                        {user.metadata?.lastSignInTime && (
                          <li>
                            • Last sign-in:{" "}
                            <span className="font-medium">
                              {new Date(
                                user.metadata.lastSignInTime
                              ).toLocaleString()}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {/* Footer actions */}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
                >
                  Close
                </button>

                {user && (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/60 bg-red-500/15 px-4 py-2 text-xs font-semibold text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.45)] hover:bg-red-500/25"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

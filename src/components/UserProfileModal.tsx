// src/components/UserProfileModal.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Mail, LogOut, X, ShieldCheck, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onClose,
}) => {
  // ✅ Hooks always called
  const { user, signOutUser } = useAuth();
  const [signingOut, setSigningOut] = React.useState(false);

  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "Guest";

  const email = user?.email ?? "Not available";

  const formatMetaDate = (value?: string | null) => {
    if (!value) return "Unknown";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "Unknown";
    return d.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createdAt = formatMetaDate(user?.metadata?.creationTime ?? null);
  const lastSignIn = formatMetaDate(user?.metadata?.lastSignInTime ?? null);

  // ESC to close
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOutUser();
      onClose();
    } finally {
      setSigningOut(false);
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
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-slate-950/95 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()} // ✅ don't close when clicking inside
            >
              {/* top gradient stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300" />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-6 pt-8 space-y-5">
                {/* Header section */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-2xl font-bold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.8)]">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[0.6rem] text-slate-950 shadow">
                      <ShieldCheck className="h-3 w-3" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-200 border border-emerald-400/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Google account
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-white truncate">
                      {displayName}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-slate-300">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{email}</span>
                    </div>
                    <p className="mt-1 text-[0.7rem] text-slate-400">
                      Signed in securely with Google. CareSense AI never posts
                      to your account.
                    </p>
                  </div>
                </div>

                {/* Info grid */}
                <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-[0.75rem] text-slate-100 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
                      Account created
                    </p>
                    <p>{createdAt}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
                      Last sign-in
                    </p>
                    <p>{lastSignIn}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
                      App status
                    </p>
                    <p className="inline-flex items-center gap-1 text-emerald-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active session
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
                      Session info
                    </p>
                    <p className="inline-flex items-center gap-1 text-slate-200">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Stays signed in until you log out
                    </p>
                  </div>
                </div>

                {/* Footer text */}
                <p className="text-[0.7rem] text-slate-400">
                  In future updates, your CareSense AI assessments can be
                  safely linked to this account so you can review past triage
                  results and share them with your doctor if you choose.
                </p>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-1 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/70 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.45)] transition-all hover:bg-red-500/20 disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {signingOut ? "Signing out…" : "Sign out"}
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

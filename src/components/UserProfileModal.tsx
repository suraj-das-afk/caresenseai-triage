// src/components/UserProfileModal.tsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { User, Mail, LogOut, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onClose,
}) => {
  // ✅ Hooks MUST be at the top – always called, even when `open` is false
  const { user, signOutUser } = useAuth();

  // Close on ESC
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // If closed, render nothing (hooks above still ran)
  if (!open) return null;

  const displayName =
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "Guest";

  return (
    <AnimatePresence>
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
          className="relative w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
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
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.7)]">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white truncate">
                {displayName}
              </h3>
              <p className="text-xs font-medium text-cyan-200">Signed in</p>
              {user?.email && (
                <div className="mt-1 flex items-center gap-1.5 text-[0.8rem] text-slate-300">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate">{user.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3 text-[0.8rem] text-slate-200">
            <p>
              This profile is stored with Google Sign-In. We only use your
              account to keep your CareSense AI assessment history tied to you
              (on supported devices) and do not post anything publicly.
            </p>
            <p className="text-slate-400 text-[0.75rem]">
              In future updates you’ll be able to sync assessments across
              devices and export your records securely for doctors.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-[0.7rem] text-slate-500">
              Want to use CareSense without this account? You can sign out
              anytime.
            </p>
            <button
              type="button"
              onClick={async () => {
                await signOutUser();
                onClose();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-400/60 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

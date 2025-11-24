// src/components/Navbar.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, Menu, User, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfileModal } from "@/components/UserProfileModal";

const links = [
  { label: "Home", target: "top" },
  { label: "How it works", target: "learn-more" },
  { label: "Safety", target: "safety" },
  { label: "Triage", target: "triage" },
  { label: "Doctors", target: "doctors" },
  { label: "About", target: "about" },
  { label: "FAQ", target: "faq" },
  { label: "Contact", target: "contact" },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("top");
  const [scrolled, setScrolled] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const { user, loading, signInWithGoogle, signOutUser } = useAuth();

  // Subtle style change when scrolling
  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-user-menu]")) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [userMenuOpen]);

  const handleScroll = (target: string) => {
    setOpen(false);
    setActive(target);

    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Extract user name from email
  const getUserName = () => {
    if (!user?.email) return "User";
    const name = user.email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      {/* Ambient glow behind nav */}
      <div className="pointer-events-none absolute top-0 h-32 w-full bg-gradient-to-b from-cyan-400/15 via-emerald-400/8 to-transparent blur-3xl opacity-60" />

      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "pointer-events-auto mt-5 flex w-[94%] max-w-7xl items-center justify-between rounded-[2rem] border px-6 py-3.5 backdrop-blur-2xl transition-all duration-300",
          "shadow-[0_8px_32px_rgba(6,182,212,0.12),0_0_80px_rgba(16,185,129,0.06)]",
          scrolled
            ? "border-white/20 bg-slate-950/95 shadow-[0_12px_48px_rgba(6,182,212,0.18),0_0_100px_rgba(16,185,129,0.1)]"
            : "border-white/12 bg-slate-950/75",
        ].join(" ")}
      >
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleScroll("top")}
          className="group flex cursor-pointer items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/50 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 shadow-[0_0_24px_rgba(6,182,212,0.25)]">
            <HeartPulse className="h-6 w-6 text-cyan-300 drop-shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 blur-xl opacity-60 transition-opacity group-hover:opacity-80" />
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="bg-gradient-to-r from-cyan-200 via-white to-emerald-200 bg-clip-text text-lg font-bold tracking-tight text-transparent">
              CareSense AI
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cyan-400/80">
              Neo-Medical Intelligence
            </span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="relative hidden flex-1 items-center justify-center md:flex">
          <div className="relative inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-2 py-2 backdrop-blur-xl border border-white/8 shadow-inner">
            {links.map((link) => {
              const isActive = active === link.target;
              return (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => handleScroll(link.target)}
                  className="relative rounded-full px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-slate-300 transition-all duration-200 hover:text-white"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 via-cyan-400/25 to-emerald-400/30 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <div className="h-9 w-28 animate-pulse rounded-full bg-gradient-to-r from-white/5 to-white/10" />
          ) : user ? (
            <div className="relative" data-user-menu>
              {/* User profile button */}
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="group flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-gradient-to-r from-slate-900/60 to-slate-900/40 pl-1.5 pr-4 py-1.5 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-xl transition-all hover:border-emerald-400/50 hover:shadow-[0_0_28px_rgba(16,185,129,0.25)]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_16px_rgba(16,185,129,0.6)]">
                  <User className="h-4 w-4 text-slate-900" />
                </div>
                <span className="max-w-[120px] truncate text-xs font-semibold text-slate-100">
                  {getUserName()}
                </span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User dropdown menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-slate-950/98 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                  >
                    <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-3 mb-2 border border-white/5">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400">
                          <User className="h-4 w-4 text-slate-900" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {getUserName()}
                          </p>
                        </div>
                      </div>
                      <p className="text-[0.7rem] text-slate-400 truncate pl-10">
                        {user.email}
                      </p>
                    </div>

                    {/* View profile opens mini popup */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(true);
                        setUserMenuOpen(false);
                      }}
                      className="mb-1 w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-slate-200 hover:bg-white/10"
                    >
                      View profile
                    </button>

                    <button
                      type="button"
                      onClick={signOutUser}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-left text-sm font-semibold text-slate-200 transition-all hover:bg-white/10 hover:text-white"
                    >
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              type="button"
              onClick={signInWithGoogle}
              className="group relative overflow-hidden rounded-full border border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 px-5 py-2 text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.4)] transition-all hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            >
              <span className="relative z-10">Sign in</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5 backdrop-blur-xl transition-colors hover:bg-white/10 md:hidden"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-[5.5rem] w-[90%] max-w-sm rounded-2xl border border-white/12 bg-slate-950/98 p-5 shadow-[0_24px_80px_rgba(0,0,0,.95)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => handleScroll(link.target)}
                  className="rounded-xl px-4 py-2.5 text-left text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </button>
              ))}

              <div className="mt-4 border-t border-white/10 pt-4 flex flex-col gap-3">
                {loading ? (
                  <div className="h-10 w-full animate-pulse rounded-2xl bg-gradient-to-r from-white/5 to-white/10" />
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-3 border border-white/10">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-[0_0_16px_rgba(16,185,129,0.5)]">
                        <User className="h-5 w-5 text-slate-900" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {getUserName()}
                        </p>
                        <p className="text-[0.7rem] text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    </div>

                    {/* Mobile profile button → opens same mini popup */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(true);
                        setOpen(false);
                      }}
                      className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
                    >
                      View profile
                    </button>

                    <button
                      type="button"
                      onClick={signOutUser}
                      className="rounded-2xl border border-white/20 bg-white/8 px-4 py-2.5 text-sm font-semibold text-slate-50 transition-colors hover:bg-white/15"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="rounded-2xl border border-cyan-400/70 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 px-4 py-2.5 text-sm font-bold text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.5)] transition-all hover:bg-cyan-500/30 hover:shadow-[0_0_36px_rgba(34,211,238,0.6)]"
                  >
                    Sign in with Google
                  </button>
                )}

                <div className="mt-2 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      handleScroll("triage");
                      setOpen(false);
                    }}
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-[0_0_32px_rgba(6,182,212,0.4)] transition-all hover:shadow-[0_0_48px_rgba(6,182,212,0.6)]"
                  >
                    Start Assessment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleScroll("doctors");
                      setOpen(false);
                    }}
                    className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/10"
                  >
                    Find a doctor
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👇 Mini profile popup lives here */}
      <UserProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </header>
  );
};

// src/components/DoctorSearchSection.tsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  MapPin,
  Star,
  Clock,
  Sparkles,
  Filter,
  Search,
  X,
  Phone,
  Hospital,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Doctor } from "@/lib/api";
import { fetchDoctors } from "@/lib/api";

const CATEGORIES: {
  id: string;
  label: string;
  specialties: string[];
}[] = [
  {
    id: "all",
    label: "All",
    specialties: [],
  },
  {
    id: "general",
    label: "General & Family",
    specialties: ["General Physician", "Internal Medicine", "Family Medicine"],
  },
  {
    id: "heart-lungs",
    label: "Heart & Lungs",
    specialties: ["Cardiology", "Pulmonology"],
  },
  {
    id: "women",
    label: "Women’s Health",
    specialties: ["Gynecology", "Obstetrics"],
  },
  {
    id: "kids",
    label: "Children",
    specialties: ["Pediatrics"],
  },
  {
    id: "mind",
    label: "Mind & Mood",
    specialties: ["Psychiatry"],
  },
  {
    id: "digestive",
    label: "Digestive & Hormones",
    specialties: ["Gastroenterology", "Endocrinology"],
  },
  {
    id: "eyes-skin",
    label: "Eyes & Skin",
    specialties: ["Ophthalmology", "Dermatology"],
  },
];

interface DoctorSearchSectionProps {
  /** "home" → show only 6 + View all button, "all" → show full list */
  mode?: "home" | "all";
}

// You might later extend Doctor in backend with more fields;
// here we just read them safely if present.
type ExtendedDoctor = Doctor & {
  phone?: string;
  hospital?: string;
  website?: string;
  languages?: string;
  years_experience?: number;
  fees?: string;
};

export const DoctorSearchSection: React.FC<DoctorSearchSectionProps> = ({
  mode = "home",
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDoctor, setSelectedDoctor] =
    React.useState<ExtendedDoctor | null>(null);

  const isHomeMode = mode === "home";

  const {
    data: doctors = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Doctor[]>({
    queryKey: ["doctors", "all"],
    queryFn: () => fetchDoctors({}),
    staleTime: 1000 * 60 * 5,
  });

  const filteredDoctors = React.useMemo(() => {
    let list = doctors as ExtendedDoctor[];

    if (activeCategory !== "all") {
      const cat = CATEGORIES.find((c) => c.id === activeCategory);
      if (cat && cat.specialties.length > 0) {
        const allowed = cat.specialties.map((s) => s.toLowerCase());
        list = list.filter((doc) =>
          allowed.some((spec) =>
            (doc.specialty || "").toLowerCase().includes(spec)
          )
        );
      }
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((doc) => {
        const locationText =
          (doc as any).location || (doc as any).city || "";
        return (
          doc.name.toLowerCase().includes(q) ||
          (doc.specialty || "").toLowerCase().includes(q) ||
          locationText.toLowerCase().includes(q)
        );
      });
    }

    return list;
  }, [doctors, activeCategory, searchTerm]);

  const visibleDoctors = isHomeMode
    ? filteredDoctors.slice(0, 6)
    : filteredDoctors;

  const closeModal = () => setSelectedDoctor(null);

  return (
    <section
      id="doctors"
      className="relative bg-slate-950/95 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.20),transparent_60%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.15),transparent_60%)] opacity-70" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-200">
              <Sparkles className="h-3 w-3" />
              Curated India-based clinicians
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {isHomeMode ? (
                <>
                  Recommended{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    doctors in India
                  </span>
                </>
              ) : (
                <>
                  All{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                    doctors in our directory
                  </span>
                </>
              )}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-300 md:text-base">
              Browse doctors by specialty and city. This is an informational
              directory and does not represent a formal referral or partnership.
            </p>
          </div>

          {/* Refresh / status */}
          <div className="flex items-center gap-3 text-xs text-slate-400 md:text-sm">
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.7rem] font-medium text-slate-100 hover:bg-white/10"
            >
              <Filter className="h-3.5 w-3.5" />
              Refresh list
            </button>
            {isHomeMode ? (
              <span className="hidden sm:inline">
                Showing a preview of doctors — tap a card for details or “View
                all” for full list.
              </span>
            ) : (
              <span className="hidden sm:inline">
                Tap any doctor card to see more details.
              </span>
            )}
          </div>
        </motion.div>

        {/* Search + categories */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search bar */}
          <div className="glass-card flex flex-col gap-3 rounded-2xl border border-white/12 bg-slate-900/70 p-3 backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  isHomeMode
                    ? "Quick search by name, specialty, or city…"
                    : "Search full directory by doctor name, specialty, or city…"
                }
                className="h-10 w-full rounded-xl border border-white/10 bg-slate-950/60 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400/70 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 text-[0.7rem] text-slate-400 sm:text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Online & in-clinic availability vary by doctor.</span>
              </div>
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={[
                    "rounded-full border px-3.5 py-1.5 text-[0.75rem] font-semibold transition-all",
                    active
                      ? "border-cyan-400/80 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 text-white shadow-[0_0_18px_rgba(34,211,238,0.5)]"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-300/70 hover:bg-slate-900/80",
                  ].join(" ")}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl border border-white/10 bg-slate-900/60 animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="mt-10 rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-sm text-red-200">
            Unable to load doctors. Please check your backend and try again.
          </div>
        ) : visibleDoctors.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-center text-sm text-slate-300">
            No doctors found for this combination of category and search.
            <br />
            <span className="text-slate-400">
              Try clearing the search or choosing “All” categories.
            </span>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleDoctors.map((doc) => {
                const location =
                  (doc as any).location || (doc as any).city || "India";
                const rating = doc.rating ?? 4.6;

                return (
                  <motion.article
                    key={doc.id}
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedDoctor(doc as ExtendedDoctor)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-900/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.9)] backdrop-blur-2xl"
                  >
                    {/* glow */}
                    <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex flex-col gap-3">
                      {/* header */}
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/70 to-emerald-500/70 text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.8)]">
                          <Stethoscope className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-white md:text-base">
                            {doc.name}
                          </h3>
                          <p className="text-xs font-medium text-cyan-200/90 md:text-[0.75rem]">
                            {doc.specialty}
                          </p>
                        </div>
                      </div>

                      {/* details */}
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          <span className="truncate">{location}</span>
                        </div>
                        {doc.availability && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span className="truncate">
                              {doc.availability}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 text-amber-300" />
                          <span>
                            {rating.toFixed(1)}{" "}
                            <span className="text-slate-400">
                              • patient rating
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* tag */}
                      <div className="mt-1 flex items-center justify-between text-[0.7rem]">
                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 border border-emerald-400/40">
                          In India
                        </span>
                        <span className="text-slate-400">
                          Tap card for full details
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            {/* View all button only on home */}
            {isHomeMode && filteredDoctors.length > 6 && (
              <div className="mt-10 flex justify-center">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-400/70 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 px-6 py-2.5 text-sm font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all hover:border-cyan-300 hover:bg-cyan-500/25 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                >
                  View all doctors
                </Link>
              </div>
            )}
          </>
        )}

        {/* disclaimer */}
        <p className="mt-8 text-[0.7rem] text-slate-400 md:text-xs">
          CareSense AI does not verify registration status for each clinician
          listed here. Always confirm credentials and availability directly with
          the healthcare provider or clinic.
        </p>
      </div>

      {/* 👇 MINI POPUP: Doctor details modal */}
      <AnimatePresence>
        {selectedDoctor && (
          <>
            {/* dark backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            {/* modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.18 }}
            >
              <div
                className="relative w-full max-w-md rounded-3xl border border-white/15 bg-slate-950/95 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.7)]">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-xs font-medium text-cyan-200">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="mb-4 grid grid-cols-3 gap-2 text-[0.7rem] sm:text-xs">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-slate-400">Rating</p>
                    <p className="mt-1 flex items-center gap-1 text-slate-100">
                      <Star className="h-3 w-3 text-amber-300" />
                      {(selectedDoctor.rating ?? 4.6).toFixed(1)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-slate-400">Experience</p>
                    <p className="mt-1 text-slate-100">
                      {selectedDoctor.years_experience
                        ? `${selectedDoctor.years_experience}+ yrs`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <p className="text-slate-400">Consultation</p>
                    <p className="mt-1 text-slate-100">
                      {selectedDoctor.fees || "Varies"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-[0.75rem] text-slate-200 sm:text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-slate-400" />
                    <p>
                      {(selectedDoctor as any).location ||
                        (selectedDoctor as any).city ||
                        "India"}
                    </p>
                  </div>

                  {selectedDoctor.hospital && (
                    <div className="flex items-start gap-2">
                      <Hospital className="mt-0.5 h-4 w-4 text-slate-400" />
                      <p>{selectedDoctor.hospital}</p>
                    </div>
                  )}

                  {selectedDoctor.availability && (
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
                      <p>{selectedDoctor.availability}</p>
                    </div>
                  )}

                  {selectedDoctor.languages && (
                    <div className="flex items-start gap-2">
                      <Globe2 className="mt-0.5 h-4 w-4 text-slate-400" />
                      <p>Languages: {selectedDoctor.languages}</p>
                    </div>
                  )}

                  {selectedDoctor.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 text-slate-400" />
                      <p>{selectedDoctor.phone}</p>
                    </div>
                  )}

                  {selectedDoctor.website && (
                    <div className="flex items-start gap-2">
                      <Globe2 className="mt-0.5 h-4 w-4 text-slate-400" />
                      <a
                        href={selectedDoctor.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-300 underline underline-offset-2"
                      >
                        Visit website
                      </a>
                    </div>
                  )}
                </div>

                {/* Info text + actions */}
                <div className="mt-4 space-y-3">
                  <p className="text-[0.7rem] text-slate-400 sm:text-xs">
                    This information is for guidance only and may be incomplete.
                    Always confirm clinic address, timings, and consultation
                    fees directly with the doctor or hospital. In an emergency,
                    contact local emergency services or call{" "}
                    <span className="font-semibold text-emerald-300">
                      112 / 108 (India)
                    </span>{" "}
                    immediately.
                  </p>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

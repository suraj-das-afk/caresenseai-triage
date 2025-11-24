import {
  motion,
  type Variants,
  type TargetAndTransition,
} from 'framer-motion';
import {
  Sparkles,
  Activity,
  Brain,
  ArrowRight,
  HeartPulse,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartAssessment: () => void;
}

// ---------- Animation configs ----------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatAnimation: TargetAndTransition = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const pulseGlow: TargetAndTransition = {
  scale: [1, 1.2, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Precomputed particles so we don't call Math.random() on every render
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
}));

export const Hero = ({ onStartAssessment }: HeroProps) => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden aurora-bg grain-texture">
      {/* Enhanced animated mesh gradient background */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/4 h-[900px] w-[900px] rounded-full bg-gradient-to-br from-cyan-500/40 via-blue-500/25 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -right-1/4 h-[1000px] w-[1000px] rounded-full bg-gradient-to-bl from-emerald-500/40 via-teal-500/25 to-transparent blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            x: [-50, 50, -50],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-0 left-1/3 h-[800px] w-[800px] rounded-full bg-gradient-to-t from-cyan-400/30 via-purple-500/20 to-transparent blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/20 via-emerald-400/15 to-transparent blur-[90px]"
        />
      </div>

      {/* Enhanced floating particles with variety */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: `${2 + (p.id % 3)}px`,
              height: `${2 + (p.id % 3)}px`,
              background:
                p.id % 3 === 0
                  ? 'radial-gradient(circle, rgba(34,211,238,0.6) 0%, rgba(34,211,238,0) 70%)'
                  : p.id % 3 === 1
                  ? 'radial-gradient(circle, rgba(16,185,129,0.6) 0%, rgba(16,185,129,0) 70%)'
                  : 'radial-gradient(circle, rgba(103,232,249,0.6) 0%, rgba(103,232,249,0) 70%)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Enhanced radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.5)_100%)]" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-5xl text-center lg:max-w-6xl"
        >
          {/* Brand block */}
          <motion.div
            variants={childVariants}
            className="mb-6 flex justify-center"
          >
            <div className="glass-card group inline-flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-7 py-3.5 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_100px_rgba(34,211,238,0.2)] transition-all duration-300 hover:border-white/35 hover:bg-white/15 hover:shadow-[0_12px_50px_rgba(0,0,0,0.8),0_0_120px_rgba(34,211,238,0.3)]">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <motion.span
                  animate={pulseGlow}
                  className="absolute h-full w-full rounded-full bg-gradient-to-r from-cyan-400/50 to-emerald-400/50 blur-xl"
                />
                <HeartPulse className="relative h-5 w-5 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,1)]" />
              </div>
              <h2 className="bg-gradient-to-r from-white via-cyan-50 to-emerald-50 bg-clip-text text-lg font-bold tracking-tight text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                CareSense AI
              </h2>
            </div>
          </motion.div>

          {/* Product label */}
          <motion.div
            variants={childVariants}
            className="mb-8 text-[0.7rem] font-bold uppercase tracking-[0.35em] md:text-xs"
            style={{
              background:
                'linear-gradient(to right, rgb(148 163 184), rgb(165 243 252), rgb(110 231 183))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              paddingBottom: '0.2em',
            }}
          >
            Neo-Medical Intelligence Platform
          </motion.div>

          {/* Badge */}
          <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.06, y: -2 }}
            transition={{ duration: 0.3 }}
            className="glass-card mb-10 inline-flex items-center gap-3 rounded-full border border-white/25 bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-5 py-2.5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(15,23,42,1),0_0_80px_rgba(34,211,238,0.25)] hover:border-cyan-300/40 hover:shadow-[0_25px_100px_rgba(15,23,42,1),0_0_100px_rgba(34,211,238,0.35)]"
          >
            <div className="relative flex h-7 w-7 items-center justify-center">
              <motion.span
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-cyan-400/60 to-emerald-400/60 blur-lg"
              />
              <Sparkles className="relative h-4 w-4 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,1)]" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-[0.3em] bg-gradient-to-r from-cyan-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              Next-Gen Health Triage
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={childVariants}
            className="mb-8 text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            style={{ paddingBottom: '0.15em' }}
          >
            <span
              className="inline-block"
              style={{
                background:
                  'linear-gradient(to bottom, rgb(255 255 255), rgb(248 250 252), rgb(226 232 240))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '0.05em',
              }}
            >
              Intelligent Health Insights,
            </span>
            <br />
            <span
              className="inline-block animate-[gradient_3s_ease_infinite]"
              style={{
                background:
                  'linear-gradient(to right, rgb(34 211 238), rgb(16 185 129), rgb(103 232 249))',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '0.1em',
              }}
            >
              Powered by AI.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={childVariants}
            className="mx-auto mb-12 max-w-3xl text-base font-light leading-[1.7] text-slate-200/90 sm:text-lg md:mb-14 md:text-xl md:leading-[1.8] lg:max-w-4xl"
          >
            Instant symptom structuring and triage support at your fingertips.
            Describe what you&apos;re feeling and receive clear, personalized
            guidance on potential urgency — all powered by{' '}
            <span
              className="font-semibold"
              style={{
                background:
                  'linear-gradient(to right, rgb(103 232 249), rgb(110 231 183))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '0.1em',
                display: 'inline-block',
              }}
            >
              CareSense AI
            </span>{' '}
            and always meant to complement professional medical judgment, not replace it.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={childVariants}
            className="mb-16 flex flex-col items-center justify-center gap-6 sm:mb-20 sm:flex-row"
          >
            {/* Primary CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="lg"
                onClick={onStartAssessment}
                className="group relative overflow-hidden rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 bg-[length:200%_100%] px-10 py-6 text-base font-bold text-white shadow-[0_0_60px_rgba(34,211,238,0.7),0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-500 hover:border-cyan-300/70 hover:bg-[position:100%_0] hover:shadow-[0_0_80px_rgba(34,211,238,0.9),0_15px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)] md:px-12 md:py-7 md:text-lg"
              >
                <span className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
                <motion.span
                  className="relative flex items-center gap-3"
                  whileHover={{ x: 2 }}
                >
                  Start Assessment
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:h-6 md:w-6" />
                </motion.span>
              </Button>
            </motion.div>

            {/* Learn More CTA */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="lg"
                aria-label="Learn more about how CareSense AI works"
                onClick={() => {
                  const el = document.getElementById('learn-more');
                  if (el) {
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
                className="group rounded-2xl border-2 border-white/30 bg-white/10 px-9 py-6 text-base font-semibold text-white backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-white/50 hover:bg-white/20 hover:shadow-[0_15px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] md:px-10 md:py-7 md:text-lg"
              >
                <Brain className="mr-3 h-5 w-5 text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,1)] transition-transform duration-300 group-hover:scale-110 md:h-6 md:w-6" />
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Confidence strip */}
          <motion.div
            variants={childVariants}
            className="mb-12 text-xs text-slate-200 md:mb-16 md:text-sm"
          >
            <motion.span
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ duration: 0.3 }}
              className="glass-card inline-flex items-center gap-3.5 rounded-full border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-6 py-3 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-emerald-300/30 hover:shadow-[0_15px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] md:px-7 md:py-3.5"
            >
              <motion.span
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [1, 0.4, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1),0_0_30px_rgba(16,185,129,0.5)] md:h-3 md:w-3"
              />
              <span className="font-semibold tracking-wide">
                Trusted by patients • Built for clinicians • © 2025
              </span>
            </motion.span>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={childVariants}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/70 hover:shadow-[0_35px_100px_rgba(15,23,42,1),0_0_80px_rgba(34,211,238,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center gap-4 text-center md:gap-5">
                <div className="relative mb-3">
                  <motion.div
                    animate={floatAnimation}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 to-cyan-600/50 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 shadow-[0_10px_40px_rgba(34,211,238,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-115 group-hover:border-cyan-300 group-hover:shadow-[0_15px_50px_rgba(34,211,238,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] md:h-18 md:w-18"
                  >
                    <Activity className="h-8 w-8 text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,1)] transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                  Real-Time Analysis
                </h3>
                <p className="text-sm leading-relaxed text-slate-200/80 md:text-base">
                  AI-powered evaluation with precision diagnostics powered by CareSense AI.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/70 hover:shadow-[0_35px_100px_rgba(15,23,42,1),0_0_80px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center gap-4 text-center md:gap-5">
                <div className="relative mb-3">
                  <motion.div
                    animate={floatAnimation}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/50 to-emerald-600/50 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-emerald-400/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 shadow-[0_10px_40px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-115 group-hover:border-emerald-300 group-hover:shadow-[0_15px_50px_rgba(16,185,129,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] md:h-18 md:w-18"
                  >
                    <Brain className="h-8 w-8 text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,1)] transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                  Smart Triage
                </h3>
                <p className="text-sm leading-relaxed text-slate-200/80 md:text-base">
                  Intelligent urgency classification designed by CareSense AI.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group glass-card relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-300/70 hover:shadow-[0_35px_100px_rgba(15,23,42,1),0_0_80px_rgba(103,232,249,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center gap-4 text-center md:gap-5">
                <div className="relative mb-3">
                  <motion.div
                    animate={floatAnimation}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-300/50 to-cyan-500/50 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-cyan-300/60 bg-gradient-to-br from-slate-900/90 to-slate-800/80 shadow-[0_10px_40px_rgba(103,232,249,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:scale-115 group-hover:border-cyan-200 group-hover:shadow-[0_15px_50px_rgba(103,232,249,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] md:h-18 md:w-18"
                  >
                    <Sparkles className="h-8 w-8 text-cyan-200 drop-shadow-[0_0_15px_rgba(103,232,249,1)] transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                  Actionable Insights
                </h3>
                <p className="text-sm leading-relaxed text-slate-200/80 md:text-base">
                  Clear next steps based on CareSense AI&apos;s personalized scoring.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={childVariants}
            className="mt-16 flex justify-center md:mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3 text-xs text-slate-300/80 md:text-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/25 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-white/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] md:h-12 md:w-12">
                <motion.span
                  animate={{
                    y: [0, 8, 0],
                    opacity: [1, 0.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="h-4 w-1.5 rounded-full bg-gradient-to-b from-cyan-300 via-emerald-300 to-cyan-400"
                />
              </span>
              <span className="font-semibold tracking-wide">
                Scroll to explore the triage experience
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

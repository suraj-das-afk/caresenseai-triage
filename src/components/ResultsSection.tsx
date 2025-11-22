import { motion } from 'framer-motion';
import { AlertCircle, Brain, CheckCircle, ListChecks } from 'lucide-react';
import { TriageResponse } from '@/lib/api';
import { cn } from '@/lib/utils';

interface ResultsSectionProps {
  results: TriageResponse | null;
}

export const ResultsSection = ({ results }: ResultsSectionProps) => {
  if (!results) return null;

  const getStatusColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return {
          bg: 'bg-status-low/10',
          border: 'border-status-low/30',
          text: 'text-status-low',
          glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
        };
      case 'moderate':
        return {
          bg: 'bg-status-moderate/10',
          border: 'border-status-moderate/30',
          text: 'text-status-moderate',
          glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',
        };
      case 'critical':
        return {
          bg: 'bg-status-critical/10',
          border: 'border-status-critical/30',
          text: 'text-status-critical',
          glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse-slow',
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-foreground',
          glow: '',
        };
    }
  };

  const statusColors = getStatusColor(results.triage_level);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Analysis Complete</h2>
            <p className="text-muted-foreground text-lg">
              Here's what our AI found based on your symptoms
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Box - Takes full width on mobile, spans row on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={cn(
                'glass-card p-8 hover:-translate-y-1 transition-all duration-300',
                statusColors.glow
              )}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={cn('p-4 rounded-2xl', statusColors.bg)}>
                  <AlertCircle className={cn('w-8 h-8', statusColors.text)} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Triage Level
                  </h3>
                  <p className={cn('text-3xl font-bold mt-1', statusColors.text)}>
                    {results.triage_level}
                  </p>
                </div>
              </div>
              <div className={cn('h-2 rounded-full', statusColors.bg)}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className={cn('h-full rounded-full', statusColors.text.replace('text-', 'bg-'))}
                />
              </div>
            </motion.div>

            {/* AI Analysis Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card p-8 hover:-translate-y-1 transition-all duration-300 lg:row-span-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-primary/20 to-emerald-primary/20">
                  <Brain className="w-8 h-8 text-cyan-primary" />
                </div>
                <h3 className="text-2xl font-bold">AI Analysis</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {results.ai_summary}
              </p>
            </motion.div>

            {/* Recommended Actions Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card p-8 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-primary/20 to-cyan-primary/20">
                  <ListChecks className="w-8 h-8 text-emerald-primary" />
                </div>
                <h3 className="text-2xl font-bold">Recommended Actions</h3>
              </div>
              <ul className="space-y-4">
                {results.recommendations.map((recommendation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 p-1 rounded-full bg-emerald-primary/20">
                      <CheckCircle className="w-4 h-4 text-emerald-primary" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">
                      {recommendation}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            <p>
              This assessment is AI-generated and should not replace professional medical advice.
              Always consult with a healthcare provider for accurate diagnosis and treatment.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { triageAPI, TriageResponse } from '@/lib/api';
import { toast } from 'sonner';

interface TriageInterfaceProps {
  onResults: (results: TriageResponse) => void;
}

export const TriageInterface = ({ onResults }: TriageInterfaceProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      toast.error('Please describe your symptoms');
      return;
    }

    setIsLoading(true);
    try {
      const results = await triageAPI.analyzSymptoms(symptoms);
      onResults(results);
      toast.success('Analysis complete');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="triage" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 md:p-12"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-primary/20 to-emerald-primary/20">
              <Stethoscope className="w-6 h-6 text-cyan-primary" />
            </div>
            <h2 className="text-3xl font-bold">Symptom Triage</h2>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-8">
            Describe your symptoms in detail for accurate AI-powered analysis.
            Include information about severity, duration, and any relevant context.
          </p>

          {/* Textarea */}
          <div className="space-y-4">
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Example: Severe chest pain, dizziness, and shortness of breath since this morning. Pain radiates to left arm..."
              className="min-h-[200px] bg-background/50 border-white/10 rounded-2xl text-base resize-none focus:border-cyan-primary/50 transition-colors"
              disabled={isLoading}
            />

            {/* Helper Text */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-cyan-primary animate-pulse"></span>
              Be as specific as possible for better results
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !symptoms.trim()}
            className="w-full mt-8 glow-button text-lg py-6 rounded-2xl font-semibold bg-gradient-to-r from-cyan-primary to-emerald-primary hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing Symptoms...
              </>
            ) : (
              'Run AI Triage'
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitTriage, type TriageResponse } from "@/lib/api";
import { toast } from "sonner";

interface TriageInterfaceProps {
  onResults: (results: TriageResponse) => void;
}

export const TriageInterface = ({ onResults }: TriageInterfaceProps) => {
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const trimmed = symptoms.trim();

    if (!trimmed) {
      toast.error("Please describe your symptoms");
      return;
    }

    setIsLoading(true);
    try {
      // 🔗 Call normalized API wrapper (returns { triageLevel, advice, commonCauses })
      const results = await submitTriage(trimmed);
      onResults(results);

      toast.success("Analysis complete", {
        description:
          "CareSense AI has generated a structured triage suggestion based on your description.",
      });
    } catch (error: any) {
      console.error("Triage error:", error);

      if (error?.message === "Network Error") {
        toast.error("Server offline", {
          description:
            "The CareSense AI backend is not reachable. Please make sure your Django server is running.",
        });
      } else {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to analyze symptoms right now. Please try again.";
        toast.error("Something went wrong", { description: message });
      }
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
          className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-primary/20 to-emerald-primary/20 p-3">
              <Stethoscope className="h-6 w-6 text-cyan-primary" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">Symptom Triage</h2>
          </div>

          {/* Description */}
          <p className="mb-8 text-sm text-muted-foreground md:text-base">
            Describe your symptoms in detail for AI-powered triage. Include
            severity, duration, triggers, and any relevant medical history to
            help CareSense AI structure a clearer suggestion.
          </p>

          {/* Textarea */}
          <div className="space-y-4">
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder='Example: "Severe chest pain, dizziness, and shortness of breath since this morning. Pain radiates to my left arm and feels worse when I walk."'
              className="min-h-[200px] resize-none rounded-2xl border border-white/10 bg-background/50 text-base text-slate-100 focus:border-cyan-primary/50 focus-visible:ring-0 transition-colors"
              disabled={isLoading}
            />

            {/* Helper Text */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-primary" />
              <span>Be as specific as possible for better results.</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !symptoms.trim()}
            className="glow-button mt-8 w-full rounded-2xl bg-gradient-to-r from-cyan-primary to-emerald-primary py-6 text-lg font-semibold transition-all duration-300 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing symptoms…
              </>
            ) : (
              "Run AI Triage"
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

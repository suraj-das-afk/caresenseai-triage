import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { TriageInterface } from "@/components/TriageInterface";
import { ResultsSection } from "@/components/ResultsSection";
import { TriageResponse } from "@/lib/api";
import { LearnMoreSection } from "@/components/LearnMoreSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const [results, setResults] = useState<TriageResponse | null>(null);
  const triageRef = useRef<HTMLDivElement>(null);

  const handleStartAssessment = () => {
    triageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleResults = (triageResults: TriageResponse) => {
    setResults(triageResults);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Floating navbar */}
      <Navbar />

      {/* Add top padding so content isn't hidden under navbar */}
      <main className="pt-20">
        {/* Hero: Start Assessment -> triageRef, Learn More -> #learn-more */}
        <Hero onStartAssessment={handleStartAssessment} />

        {/* Learn more about how it works */}
        <LearnMoreSection />

        {/* Triage interface */}
        <div id="triage" ref={triageRef}>
          <TriageInterface onResults={handleResults} />
        </div>

        {/* Results */}
        <ResultsSection results={results} />

        {/* About & Contact sections */}
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;

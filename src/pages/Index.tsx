import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { TriageInterface } from "@/components/TriageInterface";
import { ResultsSection } from "@/components/ResultsSection";
import { TriageResponse } from "@/lib/api";
import { LearnMoreSection } from "@/components/LearnMoreSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";
import { SafetySection } from "@/components/SafetySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { DoctorSearchSection } from "@/components/DoctorSearchSection";
import { ProfileSection } from "@/components/ProfileSection";


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

      {/* Main content */}
      <main className="pt-20">
        {/* Hero: Start Assessment -> triageRef, Learn More -> #learn-more */}
        <Hero onStartAssessment={handleStartAssessment} />

        {/* How it works / learn more */}
        <LearnMoreSection />

        {/* Clinical safety & capabilities */}
        <SafetySection />
        <FeaturesSection />

        {/* Triage interface */}
        <div id="triage" ref={triageRef}>
          <TriageInterface onResults={handleResults} />
        </div>

        {/* Triage results */}
        <ResultsSection results={results} />
        <DoctorSearchSection />

        {/* About, stories, FAQ, contact */}
        <AboutSection />
        <TestimonialsSection />
        <ProfileSection /> 
        <FaqSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

import { useState, useRef } from 'react';
import { Hero } from '@/components/Hero';
import { TriageInterface } from '@/components/TriageInterface';
import { ResultsSection } from '@/components/ResultsSection';
import { TriageResponse } from '@/lib/api';

const Index = () => {
  const [results, setResults] = useState<TriageResponse | null>(null);
  const triageRef = useRef<HTMLDivElement>(null);

  const handleStartAssessment = () => {
    triageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResults = (triageResults: TriageResponse) => {
    setResults(triageResults);
  };

  return (
    <main className="min-h-screen">
      <Hero onStartAssessment={handleStartAssessment} />
      <div ref={triageRef}>
        <TriageInterface onResults={handleResults} />
      </div>
      <ResultsSection results={results} />
    </main>
  );
};

export default Index;

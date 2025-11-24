// src/pages/Doctors.tsx
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DoctorSearchSection } from "@/components/DoctorSearchSection";

const DoctorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* full directory */}
        <DoctorSearchSection mode="all" />
      </main>
      <Footer />
    </div>
  );
};

export default DoctorsPage;

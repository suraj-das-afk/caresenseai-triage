// src/pages/Profile.tsx
import { Navbar } from "@/components/Navbar";
import { ProfileSection } from "@/components/ProfileSection";

const Profile = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="pt-28 flex justify-center px-4 pb-16">
        <div className="w-full max-w-3xl">
          <ProfileSection />
        </div>
      </main>
    </div>
  );
};

export default Profile;

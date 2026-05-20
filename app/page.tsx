import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="bg-white flex flex-col w-full">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
    </LanguageProvider>
  );
}

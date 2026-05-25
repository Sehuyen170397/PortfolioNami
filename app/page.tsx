import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <LanguageProvider>
      <LoadingScreen />
      <Navbar />
      <main className="bg-white flex flex-col w-full overflow-x-hidden">
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <ContactSection />
      </main>
    </LanguageProvider>
  );
}

import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Vo Xuan Truyen — UI/UX Designer",
  description: "UI/UX Designer with 3+ years at Nami Foundation. Designing crypto, fintech and insurance products.",
  metadataBase: new URL("https://voxuantruyen.design"),
  openGraph: {
    title: "Vo Xuan Truyen — UI/UX Designer",
    description: "UI/UX Designer with 3+ years at Nami Foundation. Designing crypto, fintech and insurance products.",
    url: "https://voxuantruyen.design",
    images: [{ url: "/og-image.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vo Xuan Truyen — UI/UX Designer",
    description: "UI/UX Designer with 3+ years at Nami Foundation. Designing crypto, fintech and insurance products.",
    images: ["/og-image.jpg"],
  },
};

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

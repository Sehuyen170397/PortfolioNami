import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import NamiExchangePage from "@/components/NamiExchangePage";

export const metadata = {
  title: "Nami Exchange — Vo Xuan Truyen",
  description: "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products. UI/UX Case Study by Vo Xuan Truyen.",
};

export default function NamiExchangeRoute() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="bg-white flex flex-col w-full">
        <NamiExchangePage />
      </main>
    </LanguageProvider>
  );
}

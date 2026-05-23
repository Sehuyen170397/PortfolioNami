import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import NamiInsurancePage from "@/components/NamiInsurancePage";

export const metadata = {
  title: "Nami Insurance — Vo Xuan Truyen",
  description: "Decentralized Finance Insurance Platform. UI/UX Case Study by Vo Xuan Truyen.",
};

export default function NamiInsuranceRoute() {
  return (
    <LanguageProvider>
      <Navbar variant="dark" />
      <main className="bg-white flex flex-col w-full">
        <NamiInsurancePage />
      </main>
    </LanguageProvider>
  );
}

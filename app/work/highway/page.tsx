import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HighwayPage from "@/components/HighwayPage";

export const metadata = {
  title: "Highway — Vo Xuan Truyen",
  description: "Highway Financial Bridge. UI/UX Case Study by Vo Xuan Truyen.",
};

export default function HighwayRoute() {
  return (
    <LanguageProvider>
      <Navbar variant="dark" />
      <main className="bg-white flex flex-col w-full">
        <HighwayPage />
      </main>
    </LanguageProvider>
  );
}

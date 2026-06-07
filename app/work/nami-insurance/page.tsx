import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import NamiInsurancePage from "@/components/NamiInsurancePage";

export const metadata: Metadata = {
  title: "Nami Insurance — UI/UX Case Study",
  description: "Decentralized Finance Insurance Platform. UI/UX Case Study by Vo Xuan Truyen.",
  metadataBase: new URL("https://voxuantruyen.design"),
  openGraph: {
    title: "Nami Insurance — UI/UX Case Study",
    description: "Decentralized Finance Insurance Platform. UI/UX Case Study by Vo Xuan Truyen.",
    url: "https://voxuantruyen.design/work/nami-insurance",
    images: [{ url: "/og-nami-insurance.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nami Insurance — UI/UX Case Study",
    description: "Decentralized Finance Insurance Platform. UI/UX Case Study by Vo Xuan Truyen.",
    images: ["/og-nami-insurance.jpg"],
  },
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

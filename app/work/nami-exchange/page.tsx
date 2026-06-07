import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import NamiExchangePage from "@/components/NamiExchangePage";

export const metadata: Metadata = {
  title: "Nami Exchange — UI/UX Case Study",
  description: "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products. UI/UX Case Study by Vo Xuan Truyen.",
  metadataBase: new URL("https://voxuantruyen.design"),
  openGraph: {
    title: "Nami Exchange — UI/UX Case Study",
    description: "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products. UI/UX Case Study by Vo Xuan Truyen.",
    url: "https://voxuantruyen.design/work/nami-exchange",
    images: [{ url: "/og-nami-exchange.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nami Exchange — UI/UX Case Study",
    description: "Digital Asset Exchange Platform with Spot, Futures, and Auto-Invest Products. UI/UX Case Study by Vo Xuan Truyen.",
    images: ["/og-nami-exchange.jpg"],
  },
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

import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HighwayPage from "@/components/HighwayPage";

export const metadata: Metadata = {
  title: "Highway — UI/UX Case Study",
  description: "Highway Financial Bridge. UI/UX Case Study by Vo Xuan Truyen.",
  metadataBase: new URL("https://voxuantruyen.design"),
  openGraph: {
    title: "Highway — UI/UX Case Study",
    description: "Highway Financial Bridge. UI/UX Case Study by Vo Xuan Truyen.",
    url: "https://voxuantruyen.design/work/highway",
    images: [{ url: "/og-highway.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Highway — UI/UX Case Study",
    description: "Highway Financial Bridge. UI/UX Case Study by Vo Xuan Truyen.",
    images: ["/og-highway.jpg"],
  },
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

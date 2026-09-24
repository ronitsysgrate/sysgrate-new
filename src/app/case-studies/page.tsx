import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { CaseStudyPage } from "@/components/case-studies/CaseStudyPage";

export const metadata: Metadata = {
    title: "Case Studies · Sysgrate",
    description:
        "How Brigade's telemarketing team went from zero visibility to full AI-powered conversation intelligence — without replacing their CRM.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <CaseStudyPage />
        </main>
    );
}

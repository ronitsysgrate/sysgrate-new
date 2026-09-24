import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InsightsPage from "@/components/insights/InsightsPage";

export const metadata: Metadata = {
    title: "Insights · Sysgrate",
    description:
        "Research, analysis, and perspective on CX, AI, digital workplace, and modern workplace technology — from Sysgrate's specialists worldwide.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <InsightsPage />
        </main>
    );
}

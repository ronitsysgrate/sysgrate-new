import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AiHubPage from "@/components/ai/AiHubPage";

export const metadata: Metadata = {
    title: "AI Hub · Sysgrate",
    description:
        "From voice bots to smart dashboards — we turn manual workflows into scalable, AI-powered experiences.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <AiHubPage />
        </main>
    );
}

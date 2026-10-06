import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AiHubPage from "@/components/ai/AiHubPage";
import "@/components/ai/ai-hub.css";

export const metadata: Metadata = {
    title: "AI Hub · Sysgrate",
    description:
        "From voice bots to smart dashboards — we turn manual workflows into scalable, AI-powered experiences.",
};

export default function Page() {
    return (
        <main className="ai-world min-h-screen">
            <Navbar />
            <AiHubPage />
        </main>
    );
}

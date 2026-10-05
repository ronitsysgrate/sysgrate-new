import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ZendeskPage } from "@/components/platforms/ZendeskPage";

export const metadata: Metadata = {
    title: "Zendesk · Sysgrate",
    description:
        "Zendesk brings together ticketing, omnichannel CX, AI agents, quality assurance, workforce management, and a self-improving knowledge base — eliminating the middleware complexity that slows most enterprise support operations.",
};

export default function ZendeskRoute() {
    return (
        <main className="min-h-screen overflow-x-clip">
            <Navbar />
            <ZendeskPage />
        </main>
    );
}

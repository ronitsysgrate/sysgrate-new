import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ZoomPage } from "@/components/platforms/ZoomPage";

export const metadata: Metadata = {
    title: "Zoom · Sysgrate",
    description:
        "Zoom brings contact centre, telephony, meetings, and collaboration into one platform—with a unified experience and built-in generative AI. Sysgrate, a Zoom Platinum Partner, delivers it end to end across the globe.",
};

export default function ZoomRoute() {
    return (
        <main className="min-h-screen overflow-x-clip">
            <Navbar />
            <ZoomPage />
        </main>
    );
}

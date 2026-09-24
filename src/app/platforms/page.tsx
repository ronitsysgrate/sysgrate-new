import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { PlatformIndex } from "@/components/platforms/PlatformView";

export const metadata: Metadata = {
    title: "Platforms · Sysgrate",
    description: "Amazon Connect, Zoom, and Zendesk — deployed, integrated, and managed by Sysgrate.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <PlatformIndex />
        </main>
    );
}

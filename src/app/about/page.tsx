import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
    title: "About · Sysgrate",
    description:
        "Sysgrate designs safe, scalable communication environments across voice, email, chat, and social — powered by AI and delivered end to end.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <AboutPage />
        </main>
    );
}

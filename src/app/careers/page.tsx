import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CareersPage from "@/components/careers/CareersPage";

export const metadata: Metadata = {
    title: "Careers · Sysgrate",
    description:
        "Sysgrate hires specialists who go deep and care about outcomes. See how we work, what we offer, and send an open application.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <CareersPage />
        </main>
    );
}

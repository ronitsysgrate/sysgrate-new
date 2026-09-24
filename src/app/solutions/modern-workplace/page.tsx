import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { PracticePage } from "@/components/solutions/PracticePage";
import { SOLUTION_PAGES } from "@/content/solutions/pages";

const page = SOLUTION_PAGES[2];

export const metadata: Metadata = {
    title: "Modern Workplace · Sysgrate",
    description: page.summary,
};

export default function ModernWorkplacePage() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <PracticePage page={page} />
        </main>
    );
}

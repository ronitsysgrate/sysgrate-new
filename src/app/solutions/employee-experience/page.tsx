import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { PracticePage } from "@/components/solutions/PracticePage";
import { SOLUTION_PAGES } from "@/content/solutions/pages";

const page = SOLUTION_PAGES[1];

export const metadata: Metadata = {
    title: "Employee Experience · Sysgrate",
    description: page.summary,
};

export default function EmployeeExperiencePage() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <PracticePage page={page} />
        </main>
    );
}

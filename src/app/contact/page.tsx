import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
    title: "Contact · Sysgrate",
    description:
        "Tell us what you're solving. Specialists across CX, Digital Workplace, Modern Workplace, and AI reply within one business day.",
};

export default function Page() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <ContactPage />
        </main>
    );
}

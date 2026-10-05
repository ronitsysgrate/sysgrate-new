import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { AmazonConnectPage } from "@/components/platforms/AmazonConnectPage";

export const metadata: Metadata = {
    title: "Amazon Connect · Sysgrate",
    description:
        "Cloud contact centre design, migration, AI integration, and 24/7 managed operations — by a certified AWS Service Delivery Partner with deep CRM integration expertise and a proven track record worldwide.",
};

export default function AmazonConnectRoute() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <Navbar />
            <AmazonConnectPage />
        </main>
    );
}

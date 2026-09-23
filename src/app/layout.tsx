import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Sysgrate",
    description:
        "We design, integrate, and manage AI-native solutions across CX, unified communications, and modern workplace for enterprises worldwide.",
    icons: {
        icon: "/sysgrate-mark.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${outfit.variable} h-full antialiased`}>
            <body className="min-h-full flex flex-col font-sans selection:bg-[#E4D8F3]">
                {children}
                <Footer />
            </body>
        </html>
    );
}
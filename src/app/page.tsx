import React from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import PartnerLogoStrip from "@/components/PartnerLogoStrip";
import WhatWeSolve from "@/components/WhatWeSolve";
import HowWeEngage from "@/components/HowWeEngage";
import WhySysgrate from "@/components/WhySysgrate";
import Credentials from "@/components/Credentials";
import CaseStudies from "@/components/CaseStudies";
import NewsAndInsights from "@/components/NewsAndInsights";
import TalkToUs from "@/components/TalkToUs";
import Faq from "@/components/Faq";

export default function Home() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            {/* Floating Frosted-Glass Pill Navbar */}
            <Navbar />

            {/* Hero Section Carousel with Background Video & 4 Copy Options */}
            <HeroCarousel />

            {/* Partner Logo Strip */}
            <PartnerLogoStrip />

            {/* What We Solve — Four Practice Areas, One Partner */}
            <WhatWeSolve />

            {/* Case Studies — Outcome Metric + Client Testimonial Stripe */}
            <CaseStudies />

            {/* How We Engage — Eight Engagement Models */}
            <HowWeEngage />

            {/* News & Insights — Whitepapers, Blogs, Stories, Webinars & News */}
            <NewsAndInsights />

            {/* Credentials — Certified. Experienced. Proven. */}
            <Credentials />

            {/* Talk to Us — Direct CTA: Book a Call or Fill Out a Form */}
            <TalkToUs />

            {/* Why Sysgrate — Differentiator Cards over Large SIs */}
            <WhySysgrate />

            {/* FAQ — Common Questions */}
            <Faq />

        </main>

    );
}
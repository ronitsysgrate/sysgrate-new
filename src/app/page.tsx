import React from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import PartnerLogoStrip from "@/components/PartnerLogoStrip";
import WhatWeSolve from "@/components/WhatWeSolve";
import HowWeEngage from "@/components/HowWeEngage";
import WhySysgrate from "@/components/WhySysgrate";
import Credentials from "@/components/Credentials";
// import ContactSection from "@/components/ContactSection";
import CaseStudies from "@/components/CaseStudies";
// import FAQSection from "@/components/FAQSection";
import NewsAndInsights from "@/components/NewsAndInsights";

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

            {/* How We Engage — Eight Engagement Models */}
            <HowWeEngage />

            {/* News & Insights — Whitepapers, Blogs, Stories, Webinars & News */}
            <NewsAndInsights />

            {/* Why Sysgrate — Differentiator Cards over Large SIs */}
            <WhySysgrate />

            {/* Credentials — Certified. Experienced. Proven. */}
            <Credentials />

            {/* Let's Talk / Book a Call / Contact Form Section */}
            {/* <ContactSection /> */}

            {/* Case Studies — Outcome Metric + Client Testimonial Stripe */}
            <CaseStudies />

            {/* FAQ Section — Modern Accordion & Search */}
            {/* <FAQSection /> */}

        </main>
    );
}
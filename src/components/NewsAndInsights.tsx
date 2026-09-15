"use client";

import React, { useState } from "react";
import {
  BookOpen,
  FileText,
  Video,
  Newspaper,
  Sparkles,
  ArrowUpRight,
  Clock,
  Calendar,
  LucideIcon,
} from "lucide-react";

type InsightCategory = "All" | "Blogs" | "Whitepapers" | "Stories" | "News" | "Webinars";

interface InsightItem {
  id: string;
  category: "Blogs" | "Whitepapers" | "Stories" | "News" | "Webinars";
  badge: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  icon: LucideIcon;
  gradient: string;
  badgeStyle: string;
}

const CATEGORIES: InsightCategory[] = [
  "All",
  "Blogs",
  "Whitepapers",
  "Stories",
  "News",
  "Webinars",
];

const INSIGHTS: InsightItem[] = [
  {
    id: "1",
    category: "Whitepapers",
    badge: "Featured Whitepaper",
    title: "The 2026 Enterprise CX Benchmark: Autonomous Agentic Workflows in Production",
    excerpt:
      "Based on telemetry from 48 enterprise deployments, discover how leading organizations shift from reactive conversational bots to multi-modal agentic workflows with 99.4% uptime and measurable ROI.",
    date: "September 2026",
    readTime: "14 min read · PDF",
    author: {
      name: "Arun Krishnan",
      role: "Head of AI Architecture",
    },
    featured: true,
    icon: BookOpen,
    gradient: "from-[#E79AC0]/25 via-[#9A6EAC]/20 to-[#3E3A97]/30",
    badgeStyle: "bg-surface-inverse text-white",
  },
  {
    id: "2",
    category: "Stories",
    badge: "Customer Story",
    title: "Global Freight Network Replaces 5 Legacy Platforms with Amazon Connect & AI Routing",
    excerpt:
      "How a cross-border logistics enterprise unified 2,400 agent seats across APAC and EMEA, slashing first-contact resolution time by 38%.",
    date: "August 2026",
    readTime: "6 min read",
    author: {
      name: "Sarah Jenkins",
      role: "VP Client Solutions",
    },
    icon: Sparkles,
    gradient: "from-[#3E3A97]/15 via-[#4A3E92]/10 to-[#9A6EAC]/20",
    badgeStyle: "bg-[#3E3A97] text-white",
  },
  {
    id: "3",
    category: "Blogs",
    badge: "Architecture Blog",
    title: "Why 70% of Contact Center AI Pilots Stall Before Production (And the 4 Steps to Scale)",
    excerpt:
      "A technical retrospective on overcoming data silos, telephony latency, and compliance barriers when shipping LLMs to production floor agents.",
    date: "August 2026",
    readTime: "5 min read",
    author: {
      name: "David Chen",
      role: "Principal Cloud Engineer",
    },
    icon: FileText,
    gradient: "from-[#F2DEEE] via-[#E4D8F3] to-[#DBD7F6]",
    badgeStyle: "bg-[#7B5AA6]/15 text-[#4A3E92]",
  },
  {
    id: "4",
    category: "Webinars",
    badge: "On-Demand Webinar",
    title: "Masterclass: Enterprise Zoom Phone & Microsoft Teams Direct Routing at Scale",
    excerpt:
      "Deep dive into SBC failover topologies, emergency E911 routing compliance, and resilient multi-carrier SIP trunking architectures.",
    date: "July 2026",
    readTime: "42 min video",
    author: {
      name: "Marcus Vance",
      role: "Unified Comms Lead",
    },
    icon: Video,
    gradient: "from-[#9A6EAC]/20 via-[#3E3A97]/20 to-[#26205A]/25",
    badgeStyle: "bg-[#4A3E92] text-white",
  },
  {
    id: "5",
    category: "News",
    badge: "Press Release",
    title: "Sysgrate Named High-Growth CX Systems Integrator of the Year at Global Cloud Summit",
    excerpt:
      "Recognized for engineering leadership in enterprise cloud contact center transformation and agentic AI deployments.",
    date: "June 2026",
    readTime: "3 min read",
    author: {
      name: "Sysgrate Newsroom",
      role: "Corporate Communications",
    },
    icon: Newspaper,
    gradient: "from-[#E4D8F3]/60 via-[#F6F3FB] to-[#DBD7F6]/60",
    badgeStyle: "bg-paper-card text-text-secondary border border-hairline",
  },
];

export default function NewsAndInsights() {
  const [activeCategory, setActiveCategory] = useState<InsightCategory>("All");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const filteredInsights =
    activeCategory === "All"
      ? INSIGHTS
      : INSIGHTS.filter((item) => item.category === activeCategory);

  const featured = filteredInsights.find((item) => item.featured) ?? filteredInsights[0];
  const secondary = filteredInsights.filter((item) => item.id !== featured?.id);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section id="insights" className="sg-container pt-[clamp(64px,10vw,120px)] relative">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-[720px] flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
            News &amp; Insights
          </span>

          <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
            Frontline thinking.{" "}
            <span className="sg-highlight font-medium">Proven blueprints</span>.
          </h2>

          <p className="text-[18px] leading-[1.55] text-text-secondary m-0 max-w-[640px]">
            Explore deep technical guides, architecture whitepapers, client stories, and industry perspectives from our system integration leaders.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center flex-wrap gap-1.5 p-1.5 rounded-full bg-paper-card border border-hairline shadow-sm w-fit self-start lg:self-end">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-surface-inverse text-white shadow-pill"
                    : "text-text-secondary hover:text-ink-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Lead Card */}
      {featured && (
        <div className="mt-10 sg-animate-rise">
          <div className="group relative bg-paper rounded-panel border border-hairline p-8 md:p-12 overflow-hidden transition-all duration-300 hover:shadow-float hover:border-[#9A6EAC]/40">
            {/* Ambient Background Gradient Art */}
            <div
              className={`absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl ${featured.gradient} opacity-40 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none rounded-panel`}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] items-center gap-8">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-[0.04em] ${featured.badgeStyle}`}
                  >
                    <featured.icon size={13} strokeWidth={2.2} />
                    {featured.badge}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Calendar size={13} />
                    <span>{featured.date}</span>
                  </div>

                  <span className="text-ink-300">·</span>

                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <Clock size={13} />
                    <span>{featured.readTime}</span>
                  </div>
                </div>

                <h3 className="text-[clamp(22px,2.4vw,34px)] font-medium text-ink-800 m-0 leading-[1.25] group-hover:text-link transition-colors">
                  {featured.title}
                </h3>

                <p className="text-base text-text-secondary leading-relaxed m-0 max-w-[620px]">
                  {featured.excerpt}
                </p>

                <div className="pt-3 flex items-center gap-6">
                  <a
                    href="#whitepaper"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-link group-hover:text-link-hover transition-colors"
                  >
                    <span>Read whitepaper</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>

                  <span className="text-xs text-ink-300">|</span>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-surface-inverse text-white text-xs font-bold flex items-center justify-center">
                      {featured.author.name.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-text-secondary">
                      {featured.author.name} · {featured.author.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphical Preview Card on Right */}
              <div className="hidden lg:flex flex-col justify-between h-[240px] rounded-card bg-white/70 backdrop-blur-md border border-white/80 p-6 shadow-chip">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-ink-300 tracking-wider">
                    Executive Brief
                  </span>
                  <div className="w-8 h-8 rounded-full bg-paper-card flex items-center justify-center text-ink-800">
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-ink-200/40 rounded-full" />
                  <div className="h-2 w-full bg-ink-200/30 rounded-full" />
                  <div className="h-2 w-1/2 bg-ink-200/20 rounded-full" />
                </div>

                <div className="p-3 rounded-2xl bg-[#E4D8F3]/50 border border-[#7B5AA6]/20 flex items-center justify-between">
                  <span className="text-xs font-medium text-ink-800">
                    Download complete PDF report
                  </span>
                  <span className="text-xs font-bold text-link">Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Insights Grid */}
      {secondary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {secondary.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="group relative bg-paper rounded-card border border-hairline p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card hover:border-[#9A6EAC]/30 overflow-hidden"
              >
                {/* Subtle card ambient highlight on hover */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-bl-full pointer-events-none`}
                />

                <div>
                  {/* Category Chip & Time */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${item.badgeStyle}`}
                    >
                      <Icon size={12} strokeWidth={2} />
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-ink-300 whitespace-nowrap">
                      {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-[17px] font-medium text-ink-800 m-0 leading-snug group-hover:text-link transition-colors">
                    {item.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="text-xs text-text-secondary leading-relaxed mt-2.5 mb-0 line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-5 mt-5 border-t border-hairline/70 flex items-center justify-between">
                  <span className="text-xs text-text-secondary/80 font-medium">
                    {item.author.name}
                  </span>

                  <div className="w-6 h-6 rounded-full bg-paper-card flex items-center justify-center text-ink-300 group-hover:bg-surface-inverse group-hover:text-white transition-all duration-200">
                    <ArrowUpRight size={12} strokeWidth={2.4} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Newsletter / Insights Brief Subscription Banner */}
      <div
        className="mt-10 rounded-panel p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-hairline/80 relative overflow-hidden"
        style={{ background: "var(--panel-gradient)" }}
      >
        <div className="flex flex-col gap-1.5 text-center md:text-left max-w-[560px]">
          <span className="text-xs font-semibold uppercase tracking-[0.06em] text-text-secondary">
            Stay Ahead
          </span>
          <h4 className="text-lg sm:text-xl font-medium text-ink-800 m-0">
            Get our monthly enterprise technology brief.
          </h4>
          <p className="text-sm text-text-secondary m-0">
            Curated blueprints, platform migration notes, and AI case studies delivered once a month. No fluff.
          </p>
        </div>

        {subscribed ? (
          <div className="px-5 py-3 rounded-full bg-[#E4D8F3]/70 border border-[#7B5AA6]/30 text-surface-inverse text-xs font-medium flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#7B5AA6] text-white flex items-center justify-center text-[10px] font-bold">
              ✓
            </span>
            <span>You&apos;re subscribed to the Sysgrate Insights Brief.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex items-center gap-2 p-1.5 pl-4 bg-white/95 backdrop-blur-md border border-white/85 rounded-full shadow-chip focus-within:shadow-pill focus-within:border-[#7B5AA6]/40 w-full sm:w-auto max-w-[420px]"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="border-0 bg-transparent outline-none text-xs sm:text-sm text-ink-800 placeholder:text-ink-300 flex-1 min-w-0 py-1.5"
              aria-label="Email for newsletter subscription"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center h-9 px-4.5 rounded-full bg-surface-inverse text-white text-xs font-medium hover:bg-[#3E3A97] transition-all cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

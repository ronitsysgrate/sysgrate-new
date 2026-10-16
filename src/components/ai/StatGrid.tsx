"use client";

import { useEffect, useRef } from "react";
import { StatCard } from "@/components/StatCard";

type Stat = { value: string; label: string; source?: string };

export default function StatGrid({ stats, staggerMs = 80 }: { stats: Stat[]; staggerMs?: number }) {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const nodes = Array.from(grid.querySelectorAll<HTMLElement>("[data-reveal]"));
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // stagger, same property order as RevealItem: opacity, translate, box-shadow, border-color
        nodes.forEach((node, i) => {
            node.style.transitionDelay = `${i * staggerMs}ms, ${i * staggerMs}ms, 0s, 0s`;
        });

        const reveal = () => {
            const view = window.innerHeight || document.documentElement.clientHeight;
            nodes.forEach((node) => {
                if (node.classList.contains("is-in")) return;
                if (reduce) {
                    node.classList.add("is-in");
                    return;
                }
                const rect = node.getBoundingClientRect();
                if (rect.top < view * 0.92 && rect.bottom > 24) node.classList.add("is-in");
            });
        };

        reveal();
        window.addEventListener("scroll", reveal, { passive: true });
        window.addEventListener("resize", reveal);
        return () => {
            window.removeEventListener("scroll", reveal);
            window.removeEventListener("resize", reveal);
        };
    }, [staggerMs]);

    return (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} source={stat.source} />
            ))}
        </div>
    );
}
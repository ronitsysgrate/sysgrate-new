"use client";

import React, { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;
    /** stagger delay in ms */
    delay?: number;
    className?: string;
};

export default function RevealItem({ children, delay = 0, className = "" }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("is-in");
                    io.disconnect(); // reveal once
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            data-reveal="rise"
            className={className}
            // order matches your CSS: opacity, translate, box-shadow, border-color
            // (hover shadow/border stay instant, only the reveal is delayed)
            style={{ transitionDelay: `${delay}ms, ${delay}ms, 0s, 0s` }}
        >
            {children}
        </div>
    );
}
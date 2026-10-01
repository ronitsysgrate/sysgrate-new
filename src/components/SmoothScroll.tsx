"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll() {
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.1,
            anchors: { offset: -128 },
            autoToggle: true,
            stopInertiaOnNavigate: true,
        });

        const syncLock = () => {
            const locked =
                document.body.style.overflow === "hidden" ||
                document.documentElement.style.overflow === "hidden";
            if (locked) lenis.stop();
            else lenis.start();
        };
        const observer = new MutationObserver(syncLock);
        observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

        if (!window.location.hash) {
            lenis.scrollTo(0, { immediate: true });
        }

        return () => {
            observer.disconnect();
            lenis.destroy();
        };
    }, [pathname]);

    return null;
}

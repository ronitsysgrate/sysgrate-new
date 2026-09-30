import { Check, Layers, MessagesSquare, Phone, Video, type LucideIcon } from "lucide-react";

const TOOLS: { label: string; icon: LucideIcon; left: string; top: string }[] = [
    { label: "Voice", icon: Phone, left: "24%", top: "22%" },
    { label: "Chat", icon: MessagesSquare, left: "76%", top: "22%" },
    { label: "Meetings", icon: Video, left: "24%", top: "76%" },
    { label: "Apps", icon: Layers, left: "76%", top: "76%" },
];

export function UcRepairGraphic() {
    return (
        <div data-reveal="rise" data-delay="1" className="uc-repair rounded-card border border-hairline bg-paper/90 p-5 shadow-chip backdrop-blur-sm sm:p-6">
            <div className="relative aspect-[7/4] w-full">
                <svg
                    viewBox="0 0 560 320"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                >
                    <g className="uc-gap-lines" fill="none" stroke="#D4A3B5" strokeWidth="1.75" strokeLinecap="round" strokeDasharray="4 5">
                        <line x1="163" y1="88" x2="236" y2="133" />
                        <line x1="397" y1="88" x2="324" y2="133" />
                        <line x1="164" y1="226" x2="235" y2="186" />
                        <line x1="396" y1="226" x2="325" y2="186" />
                    </g>
                    <g className="uc-fixed-lines" fill="none" stroke="#4A3E92" strokeWidth="1.75" strokeLinecap="round">
                        <line className="uc-draw" pathLength="1" x1="163" y1="88" x2="255" y2="144" />
                        <line className="uc-draw uc-draw-2" pathLength="1" x1="397" y1="88" x2="305" y2="144" />
                        <line className="uc-draw uc-draw-3" pathLength="1" x1="164" y1="226" x2="254" y2="175" />
                        <line className="uc-draw uc-draw-4" pathLength="1" x1="396" y1="226" x2="306" y2="175" />
                    </g>
                </svg>

                {TOOLS.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <div
                            key={tool.label}
                            className="uc-chip absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-paper px-3 py-2 shadow-chip"
                            style={{ left: tool.left, top: tool.top }}
                        >
                            <Icon size={15} strokeWidth={2} className="shrink-0 text-link" aria-hidden="true" />
                            <span className="text-xs font-medium text-ink-800">{tool.label}</span>
                            <span className="uc-dot h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                        </div>
                    );
                })}

                <div className="absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
                    <div className="uc-gap absolute inset-0 grid place-items-center rounded-full border border-dashed border-[#E7C5D2] bg-paper text-[#9A4E68]">
                        <span className="text-lg leading-none font-medium" aria-hidden="true">
                            ×
                        </span>
                    </div>
                    <div className="uc-hub absolute inset-0 grid place-items-center rounded-full bg-surface-inverse text-white shadow-chip">
                        <Check size={20} strokeWidth={2.4} aria-hidden="true" />
                    </div>
                </div>
                <p className="sr-only">
                    Scattered voice, chat, meetings, and apps start disconnected, then reconnect into one unified workplace.
                </p>
            </div>
        </div>
    );
}

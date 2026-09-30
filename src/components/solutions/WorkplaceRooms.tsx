import { GraduationCap, LayoutGrid, Presentation, Radar, Signpost, Video, type LucideIcon } from "lucide-react";

export const WORKPLACE_OFFERING_ICONS: Record<string, LucideIcon> = {
    "Boardrooms & Executive Suites": Presentation,
    "Hybrid Meeting Rooms": Video,
    "Video Walls & Large Format Displays": LayoutGrid,
    "Command & Operations Centres": Radar,
    "Digital Signage": Signpost,
    "Training Rooms & Auditoriums": GraduationCap,
};

function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative h-36 overflow-hidden border-b border-hairline bg-[#F4F1FA]" aria-hidden="true">
            <svg viewBox="0 0 360 144" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                <rect width="360" height="144" fill="#F4F1FA" />
                {children}
            </svg>
        </div>
    );
}

function Floor() {
    return <rect x="0" y="108" width="360" height="36" fill="#EDE8F7" />;
}

function Boardroom() {
    return (
        <Scene>
            <Floor />
            <rect x="78" y="16" width="204" height="62" rx="8" fill="#E4DDF3" />
            <rect x="124" y="26" width="112" height="42" rx="4" fill="#26205A" />
            <rect className="room-glow" x="130" y="32" width="100" height="30" rx="2" fill="#4A3E92" />
            <rect x="138" y="40" width="46" height="4" rx="2" fill="#E79AC0" />
            <rect x="138" y="48" width="70" height="4" rx="2" fill="#FFFFFF" opacity="0.7" />
            <rect x="108" y="102" width="144" height="22" rx="11" fill="#26205A" />
            {[128, 160, 192, 224].map((x) => (
                <circle key={x} cx={x} cy={100} r="7" fill="#9A6EAC" />
            ))}
            <circle cx="108" cy="114" r="7" fill="#9A6EAC" />
            <circle cx="252" cy="114" r="7" fill="#9A6EAC" />
        </Scene>
    );
}

function HybridRoom() {
    return (
        <Scene>
            <Floor />
            <rect x="28" y="78" width="92" height="36" rx="18" fill="#26205A" />
            {[46, 74, 102].map((x) => (
                <circle key={x} cx={x} cy={74} r="8" fill="#9A6EAC" />
            ))}
            <rect x="168" y="22" width="150" height="86" rx="8" fill="#26205A" />
            <rect className="room-glow" x="176" y="30" width="134" height="70" rx="4" fill="#3E3A97" />
            <rect x="214" y="16" width="58" height="8" rx="4" fill="#141414" />
            <circle cx="243" cy="20" r="2" fill="#E79AC0" />
            <circle cx="214" cy="62" r="14" fill="#E79AC0" />
            <circle cx="258" cy="62" r="14" fill="#FFFFFF" opacity="0.85" />
            <rect x="200" y="84" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.55" />
            <rect x="244" y="84" width="28" height="4" rx="2" fill="#FFFFFF" opacity="0.55" />
        </Scene>
    );
}

function VideoWall() {
    const tiles = [
        [48, 22],
        [138, 22],
        [228, 22],
        [48, 78],
        [138, 78],
        [228, 78],
    ];
    return (
        <Scene>
            {tiles.map(([x, y], index) => (
                <g key={`${x}-${y}`}>
                    <rect x={x} y={y} width="84" height="48" rx="4" fill="#26205A" />
                    <rect
                        className={index === 1 ? "room-glow" : undefined}
                        x={x + 6}
                        y={y + 6}
                        width="72"
                        height="36"
                        rx="2"
                        fill={index === 4 ? "#E79AC0" : "#4A3E92"}
                        opacity={index === 4 ? 0.9 : 0.85}
                    />
                </g>
            ))}
        </Scene>
    );
}

function CommandCentre() {
    return (
        <Scene>
            <Floor />
            <path d="M40 118 C90 78 270 78 320 118 L320 128 L40 128 Z" fill="#26205A" />
            {[70, 146, 222].map((x, index) => (
                <g key={x}>
                    <rect x={x} y="28" width="68" height="46" rx="4" fill="#141414" />
                    <rect className={index === 1 ? "room-glow" : undefined} x={x + 5} y="34" width="58" height="34" rx="2" fill="#4A3E92" />
                    <rect x={x + 10} y="42" width="28" height="3" rx="1.5" fill="#FFFFFF" opacity="0.7" />
                    <rect x={x + 10} y="50" width="40" height="3" rx="1.5" fill="#E79AC0" />
                </g>
            ))}
            {[92, 160, 228, 268].map((x, index) => (
                <circle key={x} cx={x} cy="112" r="3.5" fill={index === 2 ? "#E79AC0" : "#C9C2E8"} />
            ))}
        </Scene>
    );
}

function DigitalSignage() {
    return (
        <Scene>
            <Floor />
            {[96, 196].map((x) => (
                <g key={x}>
                    <rect x={x} y="18" width="68" height="104" rx="6" fill="#26205A" />
                    <rect x={x + 6} y="24" width="56" height="86" rx="3" fill="#F7F4FC" />
                    <g className="room-sign">
                        <rect x={x + 12} y="32" width="44" height="16" rx="2" fill="#4A3E92" />
                        <rect x={x + 12} y="54" width="36" height="6" rx="2" fill="#E79AC0" />
                        <rect x={x + 12} y="66" width="44" height="6" rx="2" fill="#C9C2E8" />
                        <rect x={x + 12} y="78" width="28" height="6" rx="2" fill="#C9C2E8" />
                        <rect x={x + 12} y="96" width="44" height="18" rx="2" fill="#4A3E92" opacity="0.85" />
                    </g>
                    <rect x={x + 24} y="122" width="20" height="8" fill="#9A6EAC" />
                </g>
            ))}
        </Scene>
    );
}

function Auditorium() {
    const rows = [
        { y: 78, count: 5, span: 120 },
        { y: 98, count: 7, span: 180 },
        { y: 118, count: 9, span: 240 },
    ];
    return (
        <Scene>
            <Floor />
            <rect x="118" y="14" width="124" height="46" rx="4" fill="#26205A" />
            <rect className="room-glow" x="124" y="20" width="112" height="34" rx="2" fill="#4A3E92" />
            <rect x="168" y="60" width="24" height="10" rx="2" fill="#E79AC0" />
            {rows.map((row) =>
                Array.from({ length: row.count }, (_, index) => {
                    const x = 180 - row.span / 2 + (row.span / (row.count - 1)) * index;
                    return <circle key={`${row.y}-${index}`} cx={x} cy={row.y} r="5" fill="#9A6EAC" />;
                }),
            )}
        </Scene>
    );
}

const ROOMS: Record<string, () => React.ReactElement> = {
    "Boardrooms & Executive Suites": Boardroom,
    "Hybrid Meeting Rooms": HybridRoom,
    "Video Walls & Large Format Displays": VideoWall,
    "Command & Operations Centres": CommandCentre,
    "Digital Signage": DigitalSignage,
    "Training Rooms & Auditoriums": Auditorium,
};

export function WorkplaceRoom({ title }: { title: string }) {
    const Room = ROOMS[title];
    if (!Room) return null;
    return <Room />;
}

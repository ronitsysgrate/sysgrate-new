import type { Service } from "@/content/services/types";

export function ComparisonTable({
    comparison,
}: {
    comparison: NonNullable<Service["comparison"]>;
}) {
    return (
        <section className="sg-container pt-[clamp(64px,10vw,120px)]">
            <div className="max-w-180 flex flex-col gap-4">
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-paper shadow-chip text-xs font-medium tracking-[0.06em] uppercase text-text-secondary w-fit">
                    {comparison.eyebrow}
                </span>
                <h2 className="text-[clamp(26px,3.2vw,48px)] font-normal leading-[1.15] tracking-[-0.02em] text-ink-800 m-0">
                    {comparison.title}
                </h2>
                <p className="text-[18px] leading-[1.55] text-text-secondary m-0">
                    {comparison.intro}
                </p>
            </div>

            <div className="mt-10 overflow-x-auto rounded-panel border border-hairline">
                <table className="w-full min-w-[720px] border-collapse text-left">
                    <thead>
                        <tr>
                            <th className="px-6 py-5 text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary bg-paper-muted">
                                {comparison.columns[0]}
                            </th>
                            <th className="px-6 py-5 text-xs font-semibold tracking-[0.06em] uppercase text-text-secondary bg-paper-muted">
                                {comparison.columns[1]}
                            </th>
                            <th className="px-6 py-5 text-xs font-semibold tracking-[0.06em] uppercase text-white bg-surface-inverse">
                                {comparison.columns[2]}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparison.rows.map((row) => (
                            <tr key={row.category} className="border-t border-hairline">
                                <th className="px-6 py-5 text-sm font-medium text-ink-800 align-top bg-paper">
                                    {row.category}
                                </th>
                                <td className="px-6 py-5 text-sm leading-relaxed text-text-secondary align-top bg-paper">
                                    {row.traditional}
                                </td>
                                <td className="px-6 py-5 text-sm leading-relaxed text-white align-top bg-surface-inverse">
                                    {row.featured}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export type IconName =
    | "compass"
    | "layers"
    | "network"
    | "shield"
    | "sparkles"
    | "code"
    | "graduation";

export type Cta = {
    label: string;
    href: string;
};

export type DataTable = {
    columns: string[];
    rows: string[][];
};

export type Offering = {
    id: string;
    number: string;
    title: string;
    lede: string;
    body: string;
    includedLabel: string;
    included: string[];
    table?: DataTable;
    primaryCta: Cta;
    secondaryCta?: Cta;
};

export type ProcessStep = {
    number: string;
    title: string;
    body: string;
};

export type ComparisonRow = {
    category: string;
    traditional: string;
    featured: string;
};

export type RelatedLink = {
    title: string;
    blurb: string;
    href: string;
};

export type Service = {
    slug: string;
    number: string;
    icon: IconName;
    title: string;
    cardDescription: string;
    eyebrow: string;
    headline: string;
    highlight: string;
    summary: string;
    heroImage: { src: string; alt: string };
    accentColor: string;
    bgTint: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    problem: {
        eyebrow: string;
        title: string;
        intro: string;
        pains: { title: string; body: string }[];
    };
    offeringsIntro: {
        eyebrow: string;
        title: string;
        body: string;
    };
    offerings: Offering[];
    comparison?: {
        eyebrow: string;
        title: string;
        intro: string;
        columns: [string, string, string];
        rows: ComparisonRow[];
    };
    process?: {
        eyebrow: string;
        title: string;
        intro: string;
        steps: ProcessStep[];
    };
    relatedIntro: string;
    related: RelatedLink[];
    close: {
        title: string;
        body: string;
        primaryCta: Cta;
        secondaryCta?: Cta;
        tertiaryCta?: Cta;
    };
};

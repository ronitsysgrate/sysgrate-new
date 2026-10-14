"use client";

import { useState } from "react";
import InquiryModal from "@/components/inquiry/InquiryModal";
import { servicePrimaryInquiry } from "@/components/inquiry/servicePrimary";
import type { InquiryContent } from "@/components/inquiry/types";
import type { Cta } from "@/content/services/types";
import { PillCta } from "./PillCta";

export function PrimaryInquiryCta({ cta, context }: { cta: Cta; context: string }) {
    const [open, setOpen] = useState(false);
    const [inquiry, setInquiry] = useState<InquiryContent>(() => servicePrimaryInquiry(cta.label, context));

    return (
        <>
            <PillCta
                cta={cta}
                onClick={() => {
                    setInquiry(servicePrimaryInquiry(cta.label, context));
                    setOpen(true);
                }}
            />
            <InquiryModal open={open} onClose={() => setOpen(false)} {...inquiry} />
        </>
    );
}

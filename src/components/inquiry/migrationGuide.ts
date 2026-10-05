import type { InquiryContent } from "@/components/inquiry/types";

export const MIGRATION_GUIDE_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Download migration guide",
    description: "Share your details and we'll send the migration guide to your work email.",
    submitLabel: "Get the guide",
    subject: "Migration guide",
    sections: [
        {
            title: "Your details",
            fields: [
                { id: "name", label: "Name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
            ],
        },
    ],
};

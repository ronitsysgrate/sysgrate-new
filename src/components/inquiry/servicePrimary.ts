import type { InquiryContent } from "@/components/inquiry/types";

export function servicePrimaryInquiry(label: string, context: string): InquiryContent {
    return {
        title: label,
        description: "Share your details and a specialist will get back to you within one business day.",
        submitLabel: "Send request",
        subject: `${context} — ${label}`,
        sections: [
            {
                title: "Your details",
                fields: [
                    { id: "name", label: "Name", type: "text", autoComplete: "name" },
                    { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                    { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                    { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
                    { id: "job", label: "Job title", type: "text", autoComplete: "organization-title" },
                    {
                        id: "description",
                        label: "Description",
                        type: "textarea",
                        optional: true,
                        placeholder: "Anything else we should know (optional)",
                    },
                ],
            },
        ],
    };
}

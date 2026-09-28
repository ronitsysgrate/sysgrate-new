import type { InquiryContent } from "@/components/inquiry/types";

export const AI_READINESS_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Book an AI readiness assessment",
    description:
        "Tell us about your stack and where you want to go. A specialist will follow up within one business day.",
    submitLabel: "Request assessment",
    subject: "AI readiness assessment",
    sections: [
        {
            title: "About you",
            fields: [
                { id: "name", label: "Full name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "title", label: "Job title", type: "text", autoComplete: "organization-title" },
                { id: "company", label: "Company name", type: "text", autoComplete: "organization" },
                { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
                { id: "country", label: "Country", type: "country" },
            ],
        },
        {
            title: "Your stack",
            fields: [
                {
                    id: "platforms",
                    label: "What platforms are you currently running?",
                    type: "select",
                    multiple: true,
                    options: [
                        "Amazon Connect",
                        "Zoom",
                        "Zendesk",
                        "Avaya",
                        "Microsoft Teams",
                    ],
                },
                {
                    id: "interest",
                    label: "What's your primary interest?",
                    type: "select",
                    options: [
                        "Customer Experience",
                        "Employee Experience",
                        "Modern Workplace",
                        "Artificial Intelligence",
                    ],
                },
                {
                    id: "challenge",
                    label: "What's your biggest challenge right now?",
                    type: "select",
                    options: [
                        "Disconnected tools",
                        "AI not in production",
                        "No in-house expertise",
                        "Rising contact-centre cost",
                    ],
                },
            ],
        },
    ],
};

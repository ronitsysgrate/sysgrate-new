import type { InquiryContent } from "@/components/inquiry/types";

export const CONTACT_MESSAGE_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Tell us what you're solving",
    description:
        "Specialists across CX, Digital Workplace, Modern Workplace, and AI will get back to you within one business day.",
    submitLabel: "Send message",
    subject: "Website enquiry",
    sections: [
        {
            title: "Your message",
            fields: [
                { id: "name", label: "Name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                {
                    id: "practice",
                    label: "Practice",
                    type: "select",
                    allowOther: false,
                    options: [
                        "CX — Contact centre, conversational AI, CRM",
                        "EX — UCaaS, Microsoft Teams, Zoom, SBC",
                        "Workplace — AV, boardrooms, video walls, signage",
                        "AI — Automation, analytics, and agentic workflows",
                    ],
                },
                { id: "message", label: "What you're solving", type: "textarea" },
            ],
        },
    ],
};

import type { InquiryContent } from "@/components/inquiry/types";

export const CX_CONSULTATION_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Book a free CX consultation",
    description:
        "A few questions first, then you'll pick a time with a CX specialist.",
    submitLabel: "Continue to scheduler",
    subject: "Free CX consultation",
    sections: [
        {
            title: "Your consultation",
            fields: [
                {
                    id: "platform",
                    label: "What contact centre platform are you currently running?",
                    type: "text",
                },
                {
                    id: "agents",
                    label: "How many contact centre agents do you have?",
                    type: "text",
                },
                {
                    id: "reason",
                    label: "What is the primary reason for this consultation?",
                    type: "textarea",
                },
                {
                    id: "email",
                    label: "Your work email",
                    type: "email",
                    autoComplete: "email",
                },
            ],
        },
    ],
};

export const CX_SPECIALIST_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Talk to a CX specialist",
    description: "Tell us what you need. A CX specialist will reply within one business day.",
    submitLabel: "Send message",
    subject: "CX specialist enquiry",
    sections: [
        {
            title: "Your enquiry",
            fields: [
                { id: "name", label: "Name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
                { id: "requirement", label: "Briefly describe the requirement", type: "textarea" },
            ],
        },
    ],
};

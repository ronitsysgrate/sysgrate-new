import type { InquiryContent } from "@/components/inquiry/types";

export const ARCHITECTURE_REVIEW_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Schedule an architecture review",
    description:
        "Tell us what you want reviewed. A specialist will follow up within one business day.",
    submitLabel: "Request review",
    subject: "Architecture review",
    sections: [
        {
            title: "Your review",
            fields: [
                { id: "name", label: "Full name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "company", label: "Company name", type: "text", autoComplete: "organization" },
                { id: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                {
                    id: "reviewType",
                    label: "What type of review do you need?",
                    type: "select",
                    allowOther: false,
                    options: [
                        "CC architecture",
                        "UC & telephony",
                        "CRM & integrations",
                        "AV & workplace",
                        "Not sure",
                    ],
                },
                {
                    id: "problem",
                    label: "Briefly describe what you're trying to solve",
                    type: "textarea",
                },
            ],
        },
    ],
};

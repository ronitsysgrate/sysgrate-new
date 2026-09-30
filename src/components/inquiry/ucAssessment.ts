import type { InquiryContent } from "@/components/inquiry/types";

export const UC_ASSESSMENT_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Request free UC assessment",
    description:
        "Tell us about your current setup. A UC specialist will follow up within one business day.",
    submitLabel: "Request assessment",
    subject: "Free UC assessment",
    sections: [
        {
            title: "Your assessment",
            fields: [
                { id: "name", label: "Full name", type: "text", autoComplete: "name" },
                { id: "email", label: "Work email", type: "email", autoComplete: "email" },
                { id: "company", label: "Company", type: "text", autoComplete: "organization" },
                {
                    id: "platform",
                    label: "What platform are you currently on?",
                    type: "select",
                    allowOther: false,
                    options: [
                        "Legacy on-premise PBX",
                        "Avaya",
                        "Cisco",
                        "Microsoft Teams (no voice)",
                        "Zoom Phone",
                        "Other cloud",
                        "No platform yet",
                    ],
                },
                {
                    id: "users",
                    label: "How many users does this cover?",
                    type: "select",
                    allowOther: false,
                    options: ["Under 100", "100–500", "501–2,000", "2,000+"],
                },
                {
                    id: "goal",
                    label: "What are you trying to achieve?",
                    type: "textarea",
                    placeholder:
                        "Migration, new deployment, cost reduction, adding AI — tell us in 2–3 sentences.",
                },
            ],
        },
    ],
};

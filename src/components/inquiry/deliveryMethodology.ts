import type { InquiryContent } from "@/components/inquiry/types";

export const DELIVERY_METHODOLOGY_INQUIRY: InquiryContent = {
    eyebrow: "",
    title: "Download our delivery methodology",
    description: "Share your details and we'll send the delivery methodology to your work email.",
    submitLabel: "Get the methodology",
    subject: "Delivery methodology",
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

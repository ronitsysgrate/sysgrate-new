export type InquiryTextField = {
    id: string;
    label: string;
    type: "text" | "email" | "tel";
    autoComplete?: string;
};

export type InquiryCountryField = {
    id: string;
    label: string;
    type: "country";
};

export type InquiryTextareaField = {
    id: string;
    label: string;
    type: "textarea";
};

export type InquirySelectField = {
    id: string;
    label: string;
    type: "select";
    options: string[];
    multiple?: boolean;
    allowOther?: boolean;
};

export type InquiryField = InquiryTextField | InquirySelectField | InquiryCountryField | InquiryTextareaField;

export type InquirySection = {
    title: string;
    fields: InquiryField[];
};

export type InquiryContent = {
    eyebrow: string;
    title: string;
    description: string;
    submitLabel: string;
    subject: string;
    sections: InquirySection[];
};

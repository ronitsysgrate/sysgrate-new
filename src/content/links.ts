export const ai = "/ai";
export const case_studies = "/#case-studies";
export const client_stories = "/#client-stories";
export const close = "#close";
export const contact = "/contact";
export const connected ="https://www.linkedin.com/newsletters/connected-7501224179757740032/";
export const employee_experience = "solutions/employee-experience";
export const engage = "/#engage";
export const offerings = "#offerings";
export const platforms = "/platforms";
export const process = "#process";
export const solutions = "/solutions";
export const solve = "/#solve";
export const stories = "/case-studies";
export const talk = "/#talk-to-us";
export const workplace = "/solutions/modern-workplace";

export function service(slug: string) {
    if (slug === "strategy-advisory") return "/services";
    return `/services/${slug}`;
}
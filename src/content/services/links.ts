export const close = "#close";
export const process = "#process";
export const offerings = "#offerings";
export const solve = "/#solve";
export const stories = "/#case-studies";
export const talk = "/#talk-to-us";
export const engage = "/#engage";

export function service(slug: string) {
    if (slug === "strategy-advisory") return "/services";
    return `/services/${slug}`;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "Terms and Conditions · Sysgrate",
    description:
        "Terms and conditions for the use of the Sysgrate Technologies website at sysgrate.com.",
};

const MUST_NOT = [
    "Republish material from www.sysgrate.com",
    "Sell, rent or sub-license material from www.sysgrate.com",
    "Reproduce, duplicate or copy material from www.sysgrate.com",
    "Redistribute content from www.sysgrate.com",
];

const COMMENT_WARRANTIES = [
    "You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;",
    "The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;",
    "The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy",
    "The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.",
];

const LINK_WITHOUT_APPROVAL = [
    "Government agencies;",
    "Search engines;",
    "News organizations;",
    "Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and",
    "System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.",
];

const LINK_WITH_APPROVAL = [
    "commonly-known consumer and/or business information sources;",
    "dot.com community sites;",
    "associations or other groups representing charities;",
    "online directory distributors;",
    "internet portals;",
    "accounting, law and consulting firms; and",
    "educational institutions and trade associations.",
];

const APPROVED_LINK_METHODS = [
    "By use of our corporate name; or",
    "By use of the uniform resource locator being linked to; or",
    "By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.",
];

const DISCLAIMER_LIMITS = [
    "limit or exclude our or your liability for death or personal injury;",
    "limit or exclude our or your liability for fraud or fraudulent misrepresentation;",
    "limit any of our or your liabilities in any way that is not permitted under applicable law; or",
    "exclude any of our or your liabilities that may not be excluded under applicable law.",
];

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="border-t border-hairline pt-8">
            <h2 className="m-0 text-[22px] font-medium tracking-[-0.02em] text-ink-800">{title}</h2>
            <div className="mt-4 flex flex-col gap-4 text-[16px] leading-[1.7] text-text-secondary">{children}</div>
        </section>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="m-0 flex list-disc flex-col gap-2 pl-5">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export default function TermsPage() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-paper">
            <Navbar />
            <article className="sg-container pt-[clamp(120px,16vw,168px)] pb-[clamp(72px,10vw,120px)]">
                <header className="max-w-[760px] sg-animate-rise">
                    <p className="m-0 text-[13px] font-medium uppercase tracking-[0.14em] text-link">Legal</p>
                    <h1 className="m-0 mt-3 text-[clamp(36px,4.6vw,60px)] font-normal leading-[1.15] tracking-[-0.03em] text-ink-800">
                        Terms and Conditions
                    </h1>
                    <p className="m-0 mt-5 text-[18px] leading-[1.6] text-text-secondary">
                        Welcome to www.sysgrate.com!
                    </p>
                </header>

                <div className="mt-10 flex max-w-[760px] flex-col gap-8">
                    <div className="flex flex-col gap-4 text-[16px] leading-[1.7] text-text-secondary">
                        <p className="m-0">
                            These terms and conditions outline the rules and regulations for the use of Sysgrate
                            Technologies Pvt Ltd&apos;s Website, located at https://sysgrate.com/.
                        </p>
                        <p className="m-0">
                            By accessing this website we assume you accept these terms and conditions. Do not continue
                            to use www.sysgrate.com if you do not agree to take all of the terms and conditions stated
                            on this page.
                        </p>
                        <p className="m-0">
                            The following terminology applies to these Terms and Conditions, Privacy Statement and
                            Disclaimer Notice and all Agreements: &quot;Client&quot;, &quot;You&quot; and
                            &quot;Your&quot; refers to you, the person log on this website and compliant to the
                            Company’s terms and conditions. &quot;The Company&quot;, &quot;Ourselves&quot;,
                            &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our Company.
                            &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and
                            ourselves. All terms refer to the offer, acceptance and consideration of payment necessary
                            to undertake the process of our assistance to the Client in the most appropriate manner for
                            the express purpose of meeting the Client’s needs in respect of provision of the Company’s
                            stated services, in accordance with and subject to, prevailing law of Netherlands. Any use
                            of the above terminology or other words in the singular, plural, capitalization and/or
                            he/she or they, are taken as interchangeable and therefore as referring to same.
                        </p>
                    </div>

                    <Section title="Cookies">
                        <p className="m-0">
                            We employ the use of cookies. By accessing www.sysgrate.com, you agreed to use cookies in
                            agreement with the Sysgrate Technologies Pvt Ltd&apos;s Privacy Policy.
                        </p>
                        <p className="m-0">
                            Most interactive websites use cookies to let us retrieve the user’s details for each visit.
                            Cookies are used by our website to enable the functionality of certain areas to make it
                            easier for people visiting our website. Some of our affiliate/advertising partners may also
                            use cookies.
                        </p>
                    </Section>

                    <Section title="License">
                        <p className="m-0">
                            Unless otherwise stated, Sysgrate Technologies Pvt Ltd and/or its licensors own the
                            intellectual property rights for all material on www.sysgrate.com. All intellectual property
                            rights are reserved. You may access this from www.sysgrate.com for your own personal use
                            subjected to restrictions set in these terms and conditions.
                        </p>
                        <p className="m-0">You must not:</p>
                        <BulletList items={MUST_NOT} />
                        <p className="m-0">This Agreement shall begin on the date hereof.</p>
                        <p className="m-0">
                            Parts of this website offer an opportunity for users to post and exchange opinions and
                            information in certain areas of the website. Sysgrate Technologies Pvt Ltd does not filter,
                            edit, publish or review Comments prior to their presence on the website. Comments do not
                            reflect the views and opinions of Sysgrate Technologies Pvt Ltd, its agents and/or
                            affiliates. Comments reflect the views and opinions of the person who post their views and
                            opinions. To the extent permitted by applicable laws, Sysgrate Technologies Pvt Ltd shall
                            not be liable for the Comments or for any liability, damages or expenses caused and/or
                            suffered as a result of any use of and/or posting of and/or appearance of the Comments on
                            this website.
                        </p>
                        <p className="m-0">
                            Sysgrate Technologies Pvt Ltd reserves the right to monitor all Comments and to remove any
                            Comments which can be considered inappropriate, offensive or causes breach of these Terms
                            and Conditions.
                        </p>
                        <p className="m-0">You warrant and represent that:</p>
                        <BulletList items={COMMENT_WARRANTIES} />
                        <p className="m-0">
                            You hereby grant Sysgrate Technologies Pvt Ltd a non-exclusive license to use, reproduce,
                            edit and authorize others to use, reproduce and edit any of your Comments in any and all
                            forms, formats or media.
                        </p>
                    </Section>

                    <Section title="Hyperlinking to our Content">
                        <p className="m-0">
                            The following organizations may link to our Website without prior written approval:
                        </p>
                        <BulletList items={LINK_WITHOUT_APPROVAL} />
                        <p className="m-0">
                            These organizations may link to our home page, to publications or to other Website
                            information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply
                            sponsorship, endorsement or approval of the linking party and its products and/or services;
                            and (c) fits within the context of the linking party’s site.
                        </p>
                        <p className="m-0">
                            We may consider and approve other link requests from the following types of organizations:
                        </p>
                        <BulletList items={LINK_WITH_APPROVAL} />
                        <p className="m-0">
                            We will approve link requests from these organizations if we decide that: (a) the link
                            would not make us look unfavorably to ourselves or to our accredited businesses; (b) the
                            organization does not have any negative records with us; (c) the benefit to us from the
                            visibility of the hyperlink compensates the absence of Sysgrate Technologies Pvt Ltd; and
                            (d) the link is in the context of general resource information.
                        </p>
                        <p className="m-0">
                            These organizations may link to our home page so long as the link: (a) is not in any way
                            deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking
                            party and its products or services; and (c) fits within the context of the linking party’s
                            site.
                        </p>
                        <p className="m-0">
                            If you are one of the organizations listed in paragraph 2 above and are interested in
                            linking to our website, you must inform us by sending an e-mail to Sysgrate Technologies Pvt
                            Ltd. Please include your name, your organization name, contact information as well as the
                            URL of your site, a list of any URLs from which you intend to link to our Website, and a
                            list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                        </p>
                        <p className="m-0">Approved organizations may hyperlink to our Website as follows:</p>
                        <BulletList items={APPROVED_LINK_METHODS} />
                        <p className="m-0">
                            No use of Sysgrate Technologies Pvt Ltd&apos;s logo or other artwork will be allowed for
                            linking absent a trademark license agreement.
                        </p>
                    </Section>

                    <Section title="iFrames">
                        <p className="m-0">
                            Without prior approval and written permission, you may not create frames around our Webpages
                            that alter in any way the visual presentation or appearance of our Website.
                        </p>
                    </Section>

                    <Section title="Content Liability">
                        <p className="m-0">
                            We shall not be hold responsible for any content that appears on your Website. You agree to
                            protect and defend us against all claims that is rising on your Website. No link(s) should
                            appear on any Website that may be interpreted as libelous, obscene or criminal, or which
                            infringes, otherwise violates, or advocates the infringement or other violation of, any
                            third party rights.
                        </p>
                    </Section>

                    <Section title="Your Privacy">
                        <p className="m-0">
                            Please read our{" "}
                            <Link href="/privacy" className="font-medium text-link hover:text-link-hover">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </Section>

                    <Section title="Reservation of Rights">
                        <p className="m-0">
                            We reserve the right to request that you remove all links or any particular link to our
                            Website. You approve to immediately remove all links to our Website upon request. We also
                            reserve the right to amen these terms and conditions and it’s linking policy at any time. By
                            continuously linking to our Website, you agree to be bound to and follow these linking terms
                            and conditions.
                        </p>
                    </Section>

                    <Section title="Removal of links from our website">
                        <p className="m-0">
                            If you find any link on our Website that is offensive for any reason, you are free to
                            contact and inform us any moment. We will consider requests to remove links but we are not
                            obligated to or so or to respond to you directly.
                        </p>
                        <p className="m-0">
                            We do not ensure that the information on this website is correct, we do not warrant its
                            completeness or accuracy; nor do we promise to ensure that the website remains available or
                            that the material on the website is kept up to date.
                        </p>
                    </Section>

                    <Section title="Disclaimer">
                        <p className="m-0">
                            To the maximum extent permitted by applicable law, we exclude all representations, warranties
                            and conditions relating to our website and the use of this website. Nothing in this
                            disclaimer will:
                        </p>
                        <BulletList items={DISCLAIMER_LIMITS} />
                        <p className="m-0">
                            The limitations and prohibitions of liability set in this Section and elsewhere in this
                            disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
                            arising under the disclaimer, including liabilities arising in contract, in tort and for
                            breach of statutory duty.
                        </p>
                        <p className="m-0">
                            As long as the website and the information and services on the website are provided free of
                            charge, we will not be liable for any loss or damage of any nature.
                        </p>
                    </Section>
                </div>
            </article>
        </main>
    );
}

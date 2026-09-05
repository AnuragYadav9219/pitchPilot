import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowUpRight,
    CheckCircle2,
    FileText,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Brand } from "@virtualmentor/shared";

const sections = [
    {
        id: "acceptance",
        number: "01",
        title: "Acceptance of Terms",
        content:
            `By creating an account, accessing, or using ${Brand.name}, you agree to these Terms of Service and any policies referenced by them. If you do not agree with these terms, you must not access or use the service. If you are using ${Brand.name} on behalf of an organization, you represent that you have authority to accept these terms on its behalf.`,
    },
    {
        id: "eligibility",
        number: "02",
        title: "Eligibility",
        content:
            `You must be legally permitted to use ${Brand.name} in your jurisdiction. By using the service, you confirm that the information you provide is accurate and that you meet any applicable age or eligibility requirements. If you are under the age required to independently consent to online services in your jurisdiction, you may use ${Brand.name} only with appropriate parental or guardian involvement.`,
    },
    {
        id: "service",
        number: "03",
        title: "About the Service",
        content:
            `${Brand.name} is an AI-powered interview practice and career preparation platform. The service may provide simulated interview conversations, interview questions, follow-up questions, performance analysis, suggestions, scores, and other educational or practice-oriented features. Features may change, be added, suspended, or discontinued as the platform evolves.`,
    },
    {
        id: "account",
        number: "04",
        title: "Your Account",
        content:
            `You are responsible for providing accurate information when creating and maintaining your account. You are also responsible for maintaining the confidentiality of your login credentials and for activity performed through your account. You should notify ${Brand.name} promptly if you believe your account has been accessed without authorization. You may not create an account using false information or impersonate another person.`,
    },
    {
        id: "acceptable-use",
        number: "05",
        title: "Acceptable Use",
        content:
            `You agree to use ${Brand.name} only for lawful and legitimate purposes. You must not attempt to gain unauthorized access to the platform or its systems, interfere with the operation or security of the service, circumvent usage limits or access controls, introduce malicious code, abuse automated systems, scrape or systematically extract platform data without permission, or use the service to harm, harass, deceive, or infringe the rights of others.`,
    },
    {
        id: "user-content",
        number: "06",
        title: "Your Content",
        content:
            `You may provide information and other content to ${Brand.name} while using the service, including interview responses, career information, text, audio, or other materials supported by the platform. You retain your rights in your content. By submitting content, you grant ${Brand.name} the permissions reasonably necessary to host, process, transmit, and provide the requested features and services. You are responsible for ensuring that you have the necessary rights to submit the content you provide.`,
    },
    {
        id: "ai",
        number: "07",
        title: "AI-Generated Content",
        content:
            `${Brand.name} uses artificial intelligence to generate interview questions, conversations, feedback, scores, suggestions, and other content. AI-generated results are provided for practice and educational purposes and may be incomplete, inaccurate, inconsistent, or unsuitable for your particular circumstances. You should use your own judgment when evaluating AI-generated content and should not rely on it as professional, legal, financial, employment, or career advice.`,
    },
    {
        id: "privacy",
        number: "08",
        title: "Privacy",
        content:
            `Your use of ${Brand.name} is also subject to our Privacy Policy, which explains how information may be collected, used, stored, and processed. By using the service, you acknowledge that information may need to be processed to provide authentication, interview sessions, AI-powered features, analytics, security, and other functionality offered by the platform.`,
    },
    {
        id: "subscriptions",
        number: "09",
        title: "Plans, Payments & Subscriptions",
        content:
            `Certain features of ${Brand.name} may require a paid plan or subscription. If paid services are introduced, pricing, billing frequency, renewal terms, applicable taxes, cancellation procedures, and refund policies will be presented before or at the time of purchase. You authorize the applicable payment provider to charge the payment method associated with your purchase in accordance with the selected plan.`,
    },
    {
        id: "intellectual-property",
        number: "10",
        title: "Intellectual Property",
        content:
            `The ${Brand.name} platform, including its software, branding, logos, visual design, user interface, original materials, and platform technology, is owned by ${Brand.name} or its licensors and is protected by applicable intellectual property laws. These terms do not transfer ownership of our intellectual property to you. You may not copy, modify, distribute, reverse engineer, or commercially exploit the platform except where permitted by law or with our written permission.`,
    },
    {
        id: "third-party-services",
        number: "11",
        title: "Third-Party Services",
        content:
            `${Brand.name} may integrate with or rely on third-party services, including authentication providers, payment processors, cloud infrastructure, AI providers, analytics services, communication providers, or other technology partners. Your use of those services may also be subject to the third party's terms and policies. We are not responsible for the availability, functionality, or policies of third-party services that we do not control.`,
    },
    {
        id: "availability",
        number: "12",
        title: "Service Availability",
        content:
            `We aim to keep ${Brand.name} reliable and available, but we do not guarantee that the service will always be uninterrupted, secure, or error-free. The platform may occasionally be unavailable because of maintenance, updates, technical problems, security incidents, third-party outages, or circumstances beyond our reasonable control.`,
    },
    {
        id: "termination",
        number: "13",
        title: "Suspension & Termination",
        content:
            `You may stop using ${Brand.name} at any time. We may suspend or terminate access to an account when reasonably necessary to protect the service, other users, our systems, or to address violations of these terms. Where appropriate and reasonably possible, we may provide notice before taking action. Provisions that by their nature should survive termination will continue to apply after your account or access ends.`,
    },
    {
        id: "disclaimer",
        number: "14",
        title: "Disclaimer",
        content:
            `${Brand.name} is an interview practice and career preparation tool. The service is not a substitute for professional advice and does not guarantee employment, interview success, compensation, admission, promotion, or any particular career outcome. AI-generated feedback and recommendations should be evaluated using your own judgment.`,
    },
    {
        id: "limitation",
        number: "15",
        title: "Limitation of Liability",
        content:
            `To the maximum extent permitted by applicable law, ${Brand.name} and its operators, affiliates, licensors, and service providers will not be liable for indirect, incidental, special, consequential, or similar damages arising from or related to your use of the service. Nothing in these terms is intended to exclude or limit liability where such exclusion or limitation is not permitted by applicable law.`,
    },
    {
        id: "changes",
        number: "16",
        title: "Changes to These Terms",
        content:
            `We may update these Terms of Service as ${Brand.name} evolves, including when new features, products, or legal requirements are introduced. When material changes are made, we may provide reasonable notice through the service or other appropriate means. Your continued use of ${Brand.name} after updated terms become effective constitutes acceptance of the revised terms.`,
    },
    {
        id: "governing-law",
        number: "17",
        title: "Governing Law",
        content:
            `These terms will be governed by the applicable laws and regulations of the jurisdiction specified by ${Brand.name} in its final legal terms, without regard to conflict-of-law principles. Any dispute-resolution provisions will be communicated in the final version of these terms.`,
    },
    {
        id: "contact",
        number: "18",
        title: "Contact",
        content:
            `If you have questions, concerns, or requests regarding these Terms of Service, please contact the ${Brand.name} team through the official contact method provided on the platform. We may update our contact information from time to time to reflect the current support channel.`,
    },
];

export default function TermsPage() {
    const [activeSection, setActiveSection] = useState<string>("acceptance");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -60% 0px" }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen bg-(--vm-background) text-(--vm-text)">
            {/* Ambient Background */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
                <div
                    className="absolute -left-40 top-20 h-80 w-80 rounded-full blur-[120px]"
                    style={{ background: "color-mix(in srgb, var(--vm-orange) 7%, transparent)" }}
                />
                <div
                    className="absolute -right-40 top-[35%] h-96 w-96 rounded-full blur-[130px]"
                    style={{ background: "color-mix(in srgb, var(--vm-primary) 6%, transparent)" }}
                />
                <div
                    className="absolute bottom-0 left-1/2 h-80 w-175 -translate-x-1/2 rounded-full blur-[140px]"
                    style={{ background: "color-mix(in srgb, var(--vm-peach) 5%, transparent)" }}
                />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-30 border-b border-(--vm-border) bg-(--vm-background)/80 backdrop-blur-md">
                <div className="mx-auto max-w-6xl px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        <Link
                            to="/register"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                        >
                            <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
                            Back to registration
                        </Link>

                        <Link to="/" className="flex items-center gap-2">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-[10px]"
                                style={{
                                    background:
                                        "linear-gradient(135deg, var(--vm-gradient-start), var(--vm-gradient-middle), var(--vm-gradient-end))",
                                }}
                            >
                                <span className="text-sm font-bold text-white">V</span>
                            </div>
                            <span className="hidden text-sm font-semibold sm:block">{Brand.name}</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
                {/* Hero */}
                <section className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface)/70 px-3.5 py-1.5 text-xs font-medium text-(--vm-muted) backdrop-blur-sm">
                        <FileText size={14} className="text-(--vm-primary)" />
                        Legal Policy
                    </div>

                    <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                        Terms of Service
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                        These terms explain the rules and conditions that apply when you use {Brand.name}.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-(--vm-muted)">
                        <span className="rounded-full border border-(--vm-border) bg-(--vm-surface) px-3 py-1.5">
                            Effective date: Pre-launch
                        </span>
                        <span>Last updated: September 2026</span>
                    </div>
                </section>

                {/* Pre-launch Notice */}
                <section className="mt-10 rounded-[22px] border border-(--vm-primary)/20 bg-(--vm-primary)/4 p-5 sm:p-6 backdrop-blur-xs">
                    <div className="flex gap-4">
                        <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                            style={{ backgroundColor: "color-mix(in srgb, var(--vm-primary) 12%, transparent)" }}
                        >
                            <ShieldCheck size={19} className="text-(--vm-primary)" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-(--vm-text)">Pre-launch terms</h2>
                            <p className="mt-1.5 text-sm leading-6 text-(--vm-muted)">
                                {Brand.name} is currently evolving toward public launch. These terms provide the initial framework for using the platform and may be updated before or during public availability.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mt-12 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
                    {/* Active Left Sidebar Navigation */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 rounded-2xl border border-(--vm-border) bg-(--vm-surface)/40 p-4 backdrop-blur-xs">
                            <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-(--vm-muted)">
                                On this page
                            </p>

                            <nav className="mt-3 space-y-1">
                                {sections.map((section) => {
                                    const isActive = activeSection === section.id;

                                    return (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className={`group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium transition-all duration-200 ${isActive
                                                    ? "border border-(--vm-primary)/20 bg-(--vm-primary)/8 text-(--vm-primary) shadow-2xs"
                                                    : "text-(--vm-muted) hover:bg-(--vm-surface) hover:text-(--vm-text)"
                                                }`}
                                        >
                                            <span
                                                className={`text-[10px] font-bold tabular-nums ${isActive ? "text-(--vm-primary)" : "text-(--vm-muted)/70"
                                                    }`}
                                            >
                                                {section.number}
                                            </span>
                                            <span className="truncate">{section.title}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Content Section */}
                    <article className="min-w-0">
                        <div className="divide-y divide-(--vm-border) rounded-3xl border border-(--vm-border) bg-(--vm-surface)/60 px-5 sm:px-8">
                            {sections.map((section) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-24 py-7 sm:py-8"
                                >
                                    <div className="flex gap-4">
                                        <span className="pt-1 text-xs font-bold tabular-nums text-(--vm-primary)">
                                            {section.number}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h2 className="text-lg font-semibold tracking-[-0.02em] text-(--vm-text) sm:text-xl">
                                                {section.title}
                                            </h2>

                                            <p className="mt-3 text-sm leading-7 text-(--vm-muted) sm:text-[15px]">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Reassurance Cards */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[20px] border border-(--vm-border) bg-(--vm-surface) p-5 shadow-2xs">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--vm-primary)/15 bg-(--vm-primary)/8">
                                        <LockKeyhole size={16} className="text-(--vm-primary)" />
                                    </div>
                                    <span className="text-sm font-semibold text-(--vm-text)">
                                        Your account matters
                                    </span>
                                </div>
                                <p className="mt-2.5 text-xs leading-5 text-(--vm-muted)">
                                    We design the platform with responsible account and data handling in mind.
                                </p>
                            </div>

                            <div className="rounded-[20px] border border-(--vm-border) bg-(--vm-surface) p-5 shadow-2xs">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-(--vm-primary)/15 bg-(--vm-primary)/8">
                                        <CheckCircle2 size={16} className="text-(--vm-primary)" />
                                    </div>
                                    <span className="text-sm font-semibold text-(--vm-text)">
                                        Built for practice
                                    </span>
                                </div>
                                <p className="mt-2.5 text-xs leading-5 text-(--vm-muted)">
                                    VirtualMentor is designed to help you practice, learn, and improve.
                                </p>
                            </div>
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-(--vm-border) pt-6">
                            <Link
                                to="/privacy"
                                className="group inline-flex items-center gap-1.5 text-sm font-medium text-(--vm-primary) transition-colors hover:text-(--vm-primary-pressed)"
                            >
                                Privacy Policy
                                <ArrowUpRight
                                    size={15}
                                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </Link>

                            <Link
                                to="/register"
                                className="text-sm font-medium text-(--vm-muted) transition-colors hover:text-(--vm-text)"
                            >
                                Back to registration
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}
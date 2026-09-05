import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileText, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Brand } from "@virtualmentor/shared";

type PrivacyContent = { text: string; heading?: string };
type PrivacySection = { id: string; number: string; title: string; content: PrivacyContent[] };

const sections: PrivacySection[] = [
    {
        id: "information-we-collect",
        number: "01",
        title: "Information We Collect",
        content: [
            { heading: "Account information", text: "When you create a VirtualMentor account, we may collect information such as your name, email address, phone number, and authentication credentials. We collect information needed to provide and secure your account." },
            { heading: "Interview and career information", text: "Depending on the features you use, you may provide information about your target role, experience, skills, resume, interview preferences, career goals, and practice sessions." },
            { heading: "Technical information", text: "We may collect technical information associated with your use of the service, such as device information, browser information, IP address, session information, and application activity. This information may be used to maintain security, diagnose problems, and improve the service." }
        ]
    },
    {
        id: "how-we-use-information",
        number: "02",
        title: "How We Use Information",
        content: [
            { text: "We use information we collect to operate, maintain, secure, and improve VirtualMentor. This may include creating and managing accounts, providing interview practice, generating feedback, personalizing the experience, responding to requests, preventing abuse, and communicating important service information." },
            { text: "We may also use aggregated or de-identified information for analytics, product improvement, and understanding how users interact with the service." }
        ]
    },
    {
        id: "ai-processing",
        number: "03",
        title: "AI & Interview Processing",
        content: [
            { text: "VirtualMentor uses artificial intelligence to simulate interview conversations, evaluate responses, and provide coaching-oriented feedback." },
            { text: "Information you provide during an interview session may be processed by the systems required to provide these AI-powered features. The exact processing may depend on the feature you use and the technology supporting it." },
            { text: "AI-generated feedback is intended to support practice and preparation. It should not be treated as a guarantee of interview performance, employment outcomes, or professional advice." }
        ]
    },
    {
        id: "voice-and-audio",
        number: "04",
        title: "Voice & Audio Data",
        content: [
            { text: "If you use voice-based interview features, VirtualMentor may process audio or speech information in order to provide the requested experience, such as converting speech to text, generating an AI response, or analyzing communication characteristics." },
            { text: "Audio handling and retention may depend on the specific feature and technical providers used to deliver it. Additional details about voice-data handling may be provided as voice features become available." }
        ]
    },
    {
        id: "account-security",
        number: "05",
        title: "Account & Security",
        content: [
            { text: "You are responsible for maintaining the confidentiality of your account credentials and for activity that occurs through your account." },
            { text: "VirtualMentor may collect security-related information such as login events, session information, and device or network information to detect suspicious activity, protect accounts, investigate abuse, and maintain the security of the platform." }
        ]
    },
    {
        id: "cookies-storage",
        number: "06",
        title: "Cookies & Local Storage",
        content: [
            { text: "VirtualMentor may use cookies, browser storage, local storage, or similar technologies to maintain sessions, remember preferences, support authentication, and provide essential functionality." },
            { text: "Some technologies may be controlled through your browser settings. Disabling certain storage technologies may affect the functionality of parts of the service." }
        ]
    },
    {
        id: "third-party-services",
        number: "07",
        title: "Third-Party Services",
        content: [
            { text: "VirtualMentor may rely on third-party providers for services such as cloud hosting, authentication, email delivery, payments, analytics, AI processing, security, and infrastructure." },
            { text: "These providers may process information on our behalf as necessary to provide their services." }
        ]
    },
    {
        id: "data-sharing",
        number: "08",
        title: "When We Share Information",
        content: [
            { text: "We do not sell your personal information as part of the core VirtualMentor service." },
            { text: "We may share information with service providers that help us operate VirtualMentor, when necessary to provide a feature you requested, to protect the rights and security of VirtualMentor or its users, or when required by applicable law." }
        ]
    },
    {
        id: "data-retention",
        number: "09",
        title: "Data Retention",
        content: [
            { text: "We retain information for as long as reasonably necessary to provide the service, maintain account functionality, satisfy legitimate business and security needs, resolve disputes, enforce agreements, and comply with applicable legal obligations." },
            { text: "Specific retention periods may vary depending on the type of information and the purpose for which it was collected." }
        ]
    },
    {
        id: "data-security",
        number: "10",
        title: "Data Security",
        content: [
            { text: "We take reasonable measures designed to protect information against unauthorized access, loss, misuse, alteration, or disclosure." },
            { text: "However, no internet transmission, storage system, or electronic service can be guaranteed to be completely secure. You should use a strong, unique password and protect access to your account and devices." }
        ]
    },
    {
        id: "your-rights",
        number: "11",
        title: "Your Privacy Choices & Rights",
        content: [
            { text: "Depending on where you live, you may have rights regarding your personal information, including rights to access, correct, delete, or obtain a copy of certain information we hold about you." },
            { text: "You may also have rights to object to or restrict certain processing. Requests can be made using the contact information provided below, subject to applicable legal requirements and reasonable verification." }
        ]
    },
    {
        id: "children",
        number: "12",
        title: "Children's Privacy",
        content: [
            { text: "VirtualMentor is intended for users who are legally permitted to use the service under applicable law. We do not knowingly collect personal information from children in circumstances where such collection is prohibited." },
            { text: "If you believe a child has provided personal information to VirtualMentor in violation of applicable requirements, please contact us so that we can review and take appropriate action." }
        ]
    },
    {
        id: "international-transfers",
        number: "13",
        title: "International Data Transfers",
        content: [
            { text: "VirtualMentor and its service providers may process information in countries other than the country in which you live. Where required, we will take appropriate steps to handle international transfers in accordance with applicable privacy requirements." }
        ]
    },
    {
        id: "account-deletion",
        number: "14",
        title: "Account Deletion",
        content: [
            { text: "You may request deletion of your VirtualMentor account and associated personal information, subject to information that we may be required or permitted to retain for legal, security, fraud-prevention, or legitimate business purposes." }
        ]
    },
    {
        id: "policy-changes",
        number: "15",
        title: "Changes to This Policy",
        content: [
            { text: "We may update this Privacy Policy as VirtualMentor evolves, as new features are introduced, or as applicable requirements change." },
            { text: "When material changes are made, we may provide appropriate notice. The updated policy will indicate the date on which it was last revised." }
        ]
    },
    {
        id: "contact",
        number: "16",
        title: "Contact Us",
        content: [
            { text: "If you have questions, concerns, or requests relating to this Privacy Policy or the handling of your information, please contact the VirtualMentor team through the contact method provided by the service." }
        ]
    }
];

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visibleEntries.length > 0) setActiveSection(visibleEntries[0].target.id);
            },
            { root: null, rootMargin: "-100px 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="relative min-h-screen text-(--vm-text)" style={{ backgroundColor: "var(--vm-background)" }}>
            {/* Ambient Background */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -left-40 top-0 h-105 w-105 rounded-full blur-[120px]" style={{ background: "color-mix(in srgb, var(--vm-primary) 4%, transparent)" }} />
                <div className="absolute -right-40 top-[35%] h-115 w-115 rounded-full blur-[130px]" style={{ background: "color-mix(in srgb, var(--vm-orange) 3%, transparent)" }} />
                <div className="absolute bottom-0 left-1/2 h-75 w-175 -translate-x-1/2 rounded-full blur-[140px]" style={{ background: "color-mix(in srgb, var(--vm-peach) 2.5%, transparent)" }} />
            </div>

            {/* Sticky Header */}
            <header className="sticky top-0 z-50 border-b border-(--vm-border) bg-(--vm-background)/85 backdrop-blur-2xl">
                <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-6">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, var(--vm-gradient-start), var(--vm-gradient-middle), var(--vm-gradient-end))" }}>
                            <ShieldCheck className="h-4.5 w-4.5 text-white" strokeWidth={2.4} />
                        </div>
                        <span className="text-sm font-semibold tracking-[-0.01em]">{Brand.name}</span>
                    </Link>

                    <Link to="/register" className="inline-flex items-center gap-1.5 rounded-full border border-(--vm-border-strong) bg-(--vm-surface) px-4 py-2 text-sm font-medium transition-colors hover:border-(--vm-primary)">
                        Back to registration
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </header>

            {/* Page Content */}
            <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
                {/* Hero */}
                <section className="border-b border-(--vm-border) py-14 sm:py-18 lg:py-20">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-(--vm-border) bg-(--vm-surface)/70 px-3 py-1.5 text-xs font-medium text-(--vm-muted)">
                            <LockKeyhole className="h-3.5 w-3.5 text-(--vm-primary)" />
                            Privacy & data protection
                        </div>

                        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-(--vm-primary)">{Brand.name}</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Privacy Policy</h1>
                        <p className="mt-6 max-w-2xl text-base leading-7 text-(--vm-muted) sm:text-lg">
                            We believe you should understand what information VirtualMentor collects, why it is used, and how it is handled when you use our service.
                        </p>

                        <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-(--vm-muted)">
                            <span className="rounded-full border border-(--vm-border) bg-(--vm-surface)/60 px-3 py-1.5">Last updated: September 2026</span>
                            <span className="rounded-full border border-(--vm-border) bg-(--vm-surface)/60 px-3 py-1.5">Version 1.0</span>
                        </div>
                    </div>
                </section>

                {/* Privacy Notice */}
                <section className="border-b border-(--vm-border) py-8">
                    <div className="flex gap-4 rounded-2xl border border-(--vm-border) bg-(--vm-surface)/50 p-5 sm:p-6">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="font-semibold">A transparent approach to privacy</h2>
                            <p className="mt-1.5 text-sm leading-6 text-(--vm-muted)">
                                This policy is designed for the current VirtualMentor service and may be updated as features, infrastructure, and data practices evolve.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Legal Content */}
                <div className="grid gap-10 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
                    {/* Sticky Table of Contents */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            <p className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-(--vm-muted)">On this page</p>
                            <nav className="mt-3 space-y-1">
                                {sections.map((section) => {
                                    const active = activeSection === section.id;
                                    return (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-colors ${active ? "bg-(--vm-primary)/10 text-(--vm-primary)" : "text-(--vm-muted) hover:bg-(--vm-surface) hover:text-(--vm-text)"
                                                }`}
                                        >
                                            <span className="w-5 shrink-0 font-mono text-[10px] opacity-60">{section.number}</span>
                                            <span className="truncate">{section.title}</span>
                                        </a>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Document */}
                    <article className="min-w-0">
                        {sections.map((section, index) => (
                            <section key={section.id} id={section.id} className={`scroll-mt-28 py-10 ${index === 0 ? "pt-0" : "border-t border-(--vm-border)"}`}>
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="hidden shrink-0 pt-1 sm:block">
                                        <span className="font-mono text-xs text-(--vm-primary)">{section.number}</span>
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-2xl font-semibold tracking-tight sm:text-[28px]">{section.title}</h2>
                                        <div className="mt-6 space-y-5">
                                            {section.content.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                    {item.heading && <h3 className="mb-1.5 text-sm font-semibold text-(--vm-text)">{item.heading}</h3>}
                                                    <p className="text-[15px] leading-7 text-(--vm-muted)">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}

                        {/* Closing Card */}
                        <div className="mt-6 rounded-2xl border border-(--vm-border) bg-(--vm-surface)/60 p-6 sm:p-7">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="font-semibold">Questions about your privacy?</h2>
                                    <p className="mt-1.5 text-sm leading-6 text-(--vm-muted)">
                                        If you have a question about how VirtualMentor handles your information, please contact the team through the contact method provided by the service.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-(--vm-border) bg-(--vm-surface)/30">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-xs text-(--vm-muted) sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div>© {new Date().getFullYear()} {Brand.name}</div>
                    <div className="flex flex-wrap items-center gap-4">
                        <Link to="/terms" className="transition-colors hover:text-(--vm-text)">Terms of Service</Link>
                        <Link to="/register" className="transition-colors hover:text-(--vm-text)">Registration</Link>
                        <Link to="/" className="inline-flex items-center gap-1 transition-colors hover:text-(--vm-primary)">
                            Back home
                            <ArrowLeft className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
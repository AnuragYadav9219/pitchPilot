import { CTA } from "@/features/landing/components/CTA";
import { Features } from "@/features/landing/components/Features";
import { Footer } from "@/features/landing/components/Footer";
import { Hero } from "@/features/landing/components/Hero";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Navbar } from "@/features/landing/components/Navbar";
import { UseCases } from "@/features/landing/components/UseCases";

export default function LandingPage() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-(--vm-background) text-(--vm-text)">
            <Navbar />

            <main>
                <Hero />

                <Features />

                <HowItWorks />

                <UseCases />

                <CTA />
            </main>

            <Footer />
        </div>
    );
}
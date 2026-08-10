import { useState } from "react";

import { CTA } from "@/features/landing/components/CTA";
import { EarlyAccessModal } from "@/features/landing/components/EarlyAccessModal";
import { Features } from "@/features/landing/components/Features";
import { Footer } from "@/features/landing/components/Footer";
import { Hero } from "@/features/landing/components/Hero";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { Navbar } from "@/features/landing/components/Navbar";
import { UseCases } from "@/features/landing/components/UseCases";

import VirtualMentoLaunchAd from "@/features/landing/marketing/VirtualMentoLaunchAd";
import SocialProofStats from "../marketing/SocialProofStats";

export default function LandingPage() {
    const [earlyAccessOpen, setEarlyAccessOpen] =  useState(false);
    const [earlyAccessCountKey, setEarlyAccessCountKey] =  useState(0);

    const openEarlyAccess = () => {
        setEarlyAccessOpen(true);
    };

    const closeEarlyAccess = () => {
        setEarlyAccessOpen(false);
    };

    const handleEarlyAccessSuccess = () => {
        
        setEarlyAccessCountKey(
            (previous) => previous + 1,
        );

        setEarlyAccessOpen(false);
    };

    return (
        <div>
            <Navbar />

            <main>
                <Hero
                    onEarlyAccess={openEarlyAccess}
                />

                <Features />

                <SocialProofStats
                    refreshKey={earlyAccessCountKey}
                />

                <HowItWorks />

                <UseCases />

                <VirtualMentoLaunchAd
                    onEarlyAccess={openEarlyAccess}
                />

                <CTA
                    onEarlyAccess={openEarlyAccess}
                />
            </main>

            <Footer />

            <EarlyAccessModal
                open={earlyAccessOpen}
                onClose={closeEarlyAccess}
                onSuccess={handleEarlyAccessSuccess}
            />
        </div>
    );
}
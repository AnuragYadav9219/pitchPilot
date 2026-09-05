// import { useState } from "react";

// import { CTA } from "@/features/landing/components/CTA";
// import { EarlyAccessModal } from "@/features/landing/components/EarlyAccessModal";
// import { Features } from "@/features/landing/components/Features";
// import { Footer } from "@/features/landing/components/Footer";
// import { Hero } from "@/features/landing/components/Hero";
// import { HowItWorks } from "@/features/landing/components/HowItWorks";
// import { Navbar } from "@/features/landing/components/Navbar";
// import { UseCases } from "@/features/landing/components/UseCases";

// import VirtualMentorLaunchAd from "@/features/landing/marketing/VirtualMentorLaunchAd";
// import SocialProofStats from "../marketing/SocialProofStats";

// export default function LandingPage() {
//     const [earlyAccessOpen, setEarlyAccessOpen] =  useState(false);
//     const [earlyAccessCountKey, setEarlyAccessCountKey] =  useState(0);

//     const openEarlyAccess = () => {
//         setEarlyAccessOpen(true);
//     };

//     const closeEarlyAccess = () => {
//         setEarlyAccessOpen(false);
//     };

//     const handleEarlyAccessSuccess = () => {

//         setEarlyAccessCountKey(
//             (previous) => previous + 1,
//         );

//         setEarlyAccessOpen(false);
//     };

//     return (
//         <div>
//             <Navbar />

//             <main>
//                 <Hero
//                     onEarlyAccess={openEarlyAccess}
//                 />

//                 <Features />

//                 <SocialProofStats
//                     refreshKey={earlyAccessCountKey}
//                 />

//                 <HowItWorks />

//                 <UseCases />

//                 <VirtualMentorLaunchAd
//                     onEarlyAccess={openEarlyAccess}
//                 />

//                 <CTA
//                     onEarlyAccess={openEarlyAccess}
//                 />
//             </main>

//             <Footer />

//             <EarlyAccessModal
//                 open={earlyAccessOpen}
//                 onClose={closeEarlyAccess}
//                 onSuccess={handleEarlyAccessSuccess}
//             />
//         </div>
//     );
// }






import { useTheme } from "@/app/theme/ThemeProvider";
import { AudienceSection, EarlyAccessSection, Features, FeedbackSection, FinalCTA, Footer, Hero, HowItWorksSection, InterviewExperience, Navbar, ProblemSolution, UseCasesSection } from "../components";

export default function LandingPage() {
    const { colors } = useTheme();

    const handleStart = () => {
        window.location.href = "/register";
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{
                backgroundColor: colors.background,
                color: colors.text,
            }}
        >
            <Navbar />

            <main>
                <Hero
                    colors={colors}
                    onStart={handleStart}
                />

                <AudienceSection />

                <ProblemSolution />

                <Features />

                <HowItWorksSection />

                <InterviewExperience />

                <FeedbackSection
                    colors={colors}
                />

                <UseCasesSection
                    colors={colors}
                />

                <EarlyAccessSection
                    colors={colors}
                    onStart={handleStart}
                />

                <FinalCTA
                    colors={colors}
                    onStart={handleStart}
                />
            </main>

            <Footer colors={colors} />
        </div>
    );
}
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import {
    ProfileHeader,
    PersonalInformationCard,
    ProfessionalProfileCard,
    SkillsInterestsCard,
    ProfileLoading,
    ProfileError,
} from "../components";

import { useProfilePage } from "../hooks/useProfilePage";

export default function ProfilePage() {
    const {
        user,
        profile,
        loading,
        error,
        userUpdating,
        profileUpdating,
        handleUserSave,
        handleProfileSave,
    } = useProfilePage();

    if (loading) {
        return <ProfileLoading />;
    }

    if (error || !user || !profile) {
        return <ProfileError />;
    }

    return (
        <main className="min-h-full bg-(--vm-background)">
            <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <Link
                    to="/dashboard"
                    className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-(--vm-muted) transition hover:text-(--vm-text)"
                >
                    <ArrowLeft size={14} />
                    Dashboard
                </Link>

                <ProfileHeader
                    fullName={user.fullName}
                    email={user.email}
                    emailVerified={user.emailVerified}
                    enabled={user.enabled}
                />

                <div className="mt-6 space-y-5">
                    <PersonalInformationCard
                        fullName={user.fullName}
                        phoneNumber={user.phoneNumber}
                        loading={userUpdating}
                        onSave={handleUserSave}
                    />

                    <ProfessionalProfileCard
                        profile={{
                            bio: profile.bio,
                            education: profile.education,
                            experienceLevel: profile.experienceLevel,
                            careerGoal: profile.careerGoal,
                            learningStyle: profile.learningStyle,
                        }}
                        loading={profileUpdating}
                        onSave={handleProfileSave}
                    />

                    <SkillsInterestsCard
                        skills={profile.skills}
                        interests={profile.interests}
                        loading={profileUpdating}
                        onSave={(data) =>
                            handleProfileSave({
                                bio: profile.bio ?? "",
                                education: profile.education ?? "",
                                experienceLevel: profile.experienceLevel ?? "",
                                careerGoal: profile.careerGoal ?? "",
                                learningStyle: profile.learningStyle ?? "",
                                ...data,
                            })
                        }
                    />
                </div>
            </div>
        </main>
    );
}
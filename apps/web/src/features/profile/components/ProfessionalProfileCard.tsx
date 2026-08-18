import {
    GraduationCap,
    Pencil,
    Target,
    UserRound,
} from "lucide-react";

import { Button, Card } from "@/components/ui";
import { CustomSelect } from "./CustomSelect";
import { ProfileField } from "./ProfileField";
import { useProfessionalProfile } from "../hooks/useProfessionalProfile";

interface ProfessionalProfileCardProps {
    profile: {
        bio: string | null;
        education: string | null;
        experienceLevel: string | null;
        careerGoal: string | null;
        learningStyle: string | null;
    };
    loading: boolean;
    onSave: (data: {
        bio: string;
        education: string;
        experienceLevel: string;
        careerGoal: string;
        learningStyle: string;
    }) => void;
}

export function ProfessionalProfileCard({
    profile,
    loading,
    onSave,
}: ProfessionalProfileCardProps) {
    const {
        editing,
        bio,
        education,
        experienceLevel,
        careerGoal,
        learningStyle,
        setBio,
        setEducation,
        setExperienceLevel,
        setCareerGoal,
        setLearningStyle,
        startEditing,
        cancelEditing,
        save,
    } = useProfessionalProfile({
        profile,
        onSave,
    });

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <div>
                    <h2 className="text-sm font-semibold text-(--vm-text)">
                        Professional profile
                    </h2>

                    <p className="mt-0.5 text-xs text-(--vm-muted)">
                        Information used to personalize your mentoring experience
                    </p>
                </div>

                {!editing && (
                    <Button
                        type="button"
                        variant="edit"
                        size="xs"
                        onClick={startEditing}
                    >
                        <Pencil size={13} />
                        Edit
                    </Button>
                )}
            </div>

            {/* Edit mode */}
            {editing ? (
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        save();
                    }}
                    className="space-y-5 p-5 sm:p-6"
                >
                    {/* About */}
                    <div>
                        <label
                            htmlFor="profile-bio"
                            className="mb-2 block text-xs font-medium text-(--vm-text)"
                        >
                            About you
                        </label>

                        <textarea
                            id="profile-bio"
                            value={bio}
                            onChange={(event) =>
                                setBio(event.target.value)
                            }
                            rows={4}
                            maxLength={500}
                            placeholder="Tell your mentor about yourself..."
                            className="w-full resize-none rounded-xl border border-(--vm-border) bg-(--vm-background) px-3 py-2.5 text-sm text-(--vm-text) outline-none transition placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/15"
                        />
                    </div>

                    {/* Education + Career */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Input
                            label="Education"
                            value={education}
                            onChange={setEducation}
                            icon={<GraduationCap size={15} />}
                        />

                        <Input
                            label="Career goal"
                            value={careerGoal}
                            onChange={setCareerGoal}
                            icon={<Target size={15} />}
                        />
                    </div>

                    {/* Selects */}
                    <div className="grid gap-5 sm:grid-cols-2">
                        <CustomSelect
                            label="Experience level"
                            value={experienceLevel}
                            onChange={setExperienceLevel}
                            options={[
                                { value: "BEGINNER", label: "Beginner", },
                                { value: "INTERMEDIATE", label: "Intermediate", },
                                { value: "ADVANCED", label: "Advanced", },
                            ]}
                        />

                        <CustomSelect
                            label="Learning style"
                            value={learningStyle}
                            onChange={setLearningStyle}
                            options={[
                                { value: "PRACTICAL", label: "Practical", },
                                { value: "VISUAL", label: "Visual", },
                                { value: "THEORETICAL", label: "Theoretical", },
                                { value: "MIXED", label: "Mixed", },
                            ]}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="cancel"
                            size="xs"
                            onClick={cancelEditing}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="save"
                            size="xs"
                            loading={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save profile"}
                        </Button>
                    </div>
                </form>
            ) : (
                <ProfileView profile={profile} />
            )}
        </Card>
    );
}

/* =========================================================
   PROFILE VIEW
========================================================= */

function ProfileView({
    profile,
}: {
    profile: ProfessionalProfileCardProps["profile"];
}) {
    return (
        <div className="p-5 sm:p-6">
            {/* About */}
            <div className="rounded-2xl border border-(--vm-border) bg-(--vm-surface-2) p-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--vm-primary)/10 text-(--vm-primary)">
                        <UserRound size={16} />
                    </div>

                    <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-(--vm-muted)">
                            About
                        </p>

                        <p className="mt-1.5 text-sm leading-6 text-(--vm-text)">
                            {profile.bio ||
                                "Tell your mentor a little about yourself to make your sessions more personalized."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <ProfileField
                    label="Education"
                    value={profile.education}
                />

                <ProfileField
                    label="Career goal"
                    value={profile.careerGoal}
                />

                <ProfileField
                    label="Experience level"
                    value={profile.experienceLevel}
                />

                <ProfileField
                    label="Learning style"
                    value={profile.learningStyle}
                />
            </div>
        </div>
    );
}

/* =========================================================
   INPUT
========================================================= */

function Input({
    label,
    value,
    onChange,
    icon,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    icon: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-medium text-(--vm-text)">
                {label}
            </label>

            <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--vm-muted)">
                    {icon}
                </span>

                <input
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    className="h-10 w-full rounded-xl border border-(--vm-border) bg-(--vm-background) pl-9 pr-3 text-sm text-(--vm-text) outline-none transition placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/15"
                />
            </div>
        </div>
    );
}
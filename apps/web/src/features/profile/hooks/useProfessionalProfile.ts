import { useState } from "react";

interface ProfessionalProfile {
    bio: string | null;
    education: string | null;
    experienceLevel: string | null;
    careerGoal: string | null;
    learningStyle: string | null;
}

interface UseProfessionalProfileProps {
    profile: ProfessionalProfile;
    onSave: (data: {
        bio: string;
        education: string;
        experienceLevel: string;
        careerGoal: string;
        learningStyle: string;
    }) => void;
}

export function useProfessionalProfile({
    profile,
    onSave,
}: UseProfessionalProfileProps) {
    const [editing, setEditing] = useState(false);

    const [bio, setBio] = useState("");
    const [education, setEducation] = useState("");
    const [experienceLevel, setExperienceLevel] =
        useState("");
    const [careerGoal, setCareerGoal] = useState("");
    const [learningStyle, setLearningStyle] =
        useState("");

    function startEditing() {
        setBio(profile.bio ?? "");
        setEducation(profile.education ?? "");
        setExperienceLevel(profile.experienceLevel ?? "");
        setCareerGoal(profile.careerGoal ?? "");
        setLearningStyle(profile.learningStyle ?? "");
        setEditing(true);
    }

    function cancelEditing() {
        setEditing(false);
        resetForm();
    }

    function resetForm() {
        setBio("");
        setEducation("");
        setExperienceLevel("");
        setCareerGoal("");
        setLearningStyle("");
    }

    function save() {
        onSave({
            bio: bio.trim(),
            education: education.trim(),
            experienceLevel,
            careerGoal: careerGoal.trim(),
            learningStyle,
        });

        setEditing(false);
    }

    return {
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
    };
}
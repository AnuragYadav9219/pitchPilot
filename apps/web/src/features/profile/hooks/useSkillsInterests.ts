import { useState } from "react";

interface UseSkillsInterestsProps {
    skills: string[];
    interests: string[];
    onSave: (data: {
        skills: string[];
        interests: string[];
    }) => void;
}

export function useSkillsInterests({
    skills,
    interests,
    onSave,
}: UseSkillsInterestsProps) {
    const [editing, setEditing] = useState(false);
    const [localSkills, setLocalSkills] = useState(skills);
    const [localInterests, setLocalInterests] = useState(interests);
    const [skillInput, setSkillInput] = useState("");
    const [interestInput, setInterestInput] = useState("");

    function startEditing() {
        setLocalSkills(skills);
        setLocalInterests(interests);
        setEditing(true);
    }

    function cancelEditing() {
        setLocalSkills(skills);
        setLocalInterests(interests);
        setSkillInput("");
        setInterestInput("");
        setEditing(false);
    }

    function addSkill() {
        const value = skillInput.trim().toLowerCase();

        if (!value || localSkills.includes(value)) {
            return;
        }

        setLocalSkills((current) => [...current, value]);
        setSkillInput("");
    }

    function addInterest() {
        const value = interestInput.trim().toLowerCase();

        if (!value || localInterests.includes(value)) {
            return;
        }

        setLocalInterests((current) => [...current, value]);
        setInterestInput("");
    }

    function removeSkill(skill: string) {
        setLocalSkills((current) =>
            current.filter((item) => item !== skill),
        );
    }

    function removeInterest(interest: string) {
        setLocalInterests((current) =>
            current.filter((item) => item !== interest),
        );
    }

    function save() {
        onSave({
            skills: localSkills,
            interests: localInterests,
        });

        setEditing(false);
    }

    return {
        editing,
        localSkills,
        localInterests,
        skillInput,
        interestInput,
        startEditing,
        cancelEditing,
        addSkill,
        addInterest,
        removeSkill,
        removeInterest,
        setSkillInput,
        setInterestInput,
        save,
    };
}
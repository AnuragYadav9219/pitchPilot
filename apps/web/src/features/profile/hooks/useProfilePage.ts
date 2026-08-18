import {
    useGetCurrentUserQuery,
    useGetMyProfileQuery,
    useUpdateCurrentUserMutation,
    useUpdateMyProfileMutation,
} from "../profileApi";

import { appToast } from "@/lib/toast";

export function useProfilePage() {
    const userQuery = useGetCurrentUserQuery();
    const profileQuery = useGetMyProfileQuery();

    const [updateUser, userUpdate] = useUpdateCurrentUserMutation();
    const [updateProfile, profileUpdate] = useUpdateMyProfileMutation();

    async function handleUserSave(data: {
        fullName: string;
        phoneNumber: string;
    }) {
        try {
            await updateUser(data).unwrap();

            appToast.success(
                "Personal information updated.",
            );
        } catch {
            appToast.error(
                "Unable to update your information.",
            );
        }
    }

    async function handleProfileSave(data: {
        bio: string;
        education: string;
        experienceLevel: string;
        careerGoal: string;
        learningStyle: string;
        skills?: string[];
        interests?: string[];
    }) {
        if (!profileQuery.data?.data) {
            return;
        }

        const profile = profileQuery.data.data;

        try {
            await updateProfile({
                bio: data.bio,
                education: data.education,
                experienceLevel: data.experienceLevel,
                careerGoal: data.careerGoal,
                learningStyle: data.learningStyle,
                skills: data.skills ?? profile.skills,
                interests: data.interests ?? profile.interests,
            }).unwrap();

            appToast.success(
                "Professional profile updated.",
            );
        } catch {
            appToast.error(
                "Unable to update your profile.",
            );
        }
    }

    const user = userQuery.data?.data;
    const profile = profileQuery.data?.data;

    return {
        user,
        profile,

        loading:
            userQuery.isLoading || profileQuery.isLoading,

        error:
            userQuery.isError || profileQuery.isError || !user || !profile,

        userUpdating: userUpdate.isLoading,
        profileUpdating: profileUpdate.isLoading,

        handleUserSave,
        handleProfileSave,
    };
}
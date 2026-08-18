export type ExperienceLevel =
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED"
    | string;

export type LearningStyle =
    | "PRACTICAL"
    | "VISUAL"
    | "THEORETICAL"
    | "MIXED"
    | string;

export interface UserResponse {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string | null;
    role: string;
    enabled: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
}

export interface UserProfileResponse {
    id: string;
    bio: string | null;
    education: string | null;
    experienceLevel: ExperienceLevel | null;
    careerGoal: string | null;
    learningStyle: LearningStyle | null;
    skills: string[];
    interests: string[];
}

export interface UpdateUserRequest {
    fullName?: string;
    phoneNumber?: string;
}

export interface UpdateUserProfileRequest {
    bio?: string | null;
    education?: string | null;
    experienceLevel?: string | null;
    careerGoal?: string | null;
    learningStyle?: string | null;
    skills?: string[];
    interests?: string[];
}
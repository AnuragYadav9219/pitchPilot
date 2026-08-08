export type UserRole = "USER" | "ADMIN";

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: UserRole,
    enabled: boolean;
}
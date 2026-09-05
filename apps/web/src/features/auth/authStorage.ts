import type { User } from "./types";

const ACCESS_TOKEN_KEY =
    "virtualmentor_access_token";

const REFRESH_TOKEN_KEY =
    "virtualmentor_refresh_token";

const USER_KEY =
    "virtualmentor_user";

export const authStorage = {
    getAccessToken(): string | null {
        return localStorage.getItem(
            ACCESS_TOKEN_KEY,
        );
    },

    getRefreshToken(): string | null {
        return localStorage.getItem(
            REFRESH_TOKEN_KEY,
        );
    },

    getUser(): User | null {
        const user = localStorage.getItem(
            USER_KEY,
        );

        if (!user) {
            return null;
        }

        try {
            return JSON.parse(user) as User;
        } catch {
            return null;
        }
    },

    setUser(user: User): void {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user),
        );
    },

    setSession({
        accessToken,
        refreshToken,
        user,
    }: {
        accessToken: string;
        refreshToken: string;
        user: User;
    }): void {
        localStorage.setItem(
            ACCESS_TOKEN_KEY,
            accessToken,
        );

        localStorage.setItem(
            REFRESH_TOKEN_KEY,
            refreshToken,
        );

        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user),
        );
    },

    clear(): void {
        localStorage.removeItem(
            ACCESS_TOKEN_KEY,
        );

        localStorage.removeItem(
            REFRESH_TOKEN_KEY,
        );

        localStorage.removeItem(
            USER_KEY,
        );
    },
};
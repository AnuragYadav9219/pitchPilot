// const REFRESH_TOKEN_KEY = "virtualmento.refreshToken";

// export const authStorage = {
//     getRefreshToken(): string | null {
//         return sessionStorage.getItem(
//             REFRESH_TOKEN_KEY,
//         );
//     },

//     setRefreshToken(
//         refreshToken: string,
//     ): void {
//         sessionStorage.setItem(
//             REFRESH_TOKEN_KEY,
//             refreshToken,
//         );
//     },

//     clear(): void {
//         sessionStorage.removeItem(
//             REFRESH_TOKEN_KEY,
//         );
//     },
// };







const ACCESS_TOKEN_KEY =
    "virtualmento_access_token";

const REFRESH_TOKEN_KEY =
    "virtualmento_refresh_token";

const USER_KEY =
    "virtualmento_user";

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

    getUser(): string | null {
        return localStorage.getItem(
            USER_KEY,
        );
    },

    setSession({
        accessToken,
        refreshToken,
        user,
    }: {
        accessToken: string;
        refreshToken: string;
        user: unknown;
    }) {
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

    clear() {
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
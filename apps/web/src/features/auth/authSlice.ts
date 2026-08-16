import {
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import type {
    AuthResponse,
    User,
} from "./types";
import { authStorage } from "./authStorage";

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<AuthResponse>,
        ) => {
            state.user =
                action.payload.user;

            state.accessToken =
                action.payload.accessToken;

            state.refreshToken =
                action.payload.refreshToken;

            state.isAuthenticated = true;

            authStorage.setSession({
                accessToken:
                    action.payload.accessToken,

                refreshToken:
                    action.payload.refreshToken,

                user:
                    action.payload.user,
            });
        },

        clearCredentials: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
        },

        updateUser: (
            state,
            action: PayloadAction<User>,
        ) => {
            state.user = action.payload;
        },
    },
});

export const {
    setCredentials,
    clearCredentials,
    updateUser,
} = authSlice.actions;

export default authSlice.reducer;
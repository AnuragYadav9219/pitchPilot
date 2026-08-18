import { baseApi } from "@/services/baseApi";
import type { ApiResponse } from "@/services/types";

import type {
    UpdateUserProfileRequest,
    UpdateUserRequest,
    UserProfileResponse,
    UserResponse,
} from "./types";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<ApiResponse<UserResponse>, void>({
            query: () => ({
                url: "/api/users/me",
                method: "GET",
            }),
            providesTags: ["User"],
        }),

        updateCurrentUser: builder.mutation<ApiResponse<UserResponse>, UpdateUserRequest>({
            query: (body) => ({
                url: "/api/users/me",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),

        getMyProfile: builder.query<ApiResponse<UserProfileResponse>, void>({
            query: () => ({
                url: "/api/users/me/profile",
                method: "GET",
            }),
            providesTags: ["UserProfile"],
        }),

        updateMyProfile: builder.mutation<ApiResponse<UserProfileResponse>, UpdateUserProfileRequest>({
            query: (body) => ({
                url: "/api/users/me/profile",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["UserProfile"],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useUpdateCurrentUserMutation,
    useGetMyProfileQuery,
    useUpdateMyProfileMutation,
} = profileApi;
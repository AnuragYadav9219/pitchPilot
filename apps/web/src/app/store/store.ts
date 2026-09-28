import { baseApi } from "@/services/baseApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import careerReducer from "@/features/career/careerSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        career: careerReducer,

        [baseApi.reducerPath]: baseApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
    CareerAnalysisResponse,
    JobResult,
} from "./types";

interface CareerState {
    role: string;
    location: string;
    analysis: CareerAnalysisResponse | null;
    jobs: JobResult[];
}

const initialState: CareerState = {
    role: "",
    location: "",
    analysis: null,
    jobs: [],
};

const careerSlice = createSlice({
    name: "career",

    initialState,

    reducers: {
        setRole: (
            state,
            action: PayloadAction<string>
        ) => {
            state.role = action.payload;
        },

        setLocation: (
            state,
            action: PayloadAction<string>
        ) => {
            state.location = action.payload;
        },

        setSearch: (
            state,
            action: PayloadAction<{
                role: string;
                location: string;
            }>
        ) => {
            state.role = action.payload.role;
            state.location = action.payload.location;
        },

        setAnalysis: (
            state,
            action: PayloadAction<CareerAnalysisResponse>
        ) => {
            state.analysis = action.payload;
        },

        setJobs: (
            state,
            action: PayloadAction<JobResult[]>
        ) => {
            state.jobs = action.payload;
        },

        clearAnalysis: (state) => {
            state.analysis = null;
        },

        clearJobs: (state) => {
            state.jobs = [];
        },

        clearCareer: () => initialState,
    },
});

export const {
    setRole,
    setLocation,
    setSearch,
    setAnalysis,
    setJobs,
    clearAnalysis,
    clearJobs,
    clearCareer,
} = careerSlice.actions;

export default careerSlice.reducer;
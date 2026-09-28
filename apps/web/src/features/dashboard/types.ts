export interface DashboardStats {
    totalInterviews: number;
    completedInterviews: number;
    averageScore: number;
    currentStreak: number;
    longestStreak: number;
    completionRate: number;
    highestScore: number;
    totalPracticeMinutes: number;
}

export interface DashboardSkillScore {
    name: string;
    score: number;
}

export interface DashboardActivity {
    date: string;
    count: number;
}

export interface RecentInterview {
    id: number;
    role: string;
    type: string;
    difficulty: string;
    score: number;
    status: string;
    completedAt: string | null;
}

export interface DashboardResponse {
    stats: DashboardStats;
    skills: DashboardSkillScore[];
    activity: DashboardActivity[];
    recentInterviews: RecentInterview[];
}
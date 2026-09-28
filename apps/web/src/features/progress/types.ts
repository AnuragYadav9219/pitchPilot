export interface SkillProgress {
    name: string;
    currentScore: number;
    previousScore: number;
    improvementPercentage: number;
}

export interface ScoreTrendPoint {
    date: string;
    score: number;
}

export interface InterviewProgressItem {
    interviewId: number;
    role: string;
    score: number;
    completedAt: string | null;
}

export interface ProgressResponse {
    overallScore: number;
    previousScore: number;
    improvementPercentage: number;
    skills: SkillProgress[];
    scoreTrend: ScoreTrendPoint[];
    interviewHistory: InterviewProgressItem[];
    strengths: string[];
    areasToImprove: string[];
}

export interface FocusArea {
    skill: string;
    score: number;
    gapFromOverall: number;
    recommendation: string;
}

export interface GoalProgress {
    completed: number;
    target: number;
    percentage: number;
}

export interface ProgressResponse {
    overallScore: number;
    previousScore: number;
    improvementPercentage: number;

    totalInterviews: number;
    completedInterviews: number;
    highestScore: number;

    currentStreak: number;
    longestStreak: number;

    weeklyInterviews: number;
    monthlyInterviews: number;

    skills: SkillProgress[];
    scoreTrend: ScoreTrendPoint[];
    interviewHistory: InterviewProgressItem[];

    strengths: string[];
    areasToImprove: string[];

    focusArea: FocusArea | null;
    weeklyGoal: GoalProgress;
}
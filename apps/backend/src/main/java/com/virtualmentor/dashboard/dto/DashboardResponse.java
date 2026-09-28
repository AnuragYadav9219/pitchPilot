package com.virtualmentor.dashboard.dto;

import java.util.List;

public record DashboardResponse(
    DashboardStats stats,
    List<DashboardSkillScore> skills,
    List<DashboardActivity> activity,
    List<RecentInterviewResponse> recentInterviews
) {}
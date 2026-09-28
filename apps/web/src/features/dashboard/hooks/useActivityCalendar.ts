import { useMemo, useState } from "react";
import type { DashboardActivity } from "../types";

export interface CalendarDay {
    date: string;
    dayNumber: number;
    count: number;
    isToday: boolean;
    isCurrentMonth: boolean;
    isFuture: boolean;
}

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function normalizeDate(date: Date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

function formatDateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function parseDate(date: string) {
    return new Date(`${date}T00:00:00`);
}

export function formatMonthYear(date: Date) {
    return new Intl.DateTimeFormat("en-IN", {
        month: "long",
        year: "numeric",
    }).format(date);
}

export function formatLongDate(date: string) {
    return new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(parseDate(date));
}

export function useActivityCalendar(activity: DashboardActivity[]) {
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const today = useMemo(() => normalizeDate(new Date()), []);

    const activityMap = useMemo(() => {
        return new Map(activity.map((item) => [item.date, item.count]));
    }, [activity]);

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        let startDayOfWeek = firstDayOfMonth.getDay();

        const days: CalendarDay[] = [];
        const totalDays = lastDayOfMonth.getDate();

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const d = new Date(year, month - 1, prevMonthLastDay - i);
            const dateKey = formatDateKey(d);
            days.push({
                date: dateKey,
                dayNumber: d.getDate(),
                count: activityMap.get(dateKey) ?? 0,
                isToday: dateKey === formatDateKey(today),
                isCurrentMonth: false,
                isFuture: d > today,
            });
        }

        for (let i = 1; i <= totalDays; i++) {
            const d = new Date(year, month, i);
            const dateKey = formatDateKey(d);
            days.push({
                date: dateKey,
                dayNumber: i,
                count: activityMap.get(dateKey) ?? 0,
                isToday: dateKey === formatDateKey(today),
                isCurrentMonth: true,
                isFuture: d > today,
            });
        }

        const remainingSlots = 7 - (days.length % 7);
        if (remainingSlots < 7) {
            for (let i = 1; i <= remainingSlots; i++) {
                const d = new Date(year, month + 1, i);
                const dateKey = formatDateKey(d);
                days.push({
                    date: dateKey,
                    dayNumber: i,
                    count: activityMap.get(dateKey) ?? 0,
                    isToday: dateKey === formatDateKey(today),
                    isCurrentMonth: false,
                    isFuture: d > today,
                });
            }
        }

        return days;
    }, [currentDate, activityMap, today]);

    const totalCompleted = useMemo(() => {
        return activity.reduce((total, item) => total + item.count, 0);
    }, [activity]);

    const selectedCount = selectedDate ? activityMap.get(selectedDate) ?? 0 : 0;

    const dayOfYear = useMemo(() => {
        const start = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }, [today]);

    const handlePrevMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleResetToday = () => {
        setCurrentDate(new Date());
    };

    return {
        currentDate,
        selectedDate,
        setSelectedDate,
        calendarGrid,
        totalCompleted,
        selectedCount,
        dayOfYear,
        WEEK_DAYS,
        handlePrevMonth,
        handleNextMonth,
        handleResetToday,
    };
}
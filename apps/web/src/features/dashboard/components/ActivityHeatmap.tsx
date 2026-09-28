import { ChevronLeft, ChevronRight, CheckCircle2, Clock } from "lucide-react";
import type { DashboardActivity } from "../types";
import { useActivityCalendar, formatMonthYear, formatLongDate } from "../hooks/useActivityCalendar";

interface ActivityHeatmapProps {
  activity: DashboardActivity[];
}

export function ActivityHeatmap({ activity }: ActivityHeatmapProps) {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarGrid,
    selectedCount,
    WEEK_DAYS,
    handlePrevMonth,
    handleNextMonth,
    handleResetToday,
  } = useActivityCalendar(activity);

  return (
    <section className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-(--vm-border) bg-(--vm-surface) text-(--vm-text) shadow-sm">
      {/* Header & Navigation */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="truncate text-sm font-bold tracking-wide sm:text-base">Practice calendar</h2>
          <span className="hidden items-center gap-1 text-[11px] text-(--vm-muted) sm:flex">
            <Clock className="h-3 w-3" /> Interview activity
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1 text-(--vm-muted)">
          <button type="button" onClick={handlePrevMonth} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-(--vm-surface-2) hover:text-(--vm-text)" aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={handleNextMonth} className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-(--vm-surface-2) hover:text-(--vm-text)" aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Month & Reset Bar */}
      <div className="flex items-center justify-between border-b border-(--vm-border) px-4 pt-1 pb-3 sm:px-5">
        <span className="text-xs font-semibold text-(--vm-text-secondary)">{formatMonthYear(currentDate)}</span>
        <button type="button" onClick={handleResetToday} className="underline cursor-pointer rounded-md px-2 py-1 text-[11px] font-medium text-(--vm-primary) transition hover:bg-(--vm-primary)/10">
          Reset Today
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-4 sm:p-5">
        <div className="mb-3 grid grid-cols-7 gap-1 text-center sm:gap-2">
          {WEEK_DAYS.map((day, idx) => (
            <span key={`${day}-${idx}`} className="text-[10px] font-semibold uppercase tracking-wide text-(--vm-muted) sm:text-[11px]">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-x-1 gap-y-2 sm:gap-x-2 sm:gap-y-3">
          {calendarGrid.map((day) => {
            const isSelected = selectedDate === day.date;
            const hasCompleted = day.count > 0 && !day.isFuture;

            return (
              <button
                key={day.date}
                type="button"
                disabled={day.isFuture}
                onClick={() => !day.isFuture && setSelectedDate(day.date)}
                title={`${formatLongDate(day.date)} — ${day.count} completed`}
                className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150 sm:h-9 sm:w-9 ${day.isFuture ? "cursor-default opacity-30" : "cursor-pointer hover:scale-110 hover:bg-(--vm-surface-2)"
                  } ${day.isToday && !isSelected ? "ring-2 ring-(--vm-primary) ring-offset-2 ring-offset-(--vm-surface)" : ""} ${isSelected ? "bg-(--vm-surface-3) text-(--vm-text) ring-2 ring-(--vm-border-strong)" : ""
                  }`}
              >
                {hasCompleted ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-(--vm-primary) sm:h-6 sm:w-6" />
                    {day.count > 1 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-(--vm-primary) px-0.5 text-[8px] font-bold text-white">
                        {day.count > 9 ? "9+" : day.count}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className={`text-xs font-medium ${day.isCurrentMonth ? "text-(--vm-text-secondary)" : "text-(--vm-placeholder)"} ${day.isToday ? "font-bold text-(--vm-primary)" : ""}`}>
                    {day.dayNumber}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Footer */}
      {selectedDate && (
        <div className="flex items-center justify-between gap-3 border-t border-(--vm-border) bg-(--vm-surface-2) px-4 py-3 sm:px-5">
          <span className="min-w-0 truncate text-xs font-medium text-(--vm-text-secondary)">{formatLongDate(selectedDate)}</span>
          <span className="shrink-0 rounded-full bg-(--vm-primary)/10 px-2.5 py-1 text-[11px] font-semibold text-(--vm-primary)">
            {selectedCount} {selectedCount === 1 ? "interview" : "interviews"}
          </span>
        </div>
      )}
    </section>
  );
}
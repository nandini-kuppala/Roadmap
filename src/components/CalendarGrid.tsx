'use client';

import { cn } from '@/lib/utils';

interface DayStatus {
  dayNumber: number;
  completed: boolean;
  locked: boolean;
  isToday: boolean;
  date?: Date;
}

interface CalendarGridProps {
  days: DayStatus[];
  onDayClick?: (dayNumber: number) => void;
  selectedDay?: number;
}

export default function CalendarGrid({ days, onDayClick, selectedDay }: CalendarGridProps) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-2 mb-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-text-muted py-1">
            {day}
          </div>
        ))}
      </div>
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="grid grid-cols-7 gap-2">
          {week.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => !day.locked && onDayClick?.(day.dayNumber)}
              disabled={day.locked}
              title={`Day ${day.dayNumber}${day.date ? ` — ${day.date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}` : ''}`}
              className={cn(
                'aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all duration-150 border relative',
                day.completed
                  ? 'bg-success/20 border-success/40 text-success hover:bg-success/30'
                  : day.isToday
                  ? 'bg-accent/20 border-accent text-accent ring-2 ring-accent/40'
                  : day.locked
                  ? 'bg-surface/50 border-border/50 text-text-muted cursor-not-allowed opacity-50'
                  : 'bg-surface border-border text-text-secondary hover:border-accent/40 hover:bg-accent/5',
                selectedDay === day.dayNumber && 'ring-2 ring-accent'
              )}
            >
              {day.locked ? (
                <svg className="w-3 h-3 mb-0.5 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              ) : day.completed ? (
                <svg className="w-3 h-3 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
              <span>{day.dayNumber}</span>
            </button>
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-4 text-xs text-text-muted">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-success/20 border border-success/40" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-accent/20 border border-accent" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-surface border border-border" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-surface/50 border border-border/50 opacity-50" />
          <span>Locked</span>
        </div>
      </div>
    </div>
  );
}

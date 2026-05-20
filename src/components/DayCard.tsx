'use client';

import { DayPlan } from '@/data/plan';
import { cn, getDifficultyBadge, getPhaseColor } from '@/lib/utils';

interface DayCardProps {
  dayPlan: DayPlan;
  progress?: {
    theoryCompleted: boolean;
    interviewQuestionsReviewed: boolean;
    dsaProblems: { problemId: string; solved: boolean }[];
    completedAt?: Date | string;
  };
  onTheoryToggle?: (checked: boolean) => void;
  onInterviewToggle?: (checked: boolean) => void;
  onDSAToggle?: (problemId: string, solved: boolean) => void;
  onMarkComplete?: () => void;
  isLoading?: boolean;
  locked?: boolean;
}

export default function DayCard({
  dayPlan,
  progress,
  onTheoryToggle,
  onInterviewToggle,
  onDSAToggle,
  onMarkComplete,
  isLoading,
  locked = false,
}: DayCardProps) {
  const getSolvedCount = () => {
    if (!progress) return 0;
    return dayPlan.dsaProblems.filter((p) => {
      const lcId = `lc-${p.lcNumber}`;
      return progress.dsaProblems.some((dp) => dp.problemId === lcId && dp.solved);
    }).length;
  };

  const isProblemSolved = (lcNumber: number) => {
    if (!progress) return false;
    const lcId = `lc-${lcNumber}`;
    return progress.dsaProblems.some((dp) => dp.problemId === lcId && dp.solved);
  };

  const allDone = () => {
    if (!progress) return false;
    const dsaAllSolved =
      dayPlan.dsaProblems.length === 0 ||
      dayPlan.dsaProblems.every((p) => isProblemSolved(p.lcNumber));
    const interviewDone =
      dayPlan.interviewQuestions.length === 0 || progress.interviewQuestionsReviewed;
    return progress.theoryCompleted && dsaAllSolved && interviewDone;
  };

  const isCompleted = !!progress?.completedAt;
  const canComplete = allDone() && !isCompleted;

  return (
    <div className={cn('space-y-4', locked && 'opacity-60 pointer-events-none')}>
      {/* Day Header */}
      <div className="flex items-start justify-between">
        <div>
          <span className={cn('text-xs font-medium', getPhaseColor(dayPlan.phase))}>
            {dayPlan.phase}
          </span>
          <h2 className="text-xl font-bold text-text-primary mt-1">{dayPlan.theoryTitle}</h2>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1.5 bg-success/15 border border-success/30 rounded-full px-3 py-1.5">
            <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-success text-sm font-medium">Complete</span>
          </div>
        )}
      </div>

      {/* Theory Section */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary">Theory</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm text-text-secondary">Mark as studied</span>
            <div
              className={cn(
                'w-12 h-6 rounded-full transition-colors cursor-pointer relative',
                progress?.theoryCompleted ? 'bg-accent' : 'bg-surface-2'
              )}
              onClick={() => !locked && onTheoryToggle?.(!progress?.theoryCompleted)}
            >
              <div
                className={cn(
                  'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform',
                  progress?.theoryCompleted ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </div>
          </label>
        </div>

        <ul className="space-y-2">
          {dayPlan.theoryTopics.map((topic, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="text-accent mt-0.5 flex-shrink-0">→</span>
              {topic}
            </li>
          ))}
        </ul>

        {/* Resources */}
        {dayPlan.resources.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs font-medium text-text-muted mb-2">Resources</p>
            <div className="flex flex-wrap gap-2">
              {dayPlan.resources.map((res, i) => (
                <a
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs bg-surface-2 hover:bg-accent/10 border border-border hover:border-accent/30 text-text-secondary hover:text-accent rounded-lg px-3 py-1.5 transition-all"
                >
                  {res.type === 'video' ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  )}
                  {res.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DSA Section */}
      {dayPlan.dsaProblems.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary">DSA — {dayPlan.dsaPattern}</h3>
            </div>
            <span className="text-sm text-text-muted">
              {getSolvedCount()}/{dayPlan.dsaProblems.length} solved
            </span>
          </div>

          <div className="space-y-2">
            {dayPlan.dsaProblems.map((problem) => {
              const solved = isProblemSolved(problem.lcNumber);
              const lcId = `lc-${problem.lcNumber}`;
              return (
                <div
                  key={problem.lcNumber}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border transition-all',
                    solved
                      ? 'bg-success/5 border-success/20'
                      : 'bg-surface-2 border-border hover:border-accent/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => !locked && onDSAToggle?.(lcId, !solved)}
                      className={cn(
                        'w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0',
                        solved
                          ? 'bg-success border-success'
                          : 'border-border hover:border-accent'
                      )}
                    >
                      {solved && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div>
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'text-sm font-medium hover:text-accent transition-colors',
                          solved ? 'text-text-muted line-through' : 'text-text-primary'
                        )}
                      >
                        LC #{problem.lcNumber} — {problem.title}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getDifficultyBadge(problem.difficulty))}>
                      {problem.difficulty}
                    </span>
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-accent transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interview Questions */}
      {dayPlan.interviewQuestions.length > 0 && (
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text-primary">Interview Questions</h3>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm text-text-secondary">Mark as reviewed</span>
              <div
                className={cn(
                  'w-12 h-6 rounded-full transition-colors cursor-pointer relative',
                  progress?.interviewQuestionsReviewed ? 'bg-orange-500' : 'bg-surface-2'
                )}
                onClick={() => !locked && onInterviewToggle?.(!progress?.interviewQuestionsReviewed)}
              >
                <div
                  className={cn(
                    'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform',
                    progress?.interviewQuestionsReviewed ? 'translate-x-7' : 'translate-x-1'
                  )}
                />
              </div>
            </label>
          </div>

          <ol className="space-y-2">
            {dayPlan.interviewQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-orange-400 font-mono text-xs mt-0.5 flex-shrink-0">Q{i + 1}.</span>
                {q}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Mark Complete Button */}
      {!isCompleted && (
        <button
          onClick={onMarkComplete}
          disabled={!canComplete || isLoading}
          className={cn(
            'w-full py-4 rounded-xl font-bold text-base transition-all duration-200',
            canComplete
              ? 'bg-gradient-to-r from-accent to-blue-500 text-white hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-surface-2 text-text-muted cursor-not-allowed border border-border',
            isLoading && 'opacity-70 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving...
            </span>
          ) : canComplete ? (
            '✓ Mark Day Complete'
          ) : (
            'Complete all tasks to unlock'
          )}
        </button>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { DSAPattern, DSAProblem, FREQUENTLY_ASKED_IDS } from '@/data/dsa';
import { cn, getDifficultyBadge } from '@/lib/utils';

type Problem = DSAProblem & { solved?: boolean };
type PatternWithProgress = Omit<DSAPattern, 'problems'> & { problems: Problem[] };

interface DSATableProps {
  patterns: PatternWithProgress[];
  onToggleSolved?: (problemId: string, solved: boolean) => void;
  isLoading?: boolean;
}

type FilterMode = 'all' | 'solved' | 'unsolved' | 'starred';
type DifficultyMode = 'all' | 'Easy' | 'Medium' | 'Hard';

export default function DSATable({ patterns, onToggleSolved, isLoading }: DSATableProps) {
  const [collapsedPatterns, setCollapsedPatterns] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<FilterMode>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyMode>('all');
  const [patternFilter, setPatternFilter] = useState<string>('all');

  const togglePattern = (slug: string) => {
    setCollapsedPatterns((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const matchesFilter = (p: Problem): boolean => {
    if (filter === 'solved' && !p.solved) return false;
    if (filter === 'unsolved' && p.solved) return false;
    if (filter === 'starred' && !FREQUENTLY_ASKED_IDS.has(p.id)) return false;
    if (difficultyFilter !== 'all' && p.difficulty !== difficultyFilter) return false;
    return true;
  };

  const visiblePatterns = patterns.filter(
    (p) => patternFilter === 'all' || p.slug === patternFilter
  );

  const totalSolved = patterns.reduce(
    (acc, p) => acc + p.problems.filter((prob) => prob.solved).length,
    0
  );
  const totalProblems = patterns.reduce((acc, p) => acc + p.problems.length, 0);

  const filterButtons: { key: FilterMode; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'unsolved', label: 'Unsolved' },
    { key: 'solved', label: 'Solved' },
    { key: 'starred', label: '⭐ Must-Solve' },
  ];

  return (
    <div className="space-y-4">
      {/* Overall Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent">{totalSolved}</div>
          <div className="text-xs text-text-muted mt-1">Solved</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-text-primary">{totalProblems - totalSolved}</div>
          <div className="text-xs text-text-muted mt-1">Remaining</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-text-primary">
            {totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0}%
          </div>
          <div className="text-xs text-text-muted mt-1">Completion</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 bg-surface border border-border rounded-xl p-4">
        {/* Status filter */}
        <div className="flex gap-1 bg-surface-2 rounded-lg p-1">
          {filterButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                filter === key
                  ? 'bg-accent text-background'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-1 bg-surface-2 rounded-lg p-1">
          {(['all', 'Easy', 'Medium', 'Hard'] as DifficultyMode[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={cn(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize',
                difficultyFilter === d
                  ? d === 'all'
                    ? 'bg-accent text-background'
                    : d === 'Easy'
                    ? 'bg-easy text-background'
                    : d === 'Medium'
                    ? 'bg-medium text-background'
                    : 'bg-hard text-white'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {d === 'all' ? 'All' : d}
            </button>
          ))}
        </div>

        {/* Pattern filter */}
        <select
          value={patternFilter}
          onChange={(e) => setPatternFilter(e.target.value)}
          className="bg-surface-2 border border-border text-text-secondary text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-accent"
        >
          <option value="all">All Patterns</option>
          {patterns.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Reset */}
        {(filter !== 'all' || difficultyFilter !== 'all' || patternFilter !== 'all') && (
          <button
            onClick={() => { setFilter('all'); setDifficultyFilter('all'); setPatternFilter('all'); }}
            className="px-3 py-1.5 text-xs text-text-muted hover:text-text-primary border border-border rounded-lg transition-colors"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Pattern Sections — always render all, show empty state inside */}
      <div className="space-y-3">
        {visiblePatterns.map((pattern) => {
          const filteredProblems = pattern.problems.filter(matchesFilter);
          const solvedCount = pattern.problems.filter((p) => p.solved).length;
          const isCollapsed = collapsedPatterns.has(pattern.slug);

          return (
            <div key={pattern.slug} className="bg-surface border border-border rounded-xl overflow-hidden">
              {/* Pattern Header — always visible */}
              <button
                onClick={() => togglePattern(pattern.slug)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-text-primary text-left">{pattern.name}</span>
                    <span className="text-xs text-text-muted text-left">{pattern.description}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-primary">
                      {solvedCount}/{pattern.problems.length}
                    </div>
                    <div className="h-1 w-20 bg-surface-2 rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${pattern.problems.length > 0 ? (solvedCount / pattern.problems.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                  <svg
                    className={cn('w-4 h-4 text-text-muted transition-transform', isCollapsed && 'rotate-180')}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Problem list */}
              {!isCollapsed && (
                <div className="border-t border-border">
                  {filteredProblems.length === 0 ? (
                    <div className="px-4 py-5 text-center text-text-muted text-sm">
                      {filter === 'solved'
                        ? 'No solved problems in this pattern yet. Get to it!'
                        : filter === 'unsolved'
                        ? '🎉 All problems in this pattern are solved!'
                        : filter === 'starred'
                        ? 'No frequently-asked problems match your other filters.'
                        : 'No problems match the current filter.'}
                    </div>
                  ) : (
                    filteredProblems.map((problem, idx) => (
                      <div
                        key={problem.id}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 transition-colors group',
                          idx !== 0 && 'border-t border-border/40',
                          problem.solved ? 'bg-success/5' : 'hover:bg-surface-2'
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Checkbox */}
                          <button
                            onClick={() => onToggleSolved?.(problem.id, !problem.solved)}
                            disabled={isLoading}
                            className={cn(
                              'w-5 h-5 rounded flex items-center justify-center border-2 transition-all flex-shrink-0',
                              problem.solved
                                ? 'bg-success border-success'
                                : 'border-border hover:border-accent group-hover:border-accent/70'
                            )}
                          >
                            {problem.solved && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>

                          {/* Problem info */}
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-text-muted text-xs font-mono w-10 flex-shrink-0">
                              #{problem.leetcodeNumber}
                            </span>
                            <a
                              href={problem.leetcodeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                'text-sm font-medium hover:text-accent transition-colors truncate',
                                problem.solved ? 'text-text-muted line-through' : 'text-text-primary'
                              )}
                            >
                              {problem.title}
                            </a>
                            {problem.isFrequentlyAsked && (
                              <span title="Frequently asked in interviews" className="text-xs flex-shrink-0">⭐</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', getDifficultyBadge(problem.difficulty))}>
                            {problem.difficulty}
                          </span>
                          <a
                            href={problem.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100"
                            title="Open in LeetCode"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import DSATable from '@/components/DSATable';
import { DSA_PATTERNS } from '@/data/dsa';

interface ProblemWithStatus {
  id: string;
  title: string;
  leetcodeNumber: number;
  leetcodeUrl: string;
  pattern: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dayNumber?: number;
  solved?: boolean;
}

export default function DSAPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [problems, setProblems] = useState<ProblemWithStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/dsa')
        .then((res) => res.json())
        .then((data) => {
          setProblems(data.problems || []);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  const handleToggleSolved = async (problemId: string, solved: boolean) => {
    // Optimistic update
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, solved } : p))
    );
    setIsUpdating(true);

    try {
      const res = await fetch('/api/dsa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId, solved }),
      });

      if (!res.ok) {
        // Revert on error
        setProblems((prev) =>
          prev.map((p) => (p.id === problemId ? { ...p, solved: !solved } : p))
        );
      }
    } catch {
      setProblems((prev) =>
        prev.map((p) => (p.id === problemId ? { ...p, solved: !solved } : p))
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Merge server data with patterns
  const patternsWithStatus = DSA_PATTERNS.map((pattern) => ({
    ...pattern,
    problems: pattern.problems.map((p) => ({
      ...p,
      solved: problems.find((sp) => sp.id === p.id)?.solved || false,
    })),
  }));

  const totalSolved = problems.filter((p) => p.solved).length;
  const easyCount = problems.filter((p) => p.difficulty === 'Easy').length;
  const mediumCount = problems.filter((p) => p.difficulty === 'Medium').length;
  const hardCount = problems.filter((p) => p.difficulty === 'Hard').length;
  const easySolved = problems.filter((p) => p.difficulty === 'Easy' && p.solved).length;
  const mediumSolved = problems.filter((p) => p.difficulty === 'Medium' && p.solved).length;
  const hardSolved = problems.filter((p) => p.difficulty === 'Hard' && p.solved).length;

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-64 bg-surface border-r border-border" />
        <div className="flex-1 flex items-center justify-center">
          <svg className="w-8 h-8 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text-primary">DSA Problems</h1>
            <p className="text-text-secondary mt-1">
              100 hand-picked problems organized by pattern — NeetCode style
            </p>
          </div>

          {/* Difficulty breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-easy text-sm font-medium">Easy</span>
                <span className="text-text-muted text-xs">{easySolved}/{easyCount}</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-easy rounded-full transition-all"
                  style={{ width: `${easyCount > 0 ? (easySolved / easyCount) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-medium text-sm font-medium">Medium</span>
                <span className="text-text-muted text-xs">{mediumSolved}/{mediumCount}</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-medium rounded-full transition-all"
                  style={{ width: `${mediumCount > 0 ? (mediumSolved / mediumCount) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-hard text-sm font-medium">Hard</span>
                <span className="text-text-muted text-xs">{hardSolved}/{hardCount}</span>
              </div>
              <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-hard rounded-full transition-all"
                  style={{ width: `${hardCount > 0 ? (hardSolved / hardCount) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-surface border border-accent/20 rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-text-secondary">
              Problems solved in your daily plan are automatically tracked here. You can also mark them solved directly from this page.
            </p>
          </div>

          {/* DSA Table */}
          <DSATable
            patterns={patternsWithStatus}
            onToggleSolved={handleToggleSolved}
            isLoading={isUpdating}
          />
        </div>
      </main>
    </div>
  );
}

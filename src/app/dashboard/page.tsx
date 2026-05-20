'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import DayCard from '@/components/DayCard';
import ProgressRing from '@/components/ProgressRing';
import XPBar from '@/components/XPBar';
import DayCompleteModal from '@/components/DayCompleteModal';
import { SIXTY_DAY_PLAN } from '@/data/plan';

interface ProgressData {
  theoryCompleted: boolean;
  interviewQuestionsReviewed: boolean;
  dsaProblems: { problemId: string; solved: boolean }[];
  completedAt?: string;
}

interface UserData {
  currentDay: number;
  xp: number;
  streak: number;
  name: string;
  startDate: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [allProgress, setAllProgress] = useState<{ dayNumber: number; completedAt?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [celebration, setCelebration] = useState<{ dayNumber: number; xpEarned: number; streak: number; totalCompleted: number } | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/progress');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setUserData(data.user);
      setAllProgress(data.progress || []);

      const currentDay = data.user?.currentDay || 1;
      const dayProgress = data.progress?.find((p: { dayNumber: number }) => p.dayNumber === currentDay);
      setProgress(dayProgress || null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, fetchData]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const saveProgress = async (updates: Partial<ProgressData> & { markComplete?: boolean }) => {
    if (!userData) return;
    setIsSaving(true);

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayNumber: userData.currentDay,
          ...updates,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      const data = await res.json();
      setProgress(data.progress);

      if (data.dayComplete) {
        // Show celebration modal — don't advance yet
        const completedCount = allProgress.filter((p) => p.completedAt).length + 1;
        setCelebration({
          dayNumber: userData.currentDay,
          xpEarned: data.xpEarned,
          streak: (userData.streak || 0) + 1,
          totalCompleted: completedCount,
        });
      }
    } catch (error) {
      showNotification('error', error instanceof Error ? error.message : 'Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTheoryToggle = async (checked: boolean) => {
    setProgress((prev) => (prev ? { ...prev, theoryCompleted: checked } : { theoryCompleted: checked, dsaProblems: [], interviewQuestionsReviewed: false }));
    await saveProgress({ theoryCompleted: checked });
  };

  const handleInterviewToggle = async (checked: boolean) => {
    setProgress((prev) => (prev ? { ...prev, interviewQuestionsReviewed: checked } : { theoryCompleted: false, dsaProblems: [], interviewQuestionsReviewed: checked }));
    await saveProgress({ interviewQuestionsReviewed: checked });
  };

  const handleDSAToggle = async (problemId: string, solved: boolean) => {
    setProgress((prev) => {
      if (!prev) return { theoryCompleted: false, dsaProblems: [{ problemId, solved }], interviewQuestionsReviewed: false };
      const existing = prev.dsaProblems.find((p) => p.problemId === problemId);
      if (existing) {
        return { ...prev, dsaProblems: prev.dsaProblems.map((p) => p.problemId === problemId ? { ...p, solved } : p) };
      }
      return { ...prev, dsaProblems: [...prev.dsaProblems, { problemId, solved }] };
    });
    await saveProgress({ dsaProblems: [{ problemId, solved }] });
  };

  const handleMarkComplete = async () => {
    await saveProgress({ markComplete: true });
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-64 bg-surface border-r border-border animate-pulse" />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <svg className="w-10 h-10 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-text-muted">Loading your plan...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const currentDay = userData.currentDay;
  const dayPlan = SIXTY_DAY_PLAN.find((d) => d.dayNumber === currentDay);
  const completedDays = allProgress.filter((p) => p.completedAt).length;
  const progressPercent = Math.round((completedDays / 60) * 100);

  if (!dayPlan) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Day Complete Celebration Modal */}
      {celebration && (
        <DayCompleteModal
          dayNumber={celebration.dayNumber}
          xpEarned={celebration.xpEarned}
          streak={celebration.streak}
          totalCompleted={celebration.totalCompleted}
          onContinue={async () => {
            setCelebration(null);
            await fetchData();
          }}
        />
      )}

      <Sidebar />

      <main className="flex-1 ml-64 overflow-y-auto">
        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-slide-down ${
              notification.type === 'success'
                ? 'bg-success/20 border border-success/40 text-success'
                : 'bg-error/20 border border-error/40 text-error'
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Good{new Date().getHours() < 12 ? ' morning' : new Date().getHours() < 18 ? ' afternoon' : ' evening'},{' '}
                {userData.name.split(' ')[0]} 👋
              </h1>
              <p className="text-text-secondary mt-1">
                Day {currentDay} of 60 — {dayPlan.phase}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {isSaving && (
                <div className="flex items-center gap-1.5 text-text-muted text-sm">
                  <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </div>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Progress Ring */}
            <div className="bg-surface border border-border rounded-xl p-5 flex items-center gap-5">
              <ProgressRing
                percent={progressPercent}
                size={90}
                strokeWidth={7}
                label={`${completedDays}`}
                sublabel="days done"
              />
              <div>
                <p className="text-text-primary font-semibold">Overall Progress</p>
                <p className="text-text-muted text-sm">{60 - completedDays} days remaining</p>
                <div className="mt-2 h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="md:col-span-2">
              <XPBar xp={userData.xp || 0} streak={userData.streak || 0} />
            </div>
          </div>

          {/* Today's Day */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-accent text-sm font-bold">Day {currentDay}</span>
            </div>
            <span className="text-text-muted text-sm">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>

          {/* Day Plan Card */}
          <DayCard
            dayPlan={dayPlan}
            progress={progress || undefined}
            onTheoryToggle={handleTheoryToggle}
            onInterviewToggle={handleInterviewToggle}
            onDSAToggle={handleDSAToggle}
            onMarkComplete={handleMarkComplete}
            isLoading={isSaving}
          />
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CalendarGrid from '@/components/CalendarGrid';
import { SIXTY_DAY_PLAN } from '@/data/plan';
import { getPhaseColor } from '@/lib/utils';

const CONSISTENCY_QUOTES = [
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", emoji: "🌱" },
  { text: "Start Day 1. Show up every day. The offers will follow.", author: "", emoji: "🚀" },
  { text: "Consistency is not a talent. It's a decision.", author: "", emoji: "💪" },
  { text: "You don't rise to the level of your goals. You fall to the level of your systems.", author: "James Clear", emoji: "⚙️" },
  { text: "One day or day one. You decide.", author: "", emoji: "📅" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", emoji: "✨" },
  { text: "Every pro was once an amateur. Every expert was once a beginner. Keep going.", author: "", emoji: "🔥" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", emoji: "📈" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln", emoji: "🎯" },
  { text: "The pain of discipline is far less than the pain of regret.", author: "Jim Rohn", emoji: "⚡" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", emoji: "📚" },
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", emoji: "🏋️" },
  { text: "Champions are made from something deep inside — a desire, a dream, a vision.", author: "Muhammad Ali", emoji: "🏆" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", emoji: "🐢" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson", emoji: "⭐" },
];

interface ProgressEntry {
  dayNumber: number;
  completedAt?: string;
  theoryCompleted: boolean;
  dsaProblems: { problemId: string; solved: boolean }[];
  interviewQuestionsReviewed: boolean;
  xpEarned: number;
}

interface UserData {
  currentDay: number;
  startDate: string;
  name: string;
  xp: number;
  streak: number;
}

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [allProgress, setAllProgress] = useState<ProgressEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/progress')
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.user);
          setAllProgress(data.progress || []);
          setSelectedDay(data.user?.currentDay || 1);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status]);

  const getDayStatus = (dayNumber: number) => {
    if (!userData) return { completed: false, locked: true, isToday: false };
    const progressEntry = allProgress.find((p) => p.dayNumber === dayNumber);
    const completed = !!progressEntry?.completedAt;
    const locked = dayNumber > userData.currentDay;
    const isToday = dayNumber === userData.currentDay;
    return { completed, locked, isToday };
  };

  const getDateForDay = (dayNumber: number) => {
    if (!userData) return undefined;
    const startDate = new Date(userData.startDate);
    startDate.setDate(startDate.getDate() + dayNumber - 1);
    return startDate;
  };

  const calendarDays = Array.from({ length: 60 }, (_, i) => {
    const dayNumber = i + 1;
    const status = getDayStatus(dayNumber);
    return {
      dayNumber,
      ...status,
      date: getDateForDay(dayNumber),
    };
  });

  const selectedDayPlan = selectedDay ? SIXTY_DAY_PLAN.find((d) => d.dayNumber === selectedDay) : null;
  const selectedDayProgress = selectedDay ? allProgress.find((p) => p.dayNumber === selectedDay) : null;

  const completedDays = allProgress.filter((p) => p.completedAt).length;

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
            <h1 className="text-2xl font-bold text-text-primary">60-Day Calendar</h1>
            <p className="text-text-secondary mt-1">
              {completedDays} of 60 days completed • {60 - completedDays} remaining
            </p>
          </div>

          {/* Motivational Quote */}
          {(() => {
            const quote = CONSISTENCY_QUOTES[(completedDays + new Date().getDate()) % CONSISTENCY_QUOTES.length];
            return (
              <div className="mb-6 bg-surface border border-border rounded-xl px-5 py-4 flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{quote.emoji}</span>
                <div>
                  <p className="text-sm text-text-secondary italic leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
                  {quote.author && <p className="text-xs text-text-muted mt-1">— {quote.author}</p>}
                </div>
              </div>
            );
          })()}

          {/* Progress Summary */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Completed', value: completedDays, color: 'text-success' },
              { label: 'Current Day', value: userData?.currentDay || 1, color: 'text-accent' },
              { label: 'Remaining', value: 60 - completedDays, color: 'text-text-primary' },
              { label: 'Progress', value: `${Math.round((completedDays / 60) * 100)}%`, color: 'text-blue-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-6">
              <h2 className="font-semibold text-text-primary mb-5">Your Journey</h2>
              <CalendarGrid
                days={calendarDays}
                onDayClick={setSelectedDay}
                selectedDay={selectedDay || undefined}
              />
            </div>

            {/* Day Detail */}
            <div className="lg:col-span-2">
              {selectedDayPlan ? (
                <div className="bg-surface border border-border rounded-xl p-5 sticky top-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-xs font-semibold ${getPhaseColor(selectedDayPlan.phase)}`}>
                        {selectedDayPlan.phase.replace(/^Phase \d+ [—\-] /, '')}
                      </span>
                      <h3 className="font-bold text-text-primary mt-0.5">Day {selectedDay}</h3>
                    </div>
                    {selectedDayProgress?.completedAt ? (
                      <div className="flex items-center gap-1.5 bg-success/15 border border-success/30 rounded-full px-2.5 py-1">
                        <svg className="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-success text-xs font-medium">Done</span>
                      </div>
                    ) : getDayStatus(selectedDay!).locked ? (
                      <div className="flex items-center gap-1.5 bg-surface-2 border border-border rounded-full px-2.5 py-1">
                        <svg className="w-3.5 h-3.5 text-text-muted" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-text-muted text-xs">Locked</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-accent/15 border border-accent/30 rounded-full px-2.5 py-1">
                        <span className="text-accent text-xs font-medium">Today</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-1">{selectedDayPlan.theoryTitle}</p>
                    <p className="text-xs text-text-muted">DSA: {selectedDayPlan.dsaPattern}</p>
                  </div>

                  {/* Theory topics */}
                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">Topics</p>
                    <ul className="space-y-1">
                      {selectedDayPlan.theoryTopics.slice(0, 3).map((t, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                          <span className="text-accent mt-0.5">•</span>
                          {t}
                        </li>
                      ))}
                      {selectedDayPlan.theoryTopics.length > 3 && (
                        <li className="text-xs text-text-muted">
                          +{selectedDayPlan.theoryTopics.length - 3} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* DSA Problems */}
                  {selectedDayPlan.dsaProblems.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">DSA Problems</p>
                      <div className="space-y-1.5">
                        {selectedDayPlan.dsaProblems.map((p) => {
                          const lcId = `lc-${p.lcNumber}`;
                          const isSolved = selectedDayProgress?.dsaProblems.some(
                            (dp) => dp.problemId === lcId && dp.solved
                          );
                          return (
                            <a
                              key={p.lcNumber}
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs group"
                            >
                              {isSolved ? (
                                <svg className="w-3.5 h-3.5 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <div className="w-3.5 h-3.5 rounded border border-border flex-shrink-0" />
                              )}
                              <span className={`group-hover:text-accent transition-colors ${isSolved ? 'text-text-muted line-through' : 'text-text-secondary'}`}>
                                #{p.lcNumber} {p.title}
                              </span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* XP earned */}
                  {selectedDayProgress?.completedAt && selectedDayProgress.xpEarned > 0 && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
                      <span className="text-base">⚡</span>
                      <span className="text-yellow-400 text-sm font-medium">+{selectedDayProgress.xpEarned} XP earned</span>
                    </div>
                  )}

                  {/* Navigate to day button */}
                  {!getDayStatus(selectedDay!).locked && selectedDay === userData?.currentDay && (
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="w-full py-2.5 bg-accent/15 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/25 transition-colors"
                    >
                      Go to Today&apos;s Plan →
                    </button>
                  )}
                </div>
              ) : (
                <div className="bg-surface border border-border rounded-xl p-6 flex items-center justify-center h-40">
                  <p className="text-text-muted text-sm">Select a day to see details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

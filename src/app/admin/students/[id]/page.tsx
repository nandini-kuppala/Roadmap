'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import ProgressRing from '@/components/ProgressRing';
import { formatDate, getInitials, getDifficultyBadge } from '@/lib/utils';
import { SIXTY_DAY_PLAN } from '@/data/plan';

interface StudentDetail {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  college?: string;
  targetRole?: string;
  profilePicture?: string;
  currentDay: number;
  completedDays: number;
  progressPercent: number;
  xp: number;
  streak: number;
  startDate: string;
  enrolledAt: string;
}

interface ProgressEntry {
  dayNumber: number;
  completedAt?: string;
  theoryCompleted: boolean;
  dsaProblems: { problemId: string; solved: boolean }[];
  interviewQuestionsReviewed: boolean;
  xpEarned: number;
}

export default function StudentDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const studentId = params.id as string;

  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [stats, setStats] = useState<{ completedDays: number; totalDSASolved: number; currentStreak: number; totalXP: number; daysRemaining: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated' && (session?.user as { role?: string })?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === 'authenticated' && studentId) {
      fetch(`/api/students/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setStudent(data.student);
          setProgress(data.progress || []);
          setStats(data.stats);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status, studentId]);

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

  if (!student) return null;

  const selectedDayPlan = selectedDay ? SIXTY_DAY_PLAN.find((d) => d.dayNumber === selectedDay) : null;
  const selectedProgress = selectedDay ? progress.find((p) => p.dayNumber === selectedDay) : null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-text-muted">
            <Link href="/admin/students" className="hover:text-accent transition-colors">
              Students
            </Link>
            <span>/</span>
            <span className="text-text-primary">{student.name}</span>
          </div>

          {/* Student Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 overflow-hidden">
                {student.profilePicture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={student.profilePicture} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(student.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-text-primary">{student.name}</h1>
                <p className="text-text-muted text-sm">{student.email}</p>
                {student.bio && <p className="text-text-secondary text-sm mt-1">{student.bio}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {student.college && (
                    <span className="text-xs bg-surface-2 border border-border text-text-secondary rounded-full px-2.5 py-1">
                      🏫 {student.college}
                    </span>
                  )}
                  {student.targetRole && (
                    <span className="text-xs bg-accent/10 border border-accent/20 text-accent rounded-full px-2.5 py-1">
                      🎯 {student.targetRole}
                    </span>
                  )}
                </div>
                <div className="flex gap-3 mt-2">
                  {student.githubUrl && (
                    <a href={student.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-accent transition-colors">
                      GitHub ↗
                    </a>
                  )}
                  {student.linkedinUrl && (
                    <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-blue-400 transition-colors">
                      LinkedIn ↗
                    </a>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-2">
                  Enrolled {formatDate(student.enrolledAt)} • Started {formatDate(student.startDate)}
                </p>
              </div>

              {/* Chat button */}
              <Link
                href={`/admin/chat?with=${student._id}`}
                className="flex items-center gap-2 px-3 py-2 bg-accent/15 border border-accent/30 text-accent rounded-lg text-sm hover:bg-accent/25 transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Message
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            <div className="bg-surface border border-border rounded-xl p-4 text-center col-span-2 flex items-center gap-4">
              <ProgressRing
                percent={student.progressPercent}
                size={80}
                strokeWidth={6}
                label={`${stats?.completedDays || 0}`}
                sublabel="days"
              />
              <div>
                <p className="text-text-primary font-semibold">Progress</p>
                <p className="text-text-muted text-xs">{student.progressPercent}% complete</p>
                <p className="text-text-muted text-xs">Day {student.currentDay}/60</p>
              </div>
            </div>
            {[
              { label: 'DSA Solved', value: stats?.totalDSASolved || 0, icon: '💻', color: 'text-accent' },
              { label: 'Total XP', value: stats?.totalXP || 0, icon: '⚡', color: 'text-yellow-400' },
              { label: 'Streak', value: `${stats?.currentStreak || 0}d`, icon: '🔥', color: 'text-orange-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Day Progress Table */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-6">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold text-text-primary">Day-by-Day Progress</h2>
            </div>
            <div className="grid grid-cols-10 gap-1.5 p-5">
              {Array.from({ length: 60 }, (_, i) => {
                const dayNum = i + 1;
                const dayProgress = progress.find((p) => p.dayNumber === dayNum);
                const isCompleted = !!dayProgress?.completedAt;
                const isStarted = dayProgress && (dayProgress.theoryCompleted || dayProgress.dsaProblems.length > 0);
                const isLocked = dayNum > student.currentDay;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(selectedDay === dayNum ? null : dayNum)}
                    title={`Day ${dayNum}`}
                    className={`aspect-square rounded text-xs font-medium transition-all relative ${
                      isCompleted
                        ? 'bg-success/25 border border-success/50 text-success hover:bg-success/35'
                        : isStarted
                        ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/30'
                        : isLocked
                        ? 'bg-surface/50 border border-border/50 text-text-muted opacity-40 cursor-default'
                        : 'bg-surface-2 border border-border text-text-muted hover:border-accent/40'
                    } ${selectedDay === dayNum ? 'ring-2 ring-accent' : ''}`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            <div className="px-5 pb-3 flex gap-4 text-xs text-text-muted">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-success/25 border border-success/50" />
                Completed
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-yellow-500/20 border border-yellow-500/40" />
                In Progress
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded bg-surface-2 border border-border" />
                Not Started
              </div>
            </div>
          </div>

          {/* Selected Day Detail */}
          {selectedDay && selectedDayPlan && (
            <div className="bg-surface border border-border rounded-2xl p-5 animate-fade-in">
              <h3 className="font-semibold text-text-primary mb-4">
                Day {selectedDay} — {selectedDayPlan.theoryTitle}
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-surface-2 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${selectedProgress?.theoryCompleted ? 'bg-success' : 'bg-border'}`} />
                    <span className="text-sm font-medium text-text-secondary">Theory</span>
                  </div>
                  <span className={`text-xs ${selectedProgress?.theoryCompleted ? 'text-success' : 'text-text-muted'}`}>
                    {selectedProgress?.theoryCompleted ? 'Completed' : 'Not done'}
                  </span>
                </div>
                <div className="bg-surface-2 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${selectedProgress?.interviewQuestionsReviewed ? 'bg-success' : 'bg-border'}`} />
                    <span className="text-sm font-medium text-text-secondary">Interview Qs</span>
                  </div>
                  <span className={`text-xs ${selectedProgress?.interviewQuestionsReviewed ? 'text-success' : 'text-text-muted'}`}>
                    {selectedDayPlan.interviewQuestions.length === 0
                      ? 'N/A'
                      : selectedProgress?.interviewQuestionsReviewed
                      ? 'Reviewed'
                      : 'Not reviewed'}
                  </span>
                </div>
                <div className="bg-surface-2 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-text-secondary">DSA</span>
                  </div>
                  <div className="space-y-1">
                    {selectedDayPlan.dsaProblems.map((p) => {
                      const lcId = `lc-${p.lcNumber}`;
                      const solved = selectedProgress?.dsaProblems.some((dp) => dp.problemId === lcId && dp.solved);
                      return (
                        <div key={p.lcNumber} className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${solved ? 'bg-success' : 'bg-border'}`} />
                          <span className={`text-xs ${solved ? 'text-success' : 'text-text-muted'}`}>
                            #{p.lcNumber} {p.title}
                          </span>
                          <span className={`text-xs ml-auto ${getDifficultyBadge(p.difficulty)} px-1.5 rounded`}>
                            {p.difficulty[0]}
                          </span>
                        </div>
                      );
                    })}
                    {selectedDayPlan.dsaProblems.length === 0 && (
                      <span className="text-xs text-text-muted">No DSA problems</span>
                    )}
                  </div>
                </div>
              </div>
              {selectedProgress && (selectedProgress.xpEarned ?? 0) > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-yellow-400">⚡ +{selectedProgress.xpEarned} XP earned</span>
                  {selectedProgress.completedAt && (
                    <span className="text-text-muted text-xs">
                      • Completed {formatDate(selectedProgress.completedAt)}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

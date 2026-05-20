'use client';

import Link from 'next/link';
import { cn, formatRelativeTime, getInitials } from '@/lib/utils';

interface StudentProgressCardProps {
  student: {
    _id: string;
    name: string;
    email: string;
    college?: string;
    targetRole?: string;
    profilePicture?: string;
    currentDay: number;
    completedDays: number;
    progressPercent: number;
    streak: number;
    xp: number;
    lastActiveDate?: string;
    enrolledAt: string;
  };
}

export default function StudentProgressCard({ student }: StudentProgressCardProps) {
  return (
    <Link
      href={`/admin/students/${student._id}`}
      className="bg-surface border border-border rounded-xl p-4 hover:border-accent/30 transition-all block group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden">
          {student.profilePicture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={student.profilePicture} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            getInitials(student.name)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-text-primary truncate group-hover:text-accent transition-colors">
              {student.name}
            </h3>
            <span className="text-xs text-text-muted flex-shrink-0">
              Day {student.currentDay}/60
            </span>
          </div>
          <p className="text-xs text-text-muted truncate">{student.email}</p>
          {student.college && (
            <p className="text-xs text-text-secondary truncate mt-0.5">{student.college}</p>
          )}

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>{student.completedDays} days completed</span>
              <span>{student.progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full transition-all"
                style={{ width: `${student.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <span className="text-orange-400 text-xs">🔥</span>
              <span className="text-xs text-text-muted">{student.streak}d</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">⚡</span>
              <span className="text-xs text-text-muted">{student.xp} XP</span>
            </div>
            {student.lastActiveDate && (
              <span className="text-xs text-text-muted ml-auto">
                {formatRelativeTime(student.lastActiveDate)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

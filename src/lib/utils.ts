import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

export function calculateCurrentDay(startDate: Date | string): number {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.floor((now.getTime() - start.getTime()) / msPerDay) + 1;
  return Math.max(1, Math.min(60, daysDiff));
}

export function getXPForDay(dayNumber: number): number {
  // Base XP + bonus for harder days
  if (dayNumber >= 45) return 150;
  if (dayNumber >= 34) return 120;
  if (dayNumber >= 20) return 100;
  return 80;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'text-easy';
    case 'medium': return 'text-medium';
    case 'hard': return 'text-hard';
    default: return 'text-text-secondary';
  }
}

export function getDifficultyBadge(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-easy/20 text-easy border border-easy/30';
    case 'medium': return 'bg-medium/20 text-medium border border-medium/30';
    case 'hard': return 'bg-hard/20 text-hard border border-hard/30';
    default: return 'bg-surface text-text-secondary';
  }
}

export function getPhaseColor(phase: string): string {
  if (phase.includes('Phase 1')) return 'text-accent';
  if (phase.includes('Behavioural')) return 'text-purple-400';
  if (phase.includes('Advanced DSA')) return 'text-blue-400';
  if (phase.includes('Company')) return 'text-orange-400';
  if (phase.includes('Mock')) return 'text-pink-400';
  if (phase.includes('System')) return 'text-yellow-400';
  return 'text-text-primary';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateAvatarUrl(name: string): string {
  const initials = getInitials(name);
  const colors = ['0ea5e9', '8b5cf6', 'ec4899', 'f59e0b', '10b981', '00d4aa'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${colors[colorIndex]}&color=fff&size=128&bold=true`;
}

export function isValidImageBase64(base64: string): boolean {
  const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/i;
  return base64Regex.test(base64);
}

export function getBase64Size(base64: string): number {
  const base64Data = base64.split(',')[1] || base64;
  return Math.round((base64Data.length * 3) / 4);
}

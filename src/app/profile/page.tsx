'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProgressRing from '@/components/ProgressRing';
import { getInitials, formatDate } from '@/lib/utils';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  college: string;
  targetRole: string;
  profilePicture: string;
  startDate: string;
  enrolledAt: string;
  currentDay: number;
  xp: number;
  streak: number;
}

interface ProgressEntry {
  dayNumber: number;
  completedAt?: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allProgress, setAllProgress] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPic, setIsUploadingPic] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    college: '',
    targetRole: '',
  });
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      Promise.all([
        fetch('/api/students/' + (session?.user as { id: string }).id),
        fetch('/api/progress'),
      ])
        .then(async ([studentRes, progressRes]) => {
          const studentData = await studentRes.json();
          const progressData = await progressRes.json();
          setProfile(studentData.student);
          setAllProgress(progressData.progress || []);
          setFormData({
            name: studentData.student.name || '',
            bio: studentData.student.bio || '',
            githubUrl: studentData.student.githubUrl || '',
            linkedinUrl: studentData.student.linkedinUrl || '',
            college: studentData.student.college || '',
            targetRole: studentData.student.targetRole || '',
          });
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status, session]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/upload', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');
      const data = await res.json();
      setProfile(data.user);
      setIsEditing(false);
      showNotification('success', 'Profile updated successfully!');
      await update();
    } catch {
      showNotification('error', 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotification('error', 'Image must be less than 2MB');
      return;
    }

    setIsUploadingPic(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 }),
        });

        if (!res.ok) throw new Error('Upload failed');
        setProfile((prev) => (prev ? { ...prev, profilePicture: base64 } : null));
        showNotification('success', 'Profile picture updated!');
        await update({ image: base64 });
      } catch {
        showNotification('error', 'Failed to upload image');
      } finally {
        setIsUploadingPic(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const completedDays = allProgress.filter((p) => p.completedAt).length;

  // Build streak calendar (last 30 days of plan)
  const streakCalendar = Array.from({ length: 30 }, (_, i) => {
    const dayNumber = i + 1;
    const progress = allProgress.find((p) => p.dayNumber === dayNumber);
    return { dayNumber, completed: !!progress?.completedAt };
  });

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

  if (!profile) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
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

        <div className="max-w-3xl mx-auto px-8 py-8">
          <h1 className="text-2xl font-bold text-text-primary mb-8">My Profile</h1>

          {/* Profile Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {profile.profilePicture ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.profilePicture} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(profile.name)
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPic}
                  className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  {isUploadingPic ? (
                    <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Full name"
                      className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                    />
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData((p) => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={2}
                      maxLength={500}
                      className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent resize-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.college}
                        onChange={(e) => setFormData((p) => ({ ...p, college: e.target.value }))}
                        placeholder="College"
                        className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        value={formData.targetRole}
                        onChange={(e) => setFormData((p) => ({ ...p, targetRole: e.target.value }))}
                        placeholder="Target Role"
                        className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData((p) => ({ ...p, githubUrl: e.target.value }))}
                      placeholder="https://github.com/username"
                      className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                    />
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData((p) => ({ ...p, linkedinUrl: e.target.value }))}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-accent"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-accent text-background rounded-lg text-sm font-medium hover:bg-accent-dark disabled:opacity-60 transition-colors"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-surface-2 border border-border text-text-secondary rounded-lg text-sm hover:text-text-primary transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-text-primary">{profile.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 text-text-muted hover:text-accent text-sm transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    </div>
                    <p className="text-text-muted text-sm">{profile.email}</p>
                    {profile.bio && <p className="text-text-secondary text-sm mt-2">{profile.bio}</p>}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.college && (
                        <span className="text-xs bg-surface-2 border border-border text-text-secondary rounded-full px-2.5 py-1">
                          🏫 {profile.college}
                        </span>
                      )}
                      {profile.targetRole && (
                        <span className="text-xs bg-accent/10 border border-accent/20 text-accent rounded-full px-2.5 py-1">
                          🎯 {profile.targetRole}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mt-3">
                      {profile.githubUrl && (
                        <a
                          href={profile.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-text-muted hover:text-accent text-sm transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </a>
                      )}
                      {profile.linkedinUrl && (
                        <a
                          href={profile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-text-muted hover:text-blue-400 text-sm transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-text-muted mt-3">
                      Enrolled {formatDate(profile.enrolledAt)} • Started Day 1 on {formatDate(profile.startDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Days Done', value: completedDays, icon: '✓', color: 'text-success' },
              { label: 'Current Day', value: profile.currentDay, icon: '📅', color: 'text-accent' },
              { label: 'XP Earned', value: profile.xp || 0, icon: '⚡', color: 'text-yellow-400' },
              { label: 'Streak', value: `${profile.streak || 0}d`, icon: '🔥', color: 'text-orange-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Progress Ring */}
          <div className="bg-surface border border-border rounded-2xl p-6 mb-6 flex items-center gap-6">
            <ProgressRing
              percent={Math.round((completedDays / 60) * 100)}
              size={120}
              label={`${completedDays}/60`}
              sublabel="days"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary mb-1">Journey Progress</h3>
              <p className="text-text-secondary text-sm mb-3">
                {Math.round((completedDays / 60) * 100)}% complete — {60 - completedDays} days to go
              </p>
              <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.round((completedDays / 60) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="font-semibold text-text-primary mb-4">Completion Heatmap (Days 1–30)</h3>
            <div className="grid grid-cols-10 gap-1.5">
              {streakCalendar.map((day) => (
                <div
                  key={day.dayNumber}
                  title={`Day ${day.dayNumber}`}
                  className={`aspect-square rounded ${
                    day.completed
                      ? 'bg-accent'
                      : 'bg-surface-2 border border-border'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-text-muted mt-3">
              {allProgress.filter((p) => p.completedAt).length} days completed out of 60
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

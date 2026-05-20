'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import ChatWindow from '@/components/ChatWindow';
import { getInitials, formatRelativeTime } from '@/lib/utils';

interface Student {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  currentDay: number;
  lastActiveDate?: string;
}

function AdminChatContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (status === 'authenticated' && (session?.user as { role?: string })?.role === 'admin') {
      fetch('/api/students')
        .then((res) => res.json())
        .then((data) => {
          const studentList = data.students || [];
          setStudents(studentList);

          const withId = searchParams.get('with');
          if (withId) {
            const found = studentList.find((s: Student) => s._id === withId);
            if (found) setSelectedStudent(found);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status, session, searchParams]);

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
      <AdminSidebar />
      <main className="flex-1 ml-64 flex overflow-hidden">
        <div className="w-72 border-r border-border flex flex-col bg-surface flex-shrink-0">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-text-primary">Students</h2>
            <p className="text-text-muted text-xs mt-0.5">Select to start chatting</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {students.length === 0 ? (
              <div className="p-6 text-center text-text-muted text-sm">No students enrolled</div>
            ) : (
              students.map((student) => (
                <button
                  key={student._id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-border/50 ${
                    selectedStudent?._id === student._id
                      ? 'bg-accent/10 border-l-2 border-l-accent'
                      : 'hover:bg-surface-2'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden">
                    {student.profilePicture ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={student.profilePicture} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(student.name)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${selectedStudent?._id === student._id ? 'text-accent' : 'text-text-primary'}`}>
                      {student.name}
                    </p>
                    <p className="text-text-muted text-xs">Day {student.currentDay}/60</p>
                    {student.lastActiveDate && (
                      <p className="text-text-muted text-xs">{formatRelativeTime(student.lastActiveDate)}</p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-background">
          {selectedStudent ? (
            <ChatWindow withUserId={selectedStudent._id} withUserName={selectedStudent.name} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-text-secondary font-medium">Select a student to chat</p>
                <p className="text-text-muted text-sm mt-1">Choose from the list on the left</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen bg-background items-center justify-center">
        <svg className="w-8 h-8 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    }>
      <AdminChatContent />
    </Suspense>
  );
}

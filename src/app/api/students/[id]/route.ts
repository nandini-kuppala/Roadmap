import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import DayProgress from '@/models/DayProgress';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessionUser = session.user as { id: string; role: string };
    const { id } = await params;

    // Admin can view any student; student can only view themselves
    if (sessionUser.role !== 'admin' && sessionUser.id !== id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    await connectDB();

    const student = await User.findById(id).select('-password');
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const progress = await DayProgress.find({ userId: id }).sort({ dayNumber: 1 });

    const completedDays = progress.filter((p) => p.completedAt).length;
    const totalDSASolved = progress.reduce((acc, p) => {
      return acc + p.dsaProblems.filter((prob: { solved: boolean }) => prob.solved).length;
    }, 0);

    return NextResponse.json({
      student: {
        ...student.toJSON(),
        completedDays,
        progressPercent: Math.round((completedDays / 60) * 100),
      },
      progress,
      stats: {
        completedDays,
        totalDSASolved,
        currentStreak: student.streak,
        totalXP: student.xp,
        daysRemaining: 60 - completedDays,
      },
    });
  } catch (error) {
    console.error('Student GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

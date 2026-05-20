import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import DayProgress from '@/models/DayProgress';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    await connectDB();

    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ enrolledAt: -1 });

    // Get completion counts for all students
    const studentIds = students.map((s) => s._id);
    const progressCounts = await DayProgress.aggregate([
      {
        $match: {
          userId: { $in: studentIds },
          completedAt: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: '$userId',
          completedDays: { $sum: 1 },
        },
      },
    ]);

    const progressMap = new Map(
      progressCounts.map((p: { _id: string; completedDays: number }) => [
        p._id.toString(),
        p.completedDays,
      ])
    );

    const studentsWithProgress = students.map((student) => ({
      ...student.toJSON(),
      completedDays: progressMap.get(student._id.toString()) || 0,
      progressPercent: Math.round(
        ((progressMap.get(student._id.toString()) || 0) / 60) * 100
      ),
    }));

    return NextResponse.json({
      students: studentsWithProgress,
      total: students.length,
    });
  } catch (error) {
    console.error('Students GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

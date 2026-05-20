import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import DayProgress from '@/models/DayProgress';
import User from '@/models/User';
import { getXPForDay } from '@/lib/utils';
import { SIXTY_DAY_PLAN } from '@/data/plan';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dayNumber = searchParams.get('day');
    const userId = (session.user as { id: string }).id;

    await connectDB();

    if (dayNumber) {
      const progress = await DayProgress.findOne({
        userId,
        dayNumber: parseInt(dayNumber),
      });
      return NextResponse.json({ progress: progress || null });
    }

    // Return all progress for the user
    const allProgress = await DayProgress.find({ userId }).sort({ dayNumber: 1 });
    const user = await User.findById(userId).select('-password');

    return NextResponse.json({
      progress: allProgress,
      user,
      totalCompleted: allProgress.filter((p) => p.completedAt).length,
    });
  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const body = await request.json();
    const { dayNumber, theoryCompleted, dsaProblems, interviewQuestionsReviewed, markComplete } = body;

    if (!dayNumber || dayNumber < 1 || dayNumber > 60) {
      return NextResponse.json({ error: 'Invalid day number' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Enforce day unlock logic: can only work on currentDay or earlier completed days
    if (dayNumber > user.currentDay) {
      return NextResponse.json(
        { error: 'Complete previous days first' },
        { status: 403 }
      );
    }

    let progress = await DayProgress.findOne({ userId, dayNumber });

    if (!progress) {
      progress = new DayProgress({
        userId,
        dayNumber,
        theoryCompleted: false,
        dsaProblems: [],
        interviewQuestionsReviewed: false,
        xpEarned: 0,
      });
    }

    // Update fields
    if (typeof theoryCompleted === 'boolean') {
      progress.theoryCompleted = theoryCompleted;
    }

    if (typeof interviewQuestionsReviewed === 'boolean') {
      progress.interviewQuestionsReviewed = interviewQuestionsReviewed;
    }

    if (dsaProblems && Array.isArray(dsaProblems)) {
      // Merge DSA problem updates
      for (const update of dsaProblems) {
        const existing = progress.dsaProblems.find((p: { problemId: string }) => p.problemId === update.problemId);
        if (existing) {
          existing.solved = update.solved;
          if (update.solved && !existing.solvedAt) {
            existing.solvedAt = new Date();
          }
        } else {
          progress.dsaProblems.push({
            problemId: update.problemId,
            solved: update.solved,
            solvedAt: update.solved ? new Date() : undefined,
          });
        }
      }
    }

    // Check if day is complete (all 3 tasks done)
    const dayPlan = SIXTY_DAY_PLAN.find((d) => d.dayNumber === dayNumber);
    const hasInterviewQs = dayPlan && dayPlan.interviewQuestions.length > 0;

    const allDSASolved =
      dayPlan && dayPlan.dsaProblems.length > 0
        ? dayPlan.dsaProblems.every((problem) => {
            const lcId = `lc-${problem.lcNumber}`;
            return progress!.dsaProblems.some(
              (p: { problemId: string; solved: boolean }) => p.problemId === lcId && p.solved
            );
          })
        : true;

    const isComplete =
      progress.theoryCompleted &&
      allDSASolved &&
      (!hasInterviewQs || progress.interviewQuestionsReviewed);

    if ((markComplete || isComplete) && !progress.completedAt) {
      progress.completedAt = new Date();
      const xp = getXPForDay(dayNumber);
      progress.xpEarned = xp;

      // Advance user to next day
      if (user.currentDay === dayNumber && dayNumber < 60) {
        user.currentDay = dayNumber + 1;
      }

      // Update XP and streak
      user.xp = (user.xp || 0) + xp;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
      if (lastActive) {
        lastActive.setHours(0, 0, 0, 0);
        const diffDays = Math.floor(
          (today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          user.streak = (user.streak || 0) + 1;
        } else if (diffDays > 1) {
          user.streak = 1;
        }
      } else {
        user.streak = 1;
      }
      user.lastActiveDate = new Date();

      await user.save();
    }

    await progress.save();

    return NextResponse.json({
      progress,
      message: progress.completedAt ? 'Day completed!' : 'Progress saved',
      xpEarned: progress.xpEarned,
      dayComplete: !!progress.completedAt,
    });
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

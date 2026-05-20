import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import DayProgress from '@/models/DayProgress';
import { ALL_PROBLEMS } from '@/data/dsa';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    await connectDB();

    const allProgress = await DayProgress.find({ userId }).lean();

    const solvedProblemIds = new Set<string>();
    for (const progress of allProgress) {
      for (const problem of progress.dsaProblems) {
        if (problem.solved) {
          solvedProblemIds.add(problem.problemId);
        }
      }
    }

    const problemsWithStatus = ALL_PROBLEMS.map((problem) => ({
      ...problem,
      solved: solvedProblemIds.has(problem.id),
    }));

    return NextResponse.json({
      problems: problemsWithStatus,
      totalSolved: solvedProblemIds.size,
      total: ALL_PROBLEMS.length,
    });
  } catch (error) {
    console.error('DSA GET error:', error);
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
    const { problemId, solved } = body;

    if (!problemId) {
      return NextResponse.json({ error: 'Problem ID is required' }, { status: 400 });
    }

    const problem = ALL_PROBLEMS.find((p) => p.id === problemId);
    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    await connectDB();

    // Try updating an existing entry using positional $ operator (guaranteed to write)
    const updateResult = await DayProgress.updateOne(
      { userId, 'dsaProblems.problemId': problemId },
      {
        $set: {
          'dsaProblems.$.solved': solved,
          ...(solved ? { 'dsaProblems.$.solvedAt': new Date() } : {}),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      // Problem not in any DayProgress yet — upsert into the day's document
      const dayNumber = problem.dayNumber ?? 1;
      await DayProgress.findOneAndUpdate(
        { userId, dayNumber },
        {
          $push: {
            dsaProblems: {
              problemId,
              solved,
              ...(solved ? { solvedAt: new Date() } : {}),
            },
          },
          $setOnInsert: {
            userId,
            dayNumber,
            theoryCompleted: false,
            interviewQuestionsReviewed: false,
            xpEarned: 0,
          },
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: 'Problem status updated', solved });
  } catch (error) {
    console.error('DSA POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

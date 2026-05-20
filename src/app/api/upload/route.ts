import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

const MAX_SIZE = 2 * 1024 * 1024; // 2MB in bytes

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Validate base64 image format
    const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/i;
    if (!base64Regex.test(imageBase64)) {
      return NextResponse.json(
        { error: 'Invalid image format. Supported: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    // Check file size
    const base64Data = imageBase64.split(',')[1];
    const sizeInBytes = Math.round((base64Data.length * 3) / 4);

    if (sizeInBytes > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Image too large. Maximum size is 2MB' },
        { status: 400 }
      );
    }

    await connectDB();

    await User.findByIdAndUpdate(userId, {
      $set: { profilePicture: imageBase64 },
    });

    return NextResponse.json({
      message: 'Profile picture updated successfully',
      url: imageBase64,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as { id: string }).id;
    const body = await request.json();
    const { name, bio, githubUrl, linkedinUrl, college, targetRole } = body;

    await connectDB();

    const updateData: Record<string, string> = {};
    if (name) updateData.name = name.trim();
    if (bio !== undefined) updateData.bio = bio.trim();
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl.trim();
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl.trim();
    if (college !== undefined) updateData.college = college.trim();
    if (targetRole !== undefined) updateData.targetRole = targetRole.trim();

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

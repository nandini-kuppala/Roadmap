import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessionUser = session.user as { id: string; role: string };
    const { searchParams } = new URL(request.url);
    const withUserId = searchParams.get('with');
    const limit = parseInt(searchParams.get('limit') || '50');
    const lastMessageId = searchParams.get('after');

    await connectDB();

    let query: Record<string, unknown>;

    if (sessionUser.role === 'admin') {
      if (withUserId) {
        // Admin chatting with a specific student
        query = {
          $or: [
            { senderId: sessionUser.id, receiverId: withUserId },
            { senderId: withUserId, receiverId: sessionUser.id },
          ],
        };
      } else {
        // Admin viewing all messages (broadcast)
        query = { receiverId: null };
      }
    } else {
      // Student: see messages between them and admin
      query = {
        $or: [
          { senderId: sessionUser.id },
          { receiverId: sessionUser.id },
          { receiverId: null }, // broadcast messages
        ],
      };
    }

    if (lastMessageId) {
      const lastMessage = await Message.findById(lastMessageId);
      if (lastMessage) {
        query.createdAt = { $gt: lastMessage.createdAt };
      }
    }

    const messages = await Message.find(query)
      .populate('senderId', 'name email role profilePicture')
      .populate('receiverId', 'name email role')
      .sort({ createdAt: 1 })
      .limit(limit);

    // Mark messages as read
    if (!lastMessageId) {
      await Message.updateMany(
        {
          receiverId: sessionUser.id,
          read: false,
        },
        { $set: { read: true } }
      );
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Chat GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessionUser = session.user as { id: string; role: string };
    const body = await request.json();
    const { content, receiverId } = body;

    if (!content?.trim()) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    if (content.trim().length > 2000) {
      return NextResponse.json({ error: 'Message too long (max 2000 chars)' }, { status: 400 });
    }

    await connectDB();

    // Validate receiver if specified
    if (receiverId) {
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return NextResponse.json({ error: 'Receiver not found' }, { status: 404 });
      }
    }

    const message = await Message.create({
      senderId: sessionUser.id,
      receiverId: receiverId || null,
      content: content.trim(),
      read: false,
    });

    await message.populate('senderId', 'name email role profilePicture');
    if (receiverId) {
      await message.populate('receiverId', 'name email role');
    }

    return NextResponse.json({ message, success: true }, { status: 201 });
  } catch (error) {
    console.error('Chat POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

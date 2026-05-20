import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Resource from '@/models/Resource';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    await connectDB();

    const query: Record<string, string> = {};
    if (category) query.category = category;
    if (type) query.type = type;

    const resources = await Resource.find(query)
      .populate('addedBy', 'name email')
      .sort({ createdAt: -1 });

    const categories = await Resource.distinct('category');

    return NextResponse.json({ resources, categories });
  } catch (error) {
    console.error('Resources GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = session.user as { id: string; role: string };
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { title, url, type, category, description, thumbnail } = body;

    if (!title || !url || !type || !category) {
      return NextResponse.json(
        { error: 'Title, URL, type, and category are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const resource = await Resource.create({
      title: title.trim(),
      url: url.trim(),
      type,
      category: category.trim(),
      description: description?.trim() || '',
      addedBy: user.id,
      thumbnail: thumbnail?.trim() || '',
    });

    await resource.populate('addedBy', 'name email');

    return NextResponse.json({ resource, message: 'Resource created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Resources POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

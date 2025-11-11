import { NextRequest, NextResponse } from 'next/server';
import { Profile, CreateProfileDTO } from '@/lib/types/Profile';

// Mock database - en producción esto vendría de una base de datos real
let mockProfiles: Profile[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    bio: 'Software engineer passionate about web development',
    created_at: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    bio: 'Full-stack developer and tech enthusiast',
    created_at: '2025-02-20T14:45:00Z',
  },
  {
    id: '3',
    username: 'mike_johnson',
    email: 'mike@example.com',
    bio: 'Frontend specialist with love for React',
    created_at: '2025-03-10T09:15:00Z',
  },
  {
    id: '4',
    username: 'sarah_wilson',
    email: 'sarah@example.com',
    created_at: '2025-04-05T16:20:00Z',
  },
  {
    id: '5',
    username: 'gilberto',
    email: 'admin@shogun.com',
    bio: 'gdfgdgdgdgddfgdgg',
    created_at: '2025-11-11T08:00:00Z',
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(mockProfiles, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateProfileDTO = await request.json();

    if (!body.username || !body.email) {
      return NextResponse.json(
        { error: 'Username and email are required' },
        { status: 400 }
      );
    }

    if (!body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const emailExists = mockProfiles.some(
      (profile) => profile.email.toLowerCase() === body.email.toLowerCase()
    );
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    const newProfile: Profile = {
      id: String(mockProfiles.length + 1),
      username: body.username,
      email: body.email,
      bio: body.bio,
      created_at: new Date().toISOString(),
    };

    mockProfiles.push(newProfile);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ id: newProfile.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

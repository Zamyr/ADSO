import { NextRequest, NextResponse } from 'next/server';
import { Profile, UpdateProfileDTO } from '@/lib/types/Profile';

// Mock database - en producción esto vendría de una base de datos real
const mockProfiles: Profile[] = [
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await new Promise((resolve) => setTimeout(resolve, 300));

  const profile = mockProfiles.find((p) => p.id === id);

  if (!profile) {
    return NextResponse.json(
      { error: 'Profile not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(profile, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UpdateProfileDTO = await request.json();

    const profileIndex = mockProfiles.findIndex((p) => p.id === id);

    if (profileIndex === -1) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    if (body.email && !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (body.email) {
      const emailExists = mockProfiles.some(
        (profile, index) =>
          index !== profileIndex &&
          profile.email.toLowerCase() === body.email!.toLowerCase()
      );
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 409 }
        );
      }
    }

    const updatedProfile: Profile = {
      ...mockProfiles[profileIndex],
      ...(body.username && { username: body.username }),
      ...(body.email && { email: body.email }),
      ...(body.bio !== undefined && { bio: body.bio }),
    };

    mockProfiles[profileIndex] = updatedProfile;

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

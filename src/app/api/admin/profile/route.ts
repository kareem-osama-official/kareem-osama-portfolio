import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import { dbRepo } from '@/lib/db';

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const profile = dbRepo.getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    dbRepo.updateProfile(body);
    const updated = dbRepo.getProfile();
    return NextResponse.json({ success: true, profile: updated });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import { dbRepo } from '@/lib/db';

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = dbRepo.getAdminById(session.userId);
  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}

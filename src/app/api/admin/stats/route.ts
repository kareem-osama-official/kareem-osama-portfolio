import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import { dbRepo } from '@/lib/db';

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stats = dbRepo.getAdminStats();
  return NextResponse.json(stats);
}

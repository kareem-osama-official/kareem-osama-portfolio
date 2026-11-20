import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import { dbRepo } from '@/lib/db';
import crypto from 'node:crypto';

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const milestones = dbRepo.getJourney(true);
  return NextResponse.json(milestones);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = body.id || `jm-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;

    dbRepo.createJourneyMilestone({
      id,
      period: body.period || '2026',
      title_en: body.title_en || 'Milestone',
      title_ar: body.title_ar || 'محطة تعليمية',
      institution_en: body.institution_en || 'Institution',
      institution_ar: body.institution_ar || 'الجهة التعليمية',
      description_en: body.description_en || '',
      description_ar: body.description_ar || '',
      badge_en: body.badge_en || 'Milestone',
      badge_ar: body.badge_ar || 'إنجاز',
      skills_applied: typeof body.skills_applied === 'string' ? body.skills_applied : JSON.stringify(body.skills_applied || []),
      display_order: body.display_order || 0,
      is_visible: body.is_visible !== undefined ? (body.is_visible ? 1 : 0) : 1,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create milestone error:', error);
    return NextResponse.json({ error: 'Failed to create milestone' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Milestone ID is required' }, { status: 400 });
    }

    if (updates.skills_applied && typeof updates.skills_applied !== 'string') {
      updates.skills_applied = JSON.stringify(updates.skills_applied);
    }

    dbRepo.updateJourneyMilestone(id, updates);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Update milestone error:', error);
    return NextResponse.json({ error: 'Failed to update milestone' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Milestone ID is required' }, { status: 400 });
    }

    dbRepo.deleteJourneyMilestone(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Delete milestone error:', error);
    return NextResponse.json({ error: 'Failed to delete milestone' }, { status: 500 });
  }
}

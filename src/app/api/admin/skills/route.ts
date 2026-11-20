import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import { dbRepo } from '@/lib/db';
import crypto from 'node:crypto';

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const skills = dbRepo.getSkills(true);
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = body.id || `skill-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;

    dbRepo.createSkill({
      id,
      name: body.name || 'New Skill',
      category: body.category || 'languages',
      level_en: body.level_en || 'Foundational',
      level_ar: body.level_ar || 'تأسيسي',
      evidence_en: body.evidence_en || null,
      evidence_ar: body.evidence_ar || null,
      is_highlight: body.is_highlight ? 1 : 0,
      is_visible: body.is_visible !== undefined ? (body.is_visible ? 1 : 0) : 1,
      display_order: body.display_order || 0,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Create skill error:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
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
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    dbRepo.updateSkill(id, updates);
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Update skill error:', error);
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
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
      return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 });
    }

    dbRepo.deleteSkill(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Delete skill error:', error);
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
